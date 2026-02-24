import { normalizeSlug } from '@/lib/url-slugs';
import { generateCategorizedMeta } from '@/seo/generateDynamicMeta';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ShopContent from '../shop/_components/ShopContent';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return await generateCategorizedMeta(slug);
}

const DynamicShopPage = async ({ params }: Props) => {
  const { slug } = await params;

  // slug = ['men', 'shirts', 'formal']
  const category = slug[0] ? normalizeSlug(slug[0]) : 'All';
  const subCategory = slug[1] ? normalizeSlug(slug[1]) : '';
  const type = slug[2] ? normalizeSlug(slug[2]) : '';

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading shop...
        </div>
      }
    >
      <ShopContent
        initialFilters={{
          category: category === 'All' ? undefined : category,
          subCategory: subCategory || undefined,
          type: type || undefined,
        }}
      />
    </Suspense>
  );
};

export default DynamicShopPage;
export const dynamic = 'force-dynamic';
