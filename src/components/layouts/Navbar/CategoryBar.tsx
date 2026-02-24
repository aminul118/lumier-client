'use client';

import { toUrlSlug } from '@/lib/url-slugs';
import { cn } from '@/lib/utils';
import { getNavbars, INavItem } from '@/services/navbar/navbar';
import {
  ChevronDown,
  Cpu,
  Headphones,
  Laptop,
  Smartphone,
  Speaker,
  Tablet,
  Tv,
  Watch,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CATEGORY_ICONS: Record<string, any> = {
  PHONES: Smartphone,
  TABLET: Tablet,
  LAPTOP: Laptop,
  'SMART WATCH': Watch,
  GADGET: Cpu,
  ACCESSORIES: Headphones,
  SOUNDS: Speaker,
  'SMART TV': Tv,
  MEN: Smartphone,
  WOMEN: Tablet,
};

const CategoryBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navItems, setNavItems] = useState<INavItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const pathSegments = pathname.split('/').filter(Boolean);
  const currentCategorySlug = pathSegments[0];
  const currentSubCategorySlug = pathSegments[1];
  const currentItemSlug = pathSegments[2];

  useEffect(() => {
    const fetchNav = async () => {
      const res = await getNavbars({});
      if (res?.success) {
        const sortedItems = (res.data || []).sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setNavItems(sortedItems);
      }
    };
    fetchNav();
  }, []);

  return (
    <div className="dark:bg-background relative hidden w-full overflow-visible border-b border-gray-100 bg-white transition-colors lg:block dark:border-white/5">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-1">
          {/* Category Links */}
          <div className="flex items-center">
            {navItems.map((item) => {
              const Icon = CATEGORY_ICONS[item.title.toUpperCase()] || Cpu;
              const categorySlug = toUrlSlug(item.title);
              const isCategoryActive = currentCategorySlug === categorySlug;
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div
                  key={item._id}
                  className="group relative h-full"
                  onMouseEnter={() => setHoveredItem(item._id || null)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex h-full items-center gap-2 px-4 py-4 text-[10px] font-black tracking-widest whitespace-nowrap uppercase transition-all',
                      isCategoryActive || hoveredItem === item._id
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-blue-600 dark:text-gray-400',
                    )}
                  >
                    <Icon
                      size={14}
                      className={cn(
                        'transition-transform group-hover:scale-110',
                        isCategoryActive || hoveredItem === item._id
                          ? 'text-blue-600'
                          : 'text-gray-400 group-hover:text-blue-600',
                      )}
                    />
                    <span>{item.title}</span>
                    {hasSubItems && (
                      <ChevronDown
                        size={10}
                        className={cn(
                          'ml-1 transition-transform',
                          hoveredItem === item._id && 'rotate-180',
                        )}
                      />
                    )}
                    {(isCategoryActive || hoveredItem === item._id) && (
                      <div className="absolute right-0 bottom-0 left-0 z-10 h-0.5 bg-blue-600" />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {hasSubItems && hoveredItem === item._id && (
                    <div className="animate-in fade-in slide-in-from-top-2 dark:bg-background absolute top-full left-0 z-100 grid w-[500px] grid-cols-2 gap-8 border border-gray-100 bg-white p-6 shadow-2xl duration-200 dark:border-white/5">
                      {item.subItems?.map((sub) => {
                        const subCategorySlug = toUrlSlug(sub.title);
                        const isSubActive =
                          isCategoryActive &&
                          currentSubCategorySlug === subCategorySlug;

                        return (
                          <div key={sub.title} className="flex flex-col gap-3">
                            <h3
                              className={cn(
                                'border-b pb-2 text-[11px] font-black tracking-tighter uppercase transition-colors',
                                isSubActive
                                  ? 'border-blue-500 text-blue-600 dark:border-blue-400/50 dark:text-blue-400'
                                  : 'border-blue-50 pb-2 text-[11px] font-black tracking-tighter text-blue-600 uppercase dark:border-blue-900/30 dark:text-blue-400',
                              )}
                            >
                              {sub.title}
                            </h3>
                            <div className="flex flex-col gap-2">
                              {sub.items.map((subItem) => {
                                const itemSlug = toUrlSlug(subItem);
                                const isItemActive =
                                  isSubActive && currentItemSlug === itemSlug;

                                return (
                                  <Link
                                    key={subItem}
                                    href={`/${categorySlug}/${subCategorySlug}/${itemSlug}`}
                                    className={cn(
                                      'text-xs font-bold transition-colors',
                                      isItemActive
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                                    )}
                                  >
                                    {subItem}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Online Exclusive Button */}
        <Link
          href="/shop?exclusive=true"
          className={cn(
            'rounded px-6 py-2 text-[10px] font-black tracking-[0.2em] uppercase transition-colors',
            pathname === '/shop' && searchParams.get('exclusive') === 'true'
              ? 'bg-blue-600 text-white'
              : 'bg-[#111111] text-[#e5d5c5] hover:bg-black',
          )}
        >
          Online Exclusive
        </Link>
      </div>
    </div>
  );
};

export default CategoryBar;
