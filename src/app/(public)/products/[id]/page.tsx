'use client';

import { useCart } from '@/context/CartContext';
import { products } from '@/constants/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Star, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const product = products.find((p) => p._id === id);

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-foreground">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Button onClick={() => router.push('/')}>Back to Home</Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="min-h-screen bg-background pt-28 pb-16">
            <div className="container mx-auto px-4">
                <Link
                    href="/"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-4/5 rounded-3xl overflow-hidden border border-border bg-muted"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-none px-3 py-1">
                                {product.category}
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={18} fill="currentColor" />
                                    <span className="text-foreground font-bold">{product.rating}</span>
                                </div>
                                <span className="text-muted-foreground">|</span>
                                <span className="text-muted-foreground text-sm">Free Shipping Worldwide</span>
                            </div>
                        </div>

                        <p className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-1.5 rounded-full capitalize">
                                        {product.category}
                                    </Badge>
                                    <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                                        <Star size={18} fill="currentColor" />
                                        <span>{product.rating}</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight capitalize leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-3xl font-bold text-blue-500">${product.price.toFixed(2)}</p>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                {product.description}
                            </p>

                            {/* Colors and Sizes */}
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h3 className="text-foreground font-bold mb-4 text-sm uppercase tracking-widest">Available Colors</h3>
                                    <div className="flex gap-3">
                                        {product.colors.map((color) => (
                                            <div
                                                key={color}
                                                className="w-10 h-10 rounded-full border-2 border-border hover:border-blue-500 cursor-pointer transition-colors"
                                                style={{ backgroundColor: color.toLowerCase().replace('silk ', '') }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-bold mb-4 text-sm uppercase tracking-widest">Select Size</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className="px-6 py-3 rounded-xl border border-border bg-card/50 text-muted-foreground font-bold hover:border-foreground/20 transition-all"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <Button
                                    onClick={handleAddToCart}
                                    size="lg"
                                    className="flex-1 rounded-full py-7 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20"
                                >
                                    Add to Cart <ShoppingCart className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 rounded-full py-7 text-lg font-bold border-border text-foreground hover:bg-muted"
                                >
                                    Wishlist
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8 p-4 rounded-2xl bg-card/50 border border-border">
                            <p className="text-xs text-muted-foreground text-center uppercase tracking-widest">
                                Lumiere Guaranteed Quality • 30 Day Returns • Secure Checkout
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
