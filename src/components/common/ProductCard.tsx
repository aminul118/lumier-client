'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { IProduct } from '@/services/product/product';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: IProduct;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group h-full"
    >
      <div className="bg-muted border-border relative mb-4 aspect-4/5 overflow-hidden rounded-2xl border transition-all duration-300 group-hover:border-blue-500/20">
        <Link href={`/products/${product.slug || product._id}`}>
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
        </Link>

        {/* Overlay with Quick Add */}
        <div className="bg-background/40 pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <Button
            disabled={product.stock < 1}
            onClick={() => {
              addToCart(product as any);
              router.push('/checkout');
            }}
            className="disabled:bg-muted disabled:text-muted-foreground translate-y-4 rounded-full bg-blue-600 font-bold text-white shadow-xl transition-transform duration-300 group-hover:translate-y-0 hover:bg-blue-700"
          >
            {product.stock < 1 ? 'Out of Stock' : 'Buy Now'}{' '}
            <ShoppingCart size={16} className="ml-2" />
          </Button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-card/90 text-card-foreground border-border rounded-md border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
            {product.category}
          </span>
        </div>

        {/* Sale Badge */}
        {product.salePrice && product.salePrice > 0 && (
          <div className="absolute top-4 right-4">
            <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
              Sale
            </span>
          </div>
        )}
      </div>

      <div className="px-2">
        <div className="mb-1 flex items-start justify-between">
          <Link href={`/products/${product.slug || product._id}`}>
            <h3 className="text-foreground mr-2 flex-1 truncate font-semibold capitalize transition-colors group-hover:text-blue-500">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-xs text-amber-500">
            <Star size={12} fill="currentColor" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {product.salePrice && product.salePrice > 0 ? (
            <>
              <p className="text-lg font-bold text-blue-600">
                ৳{product.salePrice.toFixed(2)}
              </p>
              <p className="text-muted-foreground decoration-muted-foreground/50 text-sm font-medium line-through">
                ৳{product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-foreground text-lg font-bold">
              ৳{product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
