import { Suspense, type ReactElement } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { Typography } from '@/components/typography';
import { SwimmerGraph } from '@/components/visualisation/swimmer-graph';
import {
  SwimmerPossibilities,
  fetchPossibleOptions,
} from '@/lib/fetch-swimmer-options';
import { urlIdentifierToName } from '@/lib/utils';
import { DefinedSearchParams } from '../types/search-params.interface';
import { log } from 'console';

export interface SwimmerStatisticsPageProperties {
  params: { urlIdentifier: string };
  searchParams: DefinedSearchParams;
}

export default async function Page({
  params: { urlIdentifier },
  searchParams: { technique, track },
}: SwimmerStatisticsPageProperties): Promise<ReactElement> {
  const fullName = urlIdentifierToName(urlIdentifier);
  const possibleOptions = await fetchPossibleOptions(fullName);

  log(
    Boolean(
      possibleOptions[`${technique}-${track}` as keyof SwimmerPossibilities],
    ),
  );

  return (
    <div className="flex flex-col gap-y-4">
      <Typography component="h3" variant="h3">
        Graph controls
      </Typography>
      <Typography component="p" variant="muted">
        Change how you see data
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <SwimmerGraph possibleOptions={possibleOptions} />
      </Suspense>
    </div>
  );
}
