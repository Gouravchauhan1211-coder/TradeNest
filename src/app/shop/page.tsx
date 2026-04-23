import { getCourses } from '@/lib/courses';
import ShopContent from './ShopContent';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const courses = await getCourses();

  return <ShopContent initialCourses={courses} />;
}
