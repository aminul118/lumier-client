import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { getMe } from '@/services/user/users';
import Link from 'next/link';
import Logo from '../../../assets/Logo';
import Menu from './Menu';
import { IUser } from '@/types';

const UserSidebar = ({ user }: { user: IUser }) => {
    return (
        <Sidebar collapsible="icon">
            {/* Header */}
            <SidebarHeader>
                <Link href="/user" className="py-4">
                    <Logo />
                </Link>
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                {/* User menu — role filtering available but all items visible to USER */}
                <Menu role={user?.role} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

export default UserSidebar;
