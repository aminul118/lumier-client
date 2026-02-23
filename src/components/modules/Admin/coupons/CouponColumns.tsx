import { Column } from '@/components/common/table/TableManageMent';
import { ICoupon } from '@/services/coupon/coupon';
import CouponActions from './CouponActions';
import { Badge } from '@/components/ui/badge';

const CouponColumns: Column<ICoupon>[] = [
    {
        header: 'SI',
        accessor: (_, i) => (
            <span className="text-muted-foreground font-medium">{(i + 1).toString().padStart(2, '0')}</span>
        ),
    },
    {
        header: 'Name',
        accessor: (c) => <span className="font-semibold text-white">{c.name}</span>,
    },
    {
        header: 'Code',
        accessor: (c) => (
            <Badge variant="outline" className="font-mono text-blue-500 border-blue-500/20 bg-blue-500/5 px-2 py-0.5">
                {c.code}
            </Badge>
        ),
    },
    {
        header: 'Discount',
        accessor: (c) => (
            <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-white">{c.discount}%</span>
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Off</span>
            </div>
        ),
    },
    {
        header: 'Expiry Date',
        accessor: (c) => (
            <span className="text-muted-foreground whitespace-nowrap">
                {new Date(c.expiryDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </span>
        ),
    },
    {
        header: 'Status',
        accessor: (c) => {
            const isExpired = new Date(c.expiryDate) < new Date();
            return isExpired ? (
                <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">Expired</Badge>
            ) : (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
            );
        },
    },
    {
        header: 'Actions',
        accessor: (c) => <CouponActions coupon={c} />,
    },
];

export default CouponColumns;
