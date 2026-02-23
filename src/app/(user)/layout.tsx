import UserSidebar from '@/components/layouts/User/user-sidebar';
import UserHeader from '@/components/layouts/User/UserHeader';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import { Children } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminSidebarSkeleton } from '@/components/layouts/Admin/AdminSidebarSkeleton';
import { getMe } from '@/services/user/users';

const UserLayout = async ({ children }: Children) => {
    const { data: user } = await getMe();
    return (
        <SidebarProvider>
            {/* User Sidebar */}
            <Suspense fallback={<AdminSidebarSkeleton />}>
                <UserSidebar user={user} />
            </Suspense>
            <SidebarInset>
                <UserHeader user={user as any} />
                <>{children}</>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default UserLayout;

export const metadata: Metadata = {
    title: 'My Portal | Lumiere',
};
