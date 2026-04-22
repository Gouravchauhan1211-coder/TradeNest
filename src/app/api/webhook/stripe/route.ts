import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Supabase Service Role client (to bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const metadata = session.metadata;
    const userId = metadata.userId;
    const courseIds = JSON.parse(metadata.courseIds);
    const isMembership = metadata.isMembership === 'true';

    try {
      // 1. Check for idempotency (avoid duplicate orders)
      const { data: existingOrder } = await supabaseAdmin
        .from('orders')
        .select('id')
        .eq('provider_order_id', session.id)
        .single();

      if (existingOrder) {
        return NextResponse.json({ received: true, duplicate: true });
      }

      // 2. Insert into "orders" table
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          user_id: userId,
          total_amount: session.amount_total / 100,
          payment_status: 'completed',
          payment_provider: 'stripe',
          provider_order_id: session.id
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Insert into "order_items" table
      if (!isMembership) {
        const orderItems = courseIds.map((courseId: string) => ({
          order_id: order.id,
          course_id: courseId
        }));

        const { error: itemsError } = await supabaseAdmin
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;
      } else {
        // 4. Handle Membership
        const { error: memberError } = await supabaseAdmin
          .from('memberships')
          .insert({
            user_id: userId,
            type: 'lifetime',
            active: true
          });
        
        if (memberError) throw memberError;
      }

      console.log(`Order ${order.id} fulfilled for user ${userId}`);
      
    } catch (dbError: any) {
      console.error('Database Error during webhook fulfillment:', dbError);
      return NextResponse.json({ error: 'Database fulfillment failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
