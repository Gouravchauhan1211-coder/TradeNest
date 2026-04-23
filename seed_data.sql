-- Seed some sample courses for TradeNest
INSERT INTO public.courses (title, description, category, original_price, sale_price, thumbnail1, is_featured, is_active)
VALUES 
('Advanced SMC Forex Masterclass', 'Master the Smart Money Concepts with this institutional trading course.', 'Forex', 1999, 19.99, 'https://images.unsplash.com/photo-1611974717482-98ea0524d5d3?w=800&auto=format&fit=crop&q=60', true, true),
('ICT Mentorship 2024 (Private Content)', 'Exclusive access to the latest institutional trading mentorship.', 'Trading', 2500, 25.00, 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60', true, true),
('E-Commerce Empire: 0 to $100k', 'Build a successful dropshipping and brand building business.', 'Business', 997, 9.97, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60', false, true),
('Crypto Scalping Pro', 'Fast-paced crypto trading strategies for daily profits.', 'Hot', 1499, 14.99, 'https://images.unsplash.com/photo-1621761126066-6da92900c4c4?w=800&auto=format&fit=crop&q=60', true, true);
