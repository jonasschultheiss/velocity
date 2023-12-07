import logo from '@/public/velocity-logo.svg';
import Image from 'next/image';
import React from 'react';
import { ModeToggle } from '../theme-provider/theme-toggle';
import { SheetContent } from '../ui/sheet';
import { INavigationRoute, NavigationItems } from './navigation-items';

export interface IMobileSheetProperties extends React.HTMLAttributes<HTMLDivElement> {
  navigationRoutes: INavigationRoute[];
}

export function MobileSheet(properties: Readonly<IMobileSheetProperties>): React.ReactNode {
  const { className, navigationRoutes } = properties;
  return (
    <SheetContent className="flex flex-col justify-between" side={'left'}>
      <div className="flex flex-col">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image priority className="w-auto h-8" src={logo} alt="Velocity logo" />
        </a>
        <NavigationItems.Mobile navigationRoutes={navigationRoutes} />
      </div>
      <ModeToggle />
    </SheetContent>
  );
}
