import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
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

export interface INavigaitonItemsProperties extends React.HTMLAttributes<HTMLDivElement> {
  navigationRoutes: INavigationRoute[];
}

function NavigationItemsMobile(properties: Readonly<INavigaitonItemsProperties>): React.ReactNode {
  const { navigationRoutes, className } = properties;
  return (
    <div className={cn('mt-6 space-y-2', className)}>
      {navigationRoutes.map((route) => (
        <Link
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

function NavigationItemsDesktop(properties: Readonly<INavigaitonItemsProperties>): React.ReactNode {
  const { navigationRoutes, className } = properties;
  return (
    <NavigationMenu className={cn('hidden lg:flex lg:gap-x-2', className)}>
      <NavigationMenuList>
        {navigationRoutes.map((route) => (
          <NavigationMenuItem key={route.name}>
            <Link href={route.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{route.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <ModeToggle />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export const NavigationItems = { Mobile: NavigationItemsMobile, Desktop: NavigationItemsDesktop };
