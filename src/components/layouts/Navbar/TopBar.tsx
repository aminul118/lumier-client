'use client';

import { FileText, Gift, LucideIcon, Phone } from 'lucide-react';
import Link from 'next/link';

type LinkItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
  iconColor?: string;
};

const links: LinkItem[] = [
  {
    name: 'Order Tracking',
    href: '/track-order',
  },
  {
    name: 'Gift',
    href: '/gift',
    icon: Gift,
    iconColor: 'text-orange-400',
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: FileText,
    iconColor: 'text-orange-400',
  },
  {
    name: 'EMI Policy',
    href: '/emi',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Store Location',
    href: '/location',
  },
];

const TopBar = () => {
  return (
    <div className="hidden w-full border-b border-gray-100 bg-white py-2 transition-colors md:block dark:border-white/5 dark:bg-[#0a0a0a]">
      <div className="container mx-auto flex items-center justify-between px-4 text-[10px] font-bold tracking-wider text-gray-600 uppercase dark:text-gray-400">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400 dark:text-gray-600" />
          <span>01633501122</span>
        </div>

        {/* Right Side Dynamic Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {Icon && (
                  <Icon
                    size={12}
                    className={`${link.iconColor} transition-transform group-hover:scale-110`}
                  />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
