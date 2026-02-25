import { Skeleton } from '@/components/ui/skeleton';

export const BannerSkeleton = () => (
  <div className="relative animate-pulse">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
      {/* Main Slider Skeleton */}
      <div className="relative overflow-hidden rounded-[2rem] lg:col-span-8">
        <div className="bg-muted/30 relative h-[400px] w-full lg:h-[700px]">
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-20">
            <div className="bg-muted/40 mb-4 h-4 w-24 rounded" />
            <div className="bg-muted/40 mb-6 h-12 w-3/4 rounded lg:h-20" />
            <div className="bg-muted/40 h-10 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Mini Banners Skeleton */}
      <div className="hidden flex-col gap-4 lg:col-span-4 lg:flex lg:gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-muted/30 relative flex-1 overflow-hidden rounded-[2rem]"
          >
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="bg-muted/40 mb-2 h-4 w-20 rounded" />
              <div className="bg-muted/40 mb-4 h-8 w-2/3 rounded" />
              <div className="bg-muted/40 h-4 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CategorySkeleton = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="mb-16 flex flex-col items-center">
        <Skeleton className="mb-4 h-10 w-64 rounded-xl" />
        <Skeleton className="h-1.5 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group bg-muted/30 relative aspect-3/4 overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-x-0 bottom-0 p-8">
              <Skeleton className="h-8 w-32 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ProductGridSkeleton = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => (
  <section className="bg-muted/10 py-24">
    <div className="container mx-auto px-4">
      <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="space-y-4">
          {title ? (
            <h2 className="text-3xl font-black tracking-tighter md:text-5xl">
              {title}
            </h2>
          ) : (
            <Skeleton className="h-12 w-64 rounded-xl" />
          )}
          {subtitle ? (
            <p className="text-muted-foreground font-medium">{subtitle}</p>
          ) : (
            <Skeleton className="h-6 w-80 rounded-lg" />
          )}
        </div>
        <Skeleton className="h-6 w-32 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="group space-y-6">
            <div className="bg-muted/30 relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem]">
              <div className="bg-muted/40 absolute top-6 right-6 h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-3 px-2">
              <Skeleton className="bg-muted/40 h-4 w-1/4 rounded" />
              <Skeleton className="bg-muted/40 h-7 w-full rounded" />
              <div className="flex items-center justify-between pt-4">
                <Skeleton className="bg-muted/40 h-10 w-24 rounded-full" />
                <Skeleton className="bg-muted/40 h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const HomeSkeletons = () => {
  return (
    <div className="space-y-12">
      <BannerSkeleton />
      <CategorySkeleton />
      <ProductGridSkeleton
        title="Featured Excellence"
        subtitle="Our hand-picked selections for this season"
      />
    </div>
  );
};
