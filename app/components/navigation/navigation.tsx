import logo from '@/public/velocity-logo.svg';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ModeToggle } from '../theme-provider/theme-toggle';
import { Typography } from '../typography';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { MobileSheet } from './mobile-sheet';
import { INavigationRoute, NavigaionItems } from './navigation-items';

const navigation: INavigationRoute[] = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sheet>
        <nav className="mx-auto flex items-center justify-between px-6 py-4" aria-label="Global">
          <div className="flex flex-row items-center gap-x-4">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image priority className="h-8 w-auto text-fill text-foreground" src={logo} alt="Velocity logo" />
            </a>
            <Typography variant="h2" component="span" className="hidden lg:block">
              velocity
            </Typography>
          </div>
          <div className="flex lg:hidden">
            <SheetTrigger asChild>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
          </div>
          <div className="flex flex-end items-center gap-x-8">
            <NavigaionItems.Desktop navigationRoutes={navigation} />
            <div className="hidden lg:block">
              <ModeToggle />
            </div>
          </div>
        </nav>
        <MobileSheet navigationRoutes={navigation} />
      </Sheet>
    </header>
  );
}
