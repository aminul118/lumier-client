'use client';

import { adminSidebarMenu } from '@/components/layouts/Admin/admin-menu';
import DynamicMenu from '@/components/layouts/shared/DynamicMenu';

import { IUser } from '@/types';

interface MenuProps {
  user?: IUser;
}

const Menu = ({ user }: MenuProps) => {
  return (
    <DynamicMenu menuGroups={adminSidebarMenu} role={user?.role} user={user} />
  );
};

export default Menu;
