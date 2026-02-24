import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';

interface ActiveFiltersProps {
  selectedCategory: string;
  selectedColors: string[];
  selectedSizes: string[];
  selectedQuery?: string;
  onUpdateURL: (params: Record<string, string | null>) => void;
  onToggleMultiFilter: (key: string, value: string, current: string[]) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({
  selectedCategory,
  selectedColors,
  selectedSizes,
  selectedQuery,
  onUpdateURL,
  onToggleMultiFilter,
  onClearAll,
}: ActiveFiltersProps) => {
  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    !!selectedQuery;

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground mr-2 text-xs font-bold tracking-widest uppercase">
          Active Filters:
        </span>
        {selectedQuery && (
          <Badge
            variant="secondary"
            className="gap-1 rounded-full bg-blue-500/10 px-3 py-1 pr-1 text-blue-600 dark:text-blue-400"
          >
            Search: {selectedQuery}
            <button
              onClick={() => onUpdateURL({ q: null })}
              className="rounded-full p-0.5 hover:bg-blue-500/20"
            >
              <X size={12} />
            </button>
          </Badge>
        )}
        {selectedCategory !== 'All' && (
          <Badge
            variant="secondary"
            className="gap-1 rounded-full bg-blue-500/10 px-3 py-1 pr-1 text-blue-600 dark:text-blue-400"
          >
            {selectedCategory}
            <button
              onClick={() =>
                onUpdateURL({ category: 'All', subCategory: '', type: '' })
              }
              className="rounded-full p-0.5 hover:bg-blue-500/20"
            >
              <X size={12} />
            </button>
          </Badge>
        )}
        {selectedColors.map((color) => (
          <Badge
            key={color}
            variant="secondary"
            className="gap-1 rounded-full px-3 py-1 pr-1 text-xs"
          >
            Color: {color}
            <button
              onClick={() =>
                onToggleMultiFilter('color', color, selectedColors)
              }
              className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
        {selectedSizes.map((size) => (
          <Badge
            key={size}
            variant="secondary"
            className="gap-1 rounded-full px-3 py-1 pr-1 text-xs"
          >
            Size: {size}
            <button
              onClick={() => onToggleMultiFilter('sizes', size, selectedSizes)}
              className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-8 gap-2 rounded-full px-3 text-xs font-bold text-red-500 hover:bg-red-500/10 hover:text-red-600"
      >
        <Trash2 size={14} />
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;
