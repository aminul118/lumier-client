import { Column } from '@/components/common/table/TableManageMent';
import { IProduct } from '@/services/product/product';
import Image from 'next/image';
import Link from 'next/link';
import ProductActions from './ProductActions';

const StockBadge = ({ stock }: { stock: number }) => {
  if (stock === 0) {
    return (
      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-500">
        Out of Stock
      </span>
    );
  }
  if (stock <= 10) {
    return (
      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-500">
        Low ({stock})
      </span>
    );
  }
  return (
    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-500">
      In Stock ({stock})
    </span>
  );
};

const ProductsColumn: Column<IProduct>[] = [
  {
    header: 'Product',
    accessor: (p) => (
      <Link
        href={`/admin/products/${p._id}`}
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-white/10">
          <Image
            src={(p.image as string) || '/placeholder.png'}
            alt={p.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="max-w-[160px] truncate font-medium">{p.name}</span>
          <span className="text-muted-foreground text-xs">
            {p.category} · {p.subCategory}
          </span>
        </div>
      </Link>
    ),
  },
  {
    header: 'Price',
    accessor: (p) => (
      <div className="flex flex-col">
        <span className="font-bold">৳{p.price.toFixed(2)}</span>
        {p.salePrice && (
          <span className="text-xs font-bold text-emerald-500">
            Sale: ৳{p.salePrice.toFixed(2)}
          </span>
        )}
      </div>
    ),
  },
  {
    header: 'Stock',
    accessor: (p) => <StockBadge stock={p.stock} />,
  },
  {
    header: 'Rating',
    accessor: (p) => (
      <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
        ★ {p.rating?.toFixed(1) ?? '—'}
      </span>
    ),
  },
  {
    header: 'Sold',
    accessor: (p) => (
      <span className="text-muted-foreground text-sm font-bold">
        {p.soldCount ?? 0}
      </span>
    ),
  },
  {
    header: 'Featured',
    accessor: (p) =>
      p.featured ? (
        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-500">
          Yes
        </span>
      ) : (
        <span className="text-muted-foreground text-xs">No</span>
      ),
  },
  {
    header: 'Actions',
    accessor: (p) => <ProductActions product={p} />,
  },
];

export default ProductsColumn;
