'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { IProduct } from '@/services/product/product';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProductCardProps {
  product: IProduct;
  index?: number;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({
  product,
  index = 0,
  viewMode = 'grid',
}: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const isList = viewMode === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      layout
      className={cn(
        'group bg-card/40 border-border overflow-hidden rounded-3xl border transition-all hover:border-blue-500/20',
        isList && 'flex flex-col gap-6 p-4 sm:flex-row',
      )}
    >
      <Link
        href={`/products/${product.slug || product._id}`}
        className={cn(
          'relative block overflow-hidden',
          isList ? 'aspect-square w-full rounded-2xl sm:w-48' : 'aspect-4/5',
        )}
      >
        <AnimatePresence mode="wait">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.images?.find((img) => img !== product.image) && (
            <Image
              src={
                product.images.find((img) => img !== product.image) as string
              }
              alt={`${product.name} - Second View`}
              fill
              className="object-cover opacity-0 transition-opacity delay-100 duration-700 group-hover:opacity-100"
            />
          )}
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="bg-card/90 text-card-foreground border-border rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
            {product.category}
          </span>
          {product.salePrice && product.salePrice > 0 && (
            <span className="rounded-md bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
              Sale {Math.round((1 - product.salePrice / product.price) * 100)}%
              OFF
            </span>
          )}
        </div>

        {/* Overlay with Quick Add (Only Grid) */}
        {!isList && (
          <div className="bg-background/40 pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
            <Button
              disabled={product.stock < 1}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product as any);
                router.push('/checkout');
              }}
              className="disabled:bg-muted disabled:text-muted-foreground translate-y-4 rounded-full bg-blue-600 font-bold text-white shadow-xl transition-transform duration-300 group-hover:translate-y-0 hover:bg-blue-700"
            >
              {product.stock < 1 ? 'Out of Stock' : 'Buy Now'}{' '}
              <ShoppingCart size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </Link>

      <div className={cn('flex flex-1 flex-col', isList ? 'py-2' : 'p-6')}>
        <div className="mb-2 flex items-start justify-between">
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            {product.subCategory}
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-500">
            <Star size={12} fill="currentColor" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link href={`/products/${product.slug || product._id}`}>
          <h3 className="text-foreground mb-2 truncate text-xl font-bold capitalize transition-colors group-hover:text-blue-500">
            {product.name}
          </h3>
        </Link>

        {isList && (
          <p className="text-muted-foreground mb-6 line-clamp-2 flex-1 text-sm">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.salePrice && product.salePrice > 0 ? (
              <>
                <span className="text-muted-foreground text-sm line-through">
                  ৳{product.price.toFixed(2)}
                </span>
                <span className="text-2xl font-black text-blue-500">
                  ৳{product.salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-foreground text-2xl font-bold">
                ৳{product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product as any);
              toast.success(`${product.name} added to cart!`);
            }}
            className="rounded-full bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
          >
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
