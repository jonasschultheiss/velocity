'use client';
import logo from '@/public/velocity-logo.svg';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../typography';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { MobileSheet } from './mobile-sheet';
import { INavigationRoute, NavigationItems } from './navigation-items';

const navigation: INavigationRoute[] = [
  { name: 'Swimmer', href: '#' },
  { name: 'Comparison', href: '#' },
  { name: 'About', href: '#' },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sheet>
        <nav className="flex items-center justify-between px-6 py-4 mx-auto" aria-label="Global">
          <Link href="/" className="-m-1.5 p-1.5 flex flex-row items-center gap-x-4">
            <span className="sr-only">Your Company</span>
            <Image priority className="w-auto h-8 text-fill text-foreground" src={logo} alt="Velocity logo" />
            <Typography variant="large" component="span" className="hidden lg:block">
              velocity
            </Typography>
          </Link>

          <div className="flex lg:hidden">
            <SheetTrigger asChild>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
          </div>
          <NavigationItems.Desktop navigationRoutes={navigation} />
          <MobileSheet navigationRoutes={navigation} />
        </nav>
      </Sheet>
    </header>
  );
}
