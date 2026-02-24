import Logo from '@/components/common/Logo';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { IUser } from '@/types';
import Menu from './Menu';

const UserSidebar = ({ user, logoUrl }: { user: IUser; logoUrl?: string }) => {
  return (
    <Sidebar collapsible="icon" className="bg-black! text-white!">
      {/* Header */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-4">
          <Logo logoUrl={logoUrl} className="origin-left scale-90" />
        </div>
      </SidebarHeader>
      <Separator className="bg-white/10" />
      <SidebarContent>
        {/* User menu — role filtering available but all items visible to USER */}
        <Menu role={user?.role} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default UserSidebar;
