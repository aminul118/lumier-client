'use client';

import HtmlContent from '@/components/rich-text/core/html-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { IProduct } from '@/services/product/product';
import { motion } from 'framer-motion';
import { Check, Heart, Share2, ShoppingCart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductImageGallery from './ProductImageGallery';
import ReviewSection from './Reviews/ReviewSection';

interface ProductDetailContentProps {
  product: IProduct;
}

const ProductDetailContent = ({ product }: ProductDetailContentProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (shouldRedirect = false) => {
    addToCart(product as any);
    if (shouldRedirect) {
      router.push('/checkout');
    } else {
      toast.success(`${product.name} added to cart!`, {
        description: 'Check your cart to proceed to checkout.',
        icon: <ShoppingCart className="h-4 w-4 text-blue-500" />,
      });
    }
  };

  // Build the image list: primary image first, then any extra images (deduped)
  const allImages = Array.from(
    new Set([product.image, ...(product.images || [])]),
  ).filter(Boolean) as string[];

  // Stock for product
  const currentStock = product.stock;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
      {/* Image Section */}
      <div className="lg:col-span-7">
        <ProductImageGallery
          images={allImages}
          productName={product.name}
          saleBadge={
            product.salePrice && product.salePrice > 0 ? (
              <Badge className="rounded-full border-none bg-red-500 px-4 py-1.5 text-sm font-black text-white shadow-xl shadow-red-500/30">
                {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
              </Badge>
            ) : undefined
          }
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col pt-4 lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Brand & Stats */}
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="rounded-full border-blue-500/30 px-4 py-1 text-xs font-bold tracking-widest text-blue-500 uppercase"
            >
              Premium {product.category}
            </Badge>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`border-border/50 hover:bg-muted rounded-full border p-2.5 transition-all ${isWishlisted ? 'bg-red-50 text-red-500' : 'text-muted-foreground'}`}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
              <button className="border-border/50 text-muted-foreground hover:bg-muted rounded-full border p-2.5 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Title & Price */}
          <div>
            <h1 className="text-foreground mb-6 text-4xl leading-[1.1] font-black tracking-tight capitalize md:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.floor(product.rating) ? 'currentColor' : 'none'
                    }
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm font-bold">
                ({product.rating} Rating)
              </span>
            </div>

            <div className="flex items-center gap-6">
              {product.salePrice && product.salePrice > 0 ? (
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black tracking-tighter text-blue-500">
                    ৳{product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground/40 text-2xl font-medium italic line-through">
                    ৳{product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <p className="text-foreground text-5xl font-black tracking-tighter">
                  ৳{product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="from-border/50 via-border h-px bg-linear-to-r to-transparent" />

          {/* Selection Controls */}
          <div className="space-y-8">
            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground text-sm font-black tracking-widest uppercase">
                  Select Size
                </h3>
                <button className="text-xs font-bold text-blue-500 hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-16 rounded-2xl border px-5 py-3 font-black transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-foreground text-background border-foreground scale-105 shadow-lg'
                        : 'border-border/50 bg-muted/30 text-muted-foreground hover:border-foreground/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Display */}
            <div className="space-y-4">
              <h3 className="text-foreground text-sm font-black tracking-widest uppercase">
                Color:{' '}
                <span className="text-muted-foreground">{product.color}</span>
              </h3>
              <div className="flex gap-4">
                <div className="relative h-12 w-12 scale-110 rounded-full border-2 border-blue-500 p-1 shadow-lg">
                  <div
                    className="border-border/50 h-full w-full rounded-full border"
                    style={{
                      backgroundColor: product.color
                        .toLowerCase()
                        .replace('silk ', ''),
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Check
                      className={`h-4 w-4 ${['white', 'beige', 'silk white', 'gold'].includes(product.color.toLowerCase()) ? 'text-black' : 'text-white'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-4 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => handleAddToCart(false)}
                disabled={currentStock < 1}
                size="lg"
                variant="outline"
                className="disabled:border-muted disabled:text-muted-foreground flex-1 rounded-3xl border-2 border-blue-600 py-8 text-xl font-black text-blue-600 transition-all hover:bg-blue-50 active:scale-[0.98]"
              >
                Add to Cart <ShoppingCart className="ml-3 h-6 w-6" />
              </Button>
              <Button
                onClick={() => handleAddToCart(true)}
                disabled={currentStock < 1}
                size="lg"
                className="disabled:bg-muted disabled:text-muted-foreground flex-1 rounded-3xl bg-blue-600 py-8 text-xl font-black text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:shadow-none"
              >
                {currentStock < 1 ? 'Out of Stock' : 'Buy Now'}
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 py-4">
              <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${currentStock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                />
                {currentStock > 0
                  ? currentStock < 10
                    ? `Only ${currentStock} Left!`
                    : 'In Stock'
                  : 'Out of Stock'}
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                24h Shipping
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                30 Day Return
              </div>
            </div>
          </div>

          {/* Descriptions Section */}
          <div className="border-border/50 space-y-10 border-t pt-8">
            <div>
              <h3 className="text-foreground mb-4 text-xs font-black tracking-[0.2em] uppercase">
                The Narrative
              </h3>
              <HtmlContent
                content={product.description}
                className="prose prose-sm dark:prose-invert text-muted-foreground/80 max-w-none text-base leading-relaxed font-medium"
              />
            </div>

            {product.details && (
              <div>
                <h3 className="text-foreground mb-4 text-xs font-black tracking-[0.2em] uppercase">
                  Artisanal Details
                </h3>
                <HtmlContent
                  content={
                    Array.isArray(product.details)
                      ? product.details.join('\n')
                      : product.details
                  }
                  className="prose prose-sm dark:prose-invert text-muted-foreground/80 max-w-none leading-relaxed font-medium"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Full Width Review Section */}
      <div className="mt-20 lg:col-span-12">
        <ReviewSection productId={product._id as string} />
      </div>
    </div>
  );
};

export default ProductDetailContent;
