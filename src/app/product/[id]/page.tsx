import { getCourseById, getCourses } from '@/lib/courses';
import ProductContent from './ProductContent';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getCourseById(id);

  if (!product) {
    notFound();
  }

  const relatedCourses = await getCourses({ 
    category: product.category, 
    limit: 4 
  });

  return <ProductContent product={product} relatedCourses={relatedCourses.filter(c => c.id !== id)} />;
}
