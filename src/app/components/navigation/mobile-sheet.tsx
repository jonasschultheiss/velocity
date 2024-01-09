import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import logo from '@/public/velocity-logo.svg';
import { ModeToggle } from '../theme-provider/theme-toggle';
import { SheetContent } from '../ui/sheet';
import type { NavigationRoute } from './navigation-items';
import { NavigationItems } from './navigation-items';

export interface MobileSheetProperties extends HTMLAttributes<HTMLDivElement> {
  navigationRoutes: NavigationRoute[];
  setOpen: (open: boolean) => void;
}

export function MobileSheet(
  properties: Readonly<MobileSheetProperties>,
): React.ReactNode {
  const { navigationRoutes, setOpen } = properties;
  return (
    <SheetContent className="flex flex-col justify-between" side="left">
      <div className="flex flex-col">
        <Link className="-m-1.5 p-1.5" href="/">
          <span className="sr-only">Your Company</span>
          <Image
            alt="Velocity logo"
            className="w-auto h-8"
            priority
            src={logo as StaticImageData}
          />
        </Link>
        <NavigationItems.Mobile
          navigationRoutes={navigationRoutes}
          setOpen={setOpen}
        />
      </div>
      <ModeToggle />
    </SheetContent>
  );
}
