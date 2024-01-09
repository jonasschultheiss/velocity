import { Suspense, type ReactElement } from 'react';
import { Typography } from '@/components/typography';
import { SwimmerGraph } from '@/components/visualisation/swimmer-graph';
import type { SwimmerPossibilities } from '@/lib/fetch-swimmer-options';
import { fetchPossibleOptions } from '@/lib/fetch-swimmer-options';
import { urlIdentifierToName } from '@/lib/utils';
import type { SwimmerResponse } from '@/lib/fetch-swimmer-data';
import { fetchSwimmerData } from '@/lib/fetch-swimmer-data';
import type { DefinedSearchParams } from '../types/search-params.interface';

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
  let swimmerResponse: SwimmerResponse | null = null;
  if (possibleOptions[`${technique}-${track}` as keyof SwimmerPossibilities]) {
    swimmerResponse = await fetchSwimmerData(
      { technique, track },
      fullName.surname,
      fullName.lastname,
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Typography component="h3" variant="h3">
        Graph controls
      </Typography>
      <Typography component="p" variant="muted">
        Change how you see data
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <SwimmerGraph
          data={swimmerResponse}
          possibleOptions={possibleOptions}
        />
      </Suspense>
    </div>
  );
}
