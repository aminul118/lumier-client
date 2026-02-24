import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { IUser } from '@/types';
import Link from 'next/link';
import Logo from '../../../assets/Logo';
import Menu from './Menu';

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
        <Menu user={user} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
