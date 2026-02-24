'use client';

import { cn } from '@/lib/utils';
import { ICategory } from '@/services/category/category';
import { IColor } from '@/services/color/color';
import { motion } from 'framer-motion';

interface FilterSectionProps {
  dbCategories: ICategory[];
  dbColors: IColor[];
  selectedCategory: string;
  selectedSubCategory: string;
  selectedType: string;
  selectedColors: string[];
  selectedSizes: string[];
  sortBy: string;
  onUpdateURL: (params: Record<string, string | null>) => void;
  onToggleMultiFilter: (key: string, value: string, current: string[]) => void;
  showSort?: boolean;
}

const FilterSection = ({
  dbCategories,
  dbColors,
  selectedCategory,
  selectedSubCategory,
  selectedType,
  selectedColors,
  selectedSizes,
  sortBy,
  onUpdateURL,
  onToggleMultiFilter,
  showSort = false,
}: FilterSectionProps) => {
  const currentCategoryData = dbCategories.find(
    (c) => c.name === selectedCategory,
  );

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="flex flex-col gap-10">
      {showSort && (
        <div>
          <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
            Sort By
          </h3>
          <div className="flex flex-col gap-1">
            {[
              { label: 'Newest First', value: 'Newest' },
              { label: 'Price: Low-High', value: 'price' },
              { label: 'Price: High-Low', value: '-price' },
              { label: 'Top Rated', value: '-rating' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => onUpdateURL({ sort: item.value })}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300',
                  sortBy === item.value
                    ? 'bg-[#0a0b10] text-[#4f46e5]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white',
                )}
              >
                {item.label}
                {sortBy === item.value && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          {['All', ...dbCategories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onUpdateURL({ category: cat, subCategory: '', type: '' });
              }}
              className={cn(
                'group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300',
                selectedCategory === cat
                  ? 'bg-[#0a0b10] text-[#4f46e5] shadow-xl'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white',
              )}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div
                  layoutId="active-cat-pill"
                  className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories (Dynamic) */}
      {currentCategoryData && currentCategoryData.subCategories.length > 0 && (
        <div>
          <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
            Sub Category
          </h3>
          <div className="flex flex-col gap-1">
            {currentCategoryData.subCategories.map((sub) => (
              <button
                key={sub.title}
                onClick={() => {
                  onUpdateURL({ subCategory: sub.title, type: '' });
                }}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300',
                  selectedSubCategory === sub.title
                    ? 'bg-[#0a0b10] text-[#4f46e5] shadow-xl'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white',
                )}
              >
                {sub.title}
                {selectedSubCategory === sub.title && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Types (Dynamic based on selected subcategory) */}
      {selectedSubCategory &&
        currentCategoryData?.subCategories.find(
          (s) => s.title === selectedSubCategory,
        ) && (
          <div>
            <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
              Collection Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentCategoryData.subCategories
                .find((s) => s.title === selectedSubCategory)
                ?.items.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onUpdateURL({ type: type });
                    }}
                    className={cn(
                      'rounded-xl border border-white/5 px-4 py-2 text-xs font-bold transition-all duration-300',
                      selectedType === type
                        ? 'border-transparent bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-[#151722] text-gray-400 hover:border-white/20 hover:text-white',
                    )}
                  >
                    {type}
                  </button>
                ))}
            </div>
          </div>
        )}

      <div>
        <h3 className="text-foreground mb-6 text-sm font-bold tracking-widest uppercase">
          Colors
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {dbColors.map((color) => (
            <button
              key={color.name}
              onClick={() =>
                onToggleMultiFilter('color', color.name, selectedColors)
              }
              className={cn(
                'group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 transition-all hover:scale-110 dark:border-white/5',
                selectedColors.includes(color.name) &&
                  'ring-offset-background ring-2 ring-blue-500 ring-offset-4',
              )}
              style={{
                backgroundColor:
                  color.hex || color.name.toLowerCase().replace(/\s/g, ''),
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
              onClick={() => onToggleMultiFilter('sizes', size, selectedSizes)}
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
    </div>
  );
};

export default FilterSection;
