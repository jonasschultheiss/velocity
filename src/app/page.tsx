'use client';

import { SmileIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import { Typography } from './components/typography';

export default function Page(): ReactElement {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      <SmileIcon className="w-16 h-16 text-muted-foreground" />
      <Typography component="span" variant="h1">
        In development
      </Typography>
    </main>
  );
}
