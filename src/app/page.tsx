'use client';

import { SmileIcon } from 'lucide-react';
import { Typography } from './components/typography';
import { IDataPoint } from './data/interfaces';
import { useDataPoints } from './data/useDataPoints';
import { useRegressionLine } from './data/useRegressionLine';

export default function Page() {
  const { regressionLine } = useRegressionLine();
  const { dataPoints } = useDataPoints();

  const tickLabelOffset = 15;

  const accessors = {
    xAccessor: (d: IDataPoint) => (d ? d.x : null),
    yAccessor: (d: IDataPoint) => (d ? d.y : null),
  };

  const distances: number[] = [0, 50, 100, 200, 400, 800, 1500, 5000];

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      <SmileIcon className="w-16 h-16 text-muted-foreground" />
      <Typography variant="h1" component="span">
        In development
      </Typography>
    </main>
  );
}
