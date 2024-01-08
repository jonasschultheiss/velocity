'use client';

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { Typography } from '../typography';
import { SwimmerGraph } from './swimmer-graph';

export interface SwimmerGraphWrapperProperties {
  urlIdentifier: string;
}

export function SwimmerGraphWrapper({
  urlIdentifier,
}: Readonly<SwimmerGraphWrapperProperties>): ReactElement {
  return (
    <div className="flex flex-col gap-y-4">
      <Typography component="h3" variant="h3">
        Graph controls
      </Typography>
      <Typography component="p" variant="muted">
        Change how you see data
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <SwimmerGraph urlIdentifier={urlIdentifier} />
      </Suspense>
    </div>
  );
}
