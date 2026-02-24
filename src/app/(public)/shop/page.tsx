import { Suspense } from 'react';
import ShopContent from './ShopContent';

const ShopPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading shop...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
};

export default ShopPage;
export const dynamic = 'force-dynamic';
