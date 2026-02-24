'use client';

import AppPagination from '@/components/common/pagination/AppPagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { TransitionContext } from '@/context/useTransition';
import { generateShopPath } from '@/lib/url-slugs';
import { cn } from '@/lib/utils';
import { getCategories, ICategory } from '@/services/category/category';
import { getColors, IColor } from '@/services/color/color';
import { getProducts, IProduct } from '@/services/product/product';
import { IMeta } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FilterX,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useEffect,
  useTransition as useReactTransition,
  useState,
} from 'react';
import { toast } from 'sonner';

interface ShopContentProps {
  initialFilters?: {
    category?: string;
    subCategory?: string;
    type?: string;
  };
}

const ShopContent = ({ initialFilters }: ShopContentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [isPending, startTransition] = useReactTransition();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [meta, setMeta] = useState<IMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbColors, setDbColors] = useState<IColor[]>([]);
  const [dbCategories, setDbCategories] = useState<ICategory[]>([]);

  const page = Number(searchParams.get('page')) || 1;
  const limit = 12;

  // Sync state with URL and path params
  const searchQuery = searchParams.get('q') || '';
  const selectedCategory =
    initialFilters?.category || searchParams.get('category') || 'All';
  const selectedSubCategory =
    initialFilters?.subCategory || searchParams.get('subCategory') || '';
  const selectedType = initialFilters?.type || searchParams.get('type') || '';

  const selectedColors = searchParams.get('color')?.split(',') || [];
  const selectedSizes = searchParams.get('sizes')?.split(',') || [];
  const sortBy = searchParams.get('sort') || 'Newest';
  const viewModeParam = searchParams.get('view') || 'grid';
  const viewMode = viewModeParam === 'list' ? 'list' : 'grid';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const query: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          query[key] = value;
        });

        // Overlay initial filters from path
        if (initialFilters?.category) query.category = initialFilters.category;
        if (initialFilters?.subCategory)
          query.subCategory = initialFilters.subCategory;
        if (initialFilters?.type) query.type = initialFilters.type;

        if (!query.limit) query.limit = limit.toString();
        if (!query.page) query.page = page.toString();

        const { data, meta: productMeta } = await getProducts(query);
        setAllProducts(data || []);
        setMeta(productMeta || null);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [searchParams, page, initialFilters]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [colorRes, catRes] = await Promise.all([
          getColors({ limit: '100' }),
          getCategories({ limit: '100' }),
        ]);

        if (colorRes.data) setDbColors(colorRes.data);
        if (catRes.data) setDbCategories(catRes.data);
      } catch (error) {
        console.error('Failed to fetch filter metadata', error);
      }
    };
    fetchMetadata();
  }, []);

  const updateURL = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Separate structural params (path segments) from query params
    const structuralKeys = ['category', 'subCategory', 'type', 'item'];
    const hasStructuralChange = Object.keys(newParams).some((key) =>
      structuralKeys.includes(key),
    );

    let nextCategory = selectedCategory;
    let nextSubCategory = selectedSubCategory;
    let nextType = selectedType;

    Object.entries(newParams).forEach(([key, value]) => {
      if (key === 'category') nextCategory = value || 'All';
      else if (key === 'subCategory') nextSubCategory = value || '';
      else if (key === 'type' || key === 'item') nextType = value || '';
      else {
        if (value === null || value === 'All' || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
    });

    if (!newParams.page) {
      params.delete('page');
    }

    // Clean up structural params from query string since they'll be in the path
    params.delete('category');
    params.delete('subCategory');
    params.delete('type');
    params.delete('item');

    const searchStr = params.toString();
    const queryStr = searchStr ? `?${searchStr}` : '';

    if (hasStructuralChange || initialFilters) {
      const nextPath = generateShopPath(
        nextCategory,
        nextSubCategory,
        nextType,
      );
      router.push(`${nextPath}${queryStr}`);
    } else {
      router.push(`${queryStr}`, { scroll: false });
    }
  };

  const toggleMultiFilter = (key: string, value: string, current: string[]) => {
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateURL({ [key]: updated.length > 0 ? updated.join(',') : null });
  };

  return (
    <TransitionContext.Provider value={{ startTransition, isPending }}>
      <div
        className={cn(
          'bg-background mt-12 min-h-screen pb-20 transition-opacity',
          isPending && 'pointer-events-none opacity-50',
        )}
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h1 className="text-foreground mb-2 text-4xl font-bold">
                {selectedCategory !== 'All'
                  ? `${selectedCategory} ${selectedSubCategory} ${selectedType}`.trim()
                  : 'Lumiere Shop'}
              </h1>
              <p className="text-muted-foreground">
                Discover excellence ({meta?.total || 0} items)
              </p>
            </div>
          </div>

          {(selectedCategory !== 'All' ||
            selectedColors.length > 0 ||
            selectedSizes.length > 0 ||
            searchQuery) && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground mr-2 text-xs font-bold tracking-widest uppercase">
                Active Filters:
              </span>
              {selectedCategory !== 'All' && (
                <Badge
                  variant="secondary"
                  className="gap-1 rounded-full bg-blue-500/10 px-3 py-1 pr-1 text-blue-600 dark:text-blue-400"
                >
                  {selectedCategory}
                  <button
                    onClick={() =>
                      updateURL({ category: 'All', subCategory: '', type: '' })
                    }
                    className="rounded-full p-0.5 hover:bg-blue-500/20"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
              {selectedSizes.map((size) => (
                <Badge
                  key={size}
                  variant="secondary"
                  className="gap-1 rounded-full px-3 py-1 pr-1 text-xs"
                >
                  Size: {size}
                  <button
                    onClick={() =>
                      toggleMultiFilter('sizes', size, selectedSizes)
                    }
                    className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="gap-1 rounded-full px-3 py-1 pr-1"
                >
                  "{searchQuery}"
                  <button
                    onClick={() => updateURL({ q: null })}
                    className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-start gap-12">
            <aside className="sticky top-32 hidden w-64 flex-col gap-10 lg:flex">
              <div>
                <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
                  Category
                </h3>
                <div className="flex flex-col gap-1">
                  {['All', ...dbCategories.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        updateURL({ category: cat, subCategory: '', type: '' });
                      }}
                      className={cn(
                        'group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all',
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-white/5',
                      )}
                    >
                      {cat}
                      {selectedCategory === cat && (
                        <motion.div
                          layoutId="active-cat-pill"
                          className="h-1.5 w-1.5 rounded-full bg-white"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
                  Colors
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {dbColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() =>
                        toggleMultiFilter('color', color.name, selectedColors)
                      }
                      className={cn(
                        'group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 transition-all hover:scale-110 dark:border-white/5',
                        selectedColors.includes(color.name) &&
                          'ring-offset-background ring-2 ring-blue-500 ring-offset-4',
                      )}
                      style={{
                        backgroundColor:
                          color.hex ||
                          color.name.toLowerCase().replace(/\s/g, ''),
                      }}
                      title={color.name}
                    >
                      {selectedColors.includes(color.name) && (
                        <div className="h-2 w-2 rounded-full bg-white mix-blend-difference shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
                  Sizes
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        toggleMultiFilter('sizes', size, selectedSizes)
                      }
                      className={cn(
                        'rounded-lg border py-2 text-sm font-bold transition-all',
                        selectedSizes.includes(size)
                          ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-card border-border text-muted-foreground hover:border-foreground/20',
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <main className="flex-1">
              {loading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <div className="border-border mb-8 flex items-center justify-between border-b pb-8">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'rounded-md',
                          viewMode === 'grid'
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground',
                        )}
                        onClick={() => updateURL({ view: 'grid' })}
                      >
                        <LayoutGrid size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'rounded-md',
                          viewMode === 'list'
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground',
                        )}
                        onClick={() => updateURL({ view: 'list' })}
                      >
                        <List size={18} />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => {
                          router.push('/shop');
                          setLocalSearch('');
                        }}
                      >
                        <FilterX size={14} />
                        Clear Filters
                      </Button>
                      <div className="hidden items-center gap-2 sm:flex">
                        <span className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                          Sort By
                        </span>
                      </div>
                      <Select
                        value={sortBy}
                        onValueChange={(value) => updateURL({ sort: value })}
                      >
                        <SelectTrigger className="bg-card h-10 w-[160px] rounded-xl font-bold">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="Newest">Newest</SelectItem>
                          <SelectItem value="price">Price: Low-High</SelectItem>
                          <SelectItem value="-price">
                            Price: High-Low
                          </SelectItem>
                          <SelectItem value="-rating">Top Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {allProducts.length > 0 ? (
                    <div
                      className={cn(
                        'grid gap-8',
                        viewMode === 'grid'
                          ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                          : 'grid-cols-1',
                      )}
                    >
                      {allProducts.map((product) => (
                        <motion.div
                          key={product._id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={cn(
                            'group bg-card/40 border-border overflow-hidden rounded-3xl border transition-all hover:border-blue-500/20',
                            viewMode === 'list' &&
                              'flex flex-col gap-6 p-4 sm:flex-row',
                          )}
                        >
                          <Link
                            href={`/products/${product.slug}`}
                            className={cn(
                              'relative block overflow-hidden',
                              viewMode === 'grid'
                                ? 'aspect-4/5'
                                : 'aspect-square w-full rounded-2xl sm:w-48',
                            )}
                          >
                            {product.salePrice && product.salePrice > 0 && (
                              <div className="absolute top-4 left-4 z-10">
                                <div className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-black tracking-tighter text-white uppercase shadow-lg">
                                  Sale{' '}
                                  {Math.round(
                                    (1 - product.salePrice / product.price) *
                                      100,
                                  )}
                                  % OFF
                                </div>
                              </div>
                            )}
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>

                          <div className="flex flex-1 flex-col p-6">
                            <div className="mb-2 flex items-start justify-between">
                              <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                                {product.subCategory}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-amber-500">
                                <Star size={12} fill="currentColor" />
                                <span>{product.rating}</span>
                              </div>
                            </div>
                            <Link href={`/products/${product.slug}`}>
                              <h3 className="text-foreground mb-2 truncate text-xl font-bold capitalize transition-colors group-hover:text-blue-500">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground mb-6 line-clamp-2 flex-1 text-sm">
                              {product.description}
                            </p>
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
                                onClick={() => {
                                  addToCart(product as any);
                                  toast.success(
                                    `${product.name} added to cart!`,
                                  );
                                }}
                                className="rounded-full bg-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <p className="text-muted-foreground text-xl font-medium">
                        No products match your filters.
                      </p>
                      <Button
                        variant="link"
                        onClick={() => router.push('/shop')}
                        className="mt-2 text-blue-500"
                      >
                        Reset all filters
                      </Button>
                    </div>
                  )}
                  {meta && (
                    <div className="border-border mt-12 flex justify-center border-t pt-12">
                      <AppPagination meta={meta} />
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-background/80 fixed inset-0 z-50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-card fixed top-0 right-0 z-50 flex h-full w-4/5 max-w-sm flex-col gap-10 overflow-y-auto p-8 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-foreground text-2xl font-bold">Filters</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-muted-foreground"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-10">
                <div>
                  <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
                    Category
                  </h3>
                  <div className="flex flex-col gap-2">
                    {['All', ...dbCategories.map((c) => c.name)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          updateURL({
                            category: cat,
                            subCategory: '',
                            type: '',
                          });
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          'group flex items-center justify-between rounded-2xl px-5 py-4 text-base font-bold transition-all',
                          selectedCategory === cat
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground',
                        )}
                      >
                        {cat}
                        <SlidersHorizontal size={14} className="opacity-20" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
                    Colors
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {dbColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          toggleMultiFilter(
                            'color',
                            color.name,
                            selectedColors,
                          );
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          'relative flex aspect-square items-center justify-center rounded-2xl border border-gray-100 transition-transform active:scale-95 dark:border-white/5',
                          selectedColors.includes(color.name) &&
                            'ring-offset-background ring-2 ring-blue-500 ring-offset-4',
                        )}
                        style={{
                          backgroundColor:
                            color.hex ||
                            color.name.toLowerCase().replace(/\s/g, ''),
                        }}
                        title={color.name}
                      >
                        {selectedColors.includes(color.name) && (
                          <div className="h-2 w-2 rounded-full bg-white mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
                    Sizes
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          toggleMultiFilter('sizes', size, selectedSizes)
                        }
                        className={cn(
                          'rounded-2xl border py-4 text-sm font-bold transition-all active:scale-95',
                          selectedSizes.includes(size)
                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                            : 'bg-muted/50 text-muted-foreground border-transparent hover:border-gray-200 dark:hover:border-white/10',
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export default ShopContent;
