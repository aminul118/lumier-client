'use client';

import ProductCard from '@/components/common/ProductCard';
import { Button } from '@/components/ui/button';
import { getTopRatedProducts, IProduct } from '@/services/product/product';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const TopRatedProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const { data } = await getTopRatedProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch top rated products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopRated();
  }, []);

  if (loading) return null; // Or skeleton
  if (products.length === 0) return null;

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-foreground mb-4 text-3xl font-black tracking-tighter md:text-5xl">
              The <span className="text-blue-600">Highest</span> Rating
            </h2>
            <p className="text-muted-foreground text-lg">
              Top selections rated by our worldwide community
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground h-auto p-0 text-xs font-black tracking-[0.2em] uppercase hover:text-blue-600"
          >
            <Link href="/shop?sort=-rating">View All Ranked</Link>
          </Button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-8"
        >
          {products.map((product, index) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopRatedProducts;
