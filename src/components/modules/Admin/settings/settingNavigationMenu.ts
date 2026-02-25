import { Lock, Palette, User } from 'lucide-react';

const settingNavigationMenu = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/admin/settings/profile',
    icon: User,
    description: 'Manage your personal information',
  },
  {
    id: 'password',
    label: 'Password',
    href: '/admin/settings/password',
    icon: Lock,
    description: 'Update your password',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    href: '/admin/settings/appearance',
    icon: Palette,
    description: 'Customize theme and appearance',
  },
];

export { settingNavigationMenu };
