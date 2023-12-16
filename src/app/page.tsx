'use client';

import { SmileIcon } from 'lucide-react';
import { Typography } from './components/typography';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      <SmileIcon className="w-16 h-16 text-muted-foreground" />
      <Typography variant="h1" component="span">
        In development
      </Typography>
    </main>
  );
}
