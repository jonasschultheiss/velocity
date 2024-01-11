import { type ReactElement } from 'react';
import { Typography } from '@/components/typography';
import type { SwimmerPossibilities } from '@/lib/fetch-swimmer-options';
import { fetchPossibleOptions } from '@/lib/fetch-swimmer-options';
import { urlIdentifierToName } from '@/lib/utils';
import { fetchSwimmerData } from '@/lib/fetch-swimmer-data';
import { InteractiveGraph } from '@/components/visualisation/interactive-graph';
import { SwimmerGraphParameters } from '@/components/visualisation/swimmer-graph';
import type { SwimmerDataSet } from '@/components/visualisation/graph';
import { makeDataset } from '@/lib/make-dataset';
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

  const datasets: SwimmerDataSet[] = [];
  if (possibleOptions[`${technique}-${track}` as keyof SwimmerPossibilities]) {
    const swimmerResponse = await fetchSwimmerData(
      { technique, track },
      fullName.surname,
      fullName.lastname,
    );

    datasets.push({
      regressionLine: makeDataset(
        'regressionLine',
        '#ef4444',
        swimmerResponse.regressionLine,
      ),
      dataPoints: makeDataset(
        'dataPoints',
        '#3b82f6',
        swimmerResponse.dataPoints,
      ),
    });
  }

  return (
    <div className="flex flex-col gap-y-4 md:border md:rounded-lg md:p-6">
      <Typography component="h3" variant="h3">
        Graph controls
      </Typography>
      <Typography component="p" variant="muted">
        Change how you see data
      </Typography>
      <SwimmerGraphParameters possibleOptions={possibleOptions} />
      <InteractiveGraph data={datasets} />
    </div>
  );
}
