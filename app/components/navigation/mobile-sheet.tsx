import logo from '@/public/velocity-logo.svg';
import Image from 'next/image';
import React from 'react';
import { SheetContent } from '../ui/sheet';
import { INavigationRoute, NavigaionItems } from './navigation-items';

export interface IMobileSheetProperties extends React.HTMLAttributes<HTMLDivElement> {
  navigationRoutes: INavigationRoute[];
}

export function MobileSheet(properties: Readonly<IMobileSheetProperties>): React.ReactNode {
  const { className, navigationRoutes } = properties;
  return (
    <SheetContent side={'left'}>
      <div className="flex items-center justify-between">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image priority className="h-8 w-auto" src={logo} alt="Velocity logo" />
        </a>
      </div>
      <NavigaionItems.Mobile navigationRoutes={navigationRoutes} />
    </SheetContent>
  );
}
