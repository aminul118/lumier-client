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

const AdminSidebar = ({ user }: { user: IUser }) => {
  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <Link href="/admin" className="py-4">
          <Logo />
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {/* Sidebar Menu — passes user role for dynamic filtering */}
        <Menu role={user?.role} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
