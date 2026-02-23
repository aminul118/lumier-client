'use client';

import TableManageMent from '@/components/common/table/TableManageMent';
import { ICoupon } from '@/services/coupon/coupon';
import CouponColumns from './CouponColumns';

const CouponsTable = ({ coupons }: { coupons: ICoupon[] }) => {
    return (
        <TableManageMent
            columns={CouponColumns}
            data={coupons || []}
            getRowKey={(c) => c._id as string}
            emptyMessage="No coupons found"
        />
    );
};

export default CouponsTable;
