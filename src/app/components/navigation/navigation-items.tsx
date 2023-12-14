import Link from 'next/link';
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '../../lib/utils';
import { ModeToggle } from '../theme-provider/theme-toggle';
import { Typography } from '../typography';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

export interface INavigationRoute {
  name: string;
  href: string;
}

export interface INavigatitonItemsProperties extends React.HTMLAttributes<HTMLDivElement> {
  navigationRoutes: INavigationRoute[];
}
export interface INavigatitonItemsMobileProperties extends INavigatitonItemsProperties {
  setOpen: (open: boolean) => void;
}

function NavigationItemsMobile(properties: Readonly<INavigatitonItemsMobileProperties>): React.ReactNode {
  const { navigationRoutes, setOpen, className } = properties;
  return (
    <div className={cn('mt-6 space-y-2', className)}>
      {navigationRoutes.map((route) => (
        <Link
          onClick={() => setOpen(false)}
          key={route.name}
          href={route.href}
          className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 duration-100 ease-in-out rounded-lg text-muted-foreground hover:text-foreground"
        >
          <Typography variant="large" component="span">
            {route.name}
          </Typography>
        </Link>
      ))}
    </div>
  );
}

function NavigationItemsDesktop(properties: Readonly<INavigatitonItemsProperties>): React.ReactNode {
  const { navigationRoutes, className } = properties;
  const currentPath = usePathname();

  return (
    <NavigationMenu className={cn('hidden lg:flex lg:gap-x-2', className)}>
      <NavigationMenuList>
        {navigationRoutes.map((route) => (
          <NavigationMenuItem key={route.name}>
            <Link href={route.href} legacyBehavior passHref>
              <NavigationMenuLink active={currentPath === route.href} className={navigationMenuTriggerStyle()}>
                {route.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <ModeToggle />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const NavigationItems = { Mobile: NavigationItemsMobile, Desktop: NavigationItemsDesktop };
