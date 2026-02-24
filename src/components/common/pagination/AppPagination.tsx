'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useTransition } from '@/context/useTransition';
import { cn } from '@/lib/utils';
import { IMeta } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface IPaginationProps {
  meta: IMeta;
  className?: string;
}

const AppPagination = ({ meta, className }: IPaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { startTransition, isPending } = useTransition();

  const { page, totalPage } = meta;

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPage <= 1) return null;

  const getPaginationItems = () => {
    const items: (number | 'ellipsis')[] = [];
    const delta = 1; // Number of pages to show on each side of the current page

    for (let i = 1; i <= totalPage; i++) {
      if (
        i === 1 || // Always show first page
        i === totalPage || // Always show last page
        (i >= page - delta && i <= page + delta) // Show pages around current page
      ) {
        items.push(i);
      } else if (
        (i === page - delta - 1 && i > 1) ||
        (i === page + delta + 1 && i < totalPage)
      ) {
        items.push('ellipsis');
      }
    }

    // Filter out consecutive ellipses (shouldn't happen with above logic but just in case)
    return items.filter((item, index) => {
      if (item === 'ellipsis' && items[index - 1] === 'ellipsis') return false;
      return true;
    });
  };

  const paginationItems = getPaginationItems();

  return (
    <Pagination className={cn('py-6 md:py-8 lg:py-12', className)}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              (page <= 1 || isPending) && 'pointer-events-none opacity-50',
              'cursor-pointer',
            )}
            onClick={() => page > 1 && handlePageChange(page - 1)}
            aria-disabled={page <= 1 || isPending}
          />
        </PaginationItem>

        {/* Pages */}
        {paginationItems.map((item, index) => (
          <PaginationItem key={index}>
            {item === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={item === page}
                onClick={() => handlePageChange(item as number)}
                className={cn(
                  isPending && 'pointer-events-none',
                  'cursor-pointer',
                )}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            className={cn(
              (page >= totalPage || isPending) &&
                'pointer-events-none opacity-50',
              'cursor-pointer',
            )}
            onClick={() => page < totalPage && handlePageChange(page + 1)}
            aria-disabled={page >= totalPage || isPending}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
