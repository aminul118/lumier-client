import { AdminSidebarSkeleton } from '@/components/layouts/Admin/AdminSidebarSkeleton';
import DashboardBreadcrumb from '@/components/layouts/Admin/DashboardBreadcrumb ';
import AdminSidebar from '@/components/layouts/Admin/admin-sidebar';
import AdminHeader from '@/components/layouts/Admin/AdminHeader';
import { getMe } from '@/services/user/users';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Children } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

const AdminLayout = async ({ children }: Children) => {
  const { data: user } = await getMe();
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Suspense fallback={<AdminSidebarSkeleton />}>
        <AdminSidebar user={user} />
      </Suspense>
      <SidebarInset>
        <AdminHeader user={user as any} />
        <>{children}</>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;

// SEO
export const metadata: Metadata = {
  title: 'Dashboard | Aminul Islam',
};
