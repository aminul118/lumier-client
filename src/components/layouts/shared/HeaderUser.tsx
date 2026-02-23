'use client';

import LogOutDropDown from '@/components/modules/Authentication/log-out-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IUser } from '@/types';
import { Settings, User, LayoutDashboard, Lock } from 'lucide-react';
import Link from 'next/link';
import { getDefaultDashboardRoute } from '@/services/user/user-access';
import { usePathname } from 'next/navigation';

interface Props {
    user: IUser;
    portalType?: 'admin' | 'user';
}

const HeaderUser = ({ user, portalType }: Props) => {
    const pathname = usePathname();
    const isInsidePortal = pathname.startsWith('/admin') || pathname.startsWith('/user');

    const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
    const initials = fullName
        ? fullName
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'U';

    const dashboardRoute = getDefaultDashboardRoute(user?.role as any);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <AvatarImage
                        src={user?.picture ? user?.picture : '/profile.jpg'}
                        alt={user?.fullName}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 rounded-xl p-2" align="end" sideOffset={8}>
                <DropdownMenuLabel className="p-2 font-normal">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage
                                src={user?.picture ? user?.picture : '/profile.jpg'}
                                alt={user?.fullName}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-0.5">
                            <span className="text-sm font-bold truncate leading-none">{user?.fullName}</span>
                            <span className="text-[11px] text-muted-foreground truncate leading-none">
                                {user?.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem asChild>
                        <Link
                            href="/settings/profile"
                            className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent"
                        >
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">My Profile</span>
                        </Link>
                    </DropdownMenuItem>

                    {!isInsidePortal && (
                        <DropdownMenuItem asChild>
                            <Link
                                href={dashboardRoute}
                                className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent"
                            >
                                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                        <Link
                            href="/settings/password"
                            className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent"
                        >
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Password</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            href="/settings/appearance"
                            className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent"
                        >
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Appearance</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2" />
                <div className="px-1">
                    <LogOutDropDown />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default HeaderUser;
