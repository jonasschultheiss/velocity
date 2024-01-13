'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';
import logo from '@/public/velocity-logo.svg';
import { Typography } from '../typography';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { MobileSheet } from './mobile-sheet';
import type { NavigationRoute } from './navigation-items';
import { NavigationItems } from './navigation-items';

const navigation: NavigationRoute[] = [
  { name: 'Swimmers', href: '/swimmers' },
  { name: 'Comparison', href: '/comparison' },
  { name: 'About', href: '/about' },
];

export function Navigation(): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
      <Sheet onOpenChange={setOpen} open={open}>
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-6 py-4 mx-auto"
        >
          <Link
            className="-m-1.5 p-1.5 flex flex-row items-center gap-x-4"
            href="/"
          >
            <span className="sr-only">Velocity</span>
            <Image
              alt="Velocity logo"
              className="w-auto h-8 text-fill text-foreground"
              priority
              src={logo as StaticImageData}
            />
            <Typography
              className="hidden lg:block"
              component="span"
              variant="large"
            >
              velocity
            </Typography>
          </Link>

          <div className="flex lg:hidden">
            <SheetTrigger asChild>
              <button
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                type="button"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="w-6 h-6" />
              </button>
            </SheetTrigger>
          </div>
          <NavigationItems.Desktop navigationRoutes={navigation} />
          <MobileSheet navigationRoutes={navigation} setOpen={setOpen} />
        </nav>
      </Sheet>
    </header>
  );
}
