import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Typography } from '../typography';

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
        <a
          key={route.name}
          href={route.href}
          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-muted hover:text-foreground duration-100 ease-in-out"
        >
          {route.name}
        </a>
      ))}
    </div>
  );
}

function NavigationItemsDesktop(properties: Readonly<INavigaitonItemsProperties>): React.ReactNode {
  const { navigationRoutes, className } = properties;
  return (
    <div className={cn('hidden lg:flex lg:gap-x-2', className)}>
      {navigationRoutes.map((route) => (
        <Link
          key={route.name}
          href={route.href}
          className="text-sm font-semibold leading-6 text-foreground/50 focus:text-foreground px-2 py-1 focus:ring focus:outline-none hover:text-foreground duration-100 ease-in-out"
        >
          <Typography variant="h4" component="span">
            {route.name}
          </Typography>
        </Link>
      ))}
    </div>
  );
}

export const NavigaionItems = { Mobile: NavigationItemsMobile, Desktop: NavigationItemsDesktop };
