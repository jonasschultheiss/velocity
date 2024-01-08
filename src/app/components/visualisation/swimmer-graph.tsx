import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import {
  fetchSwimmerData,
  type SwimmerResponse,
} from '@/lib/fetch-swimmer-data';
import {
  TechniqueDictionary,
  TrackDictionary,
  urlIdentifierToName,
  useSwimmerValues,
} from '@/lib/utils';
import { ComboBox } from '../combo-box';
import { Typography } from '../typography';
import { InteractiveGraph } from './interactive-graph';
import { SwimmerName } from 'src/db/schema';
import { DefinedSearchParams } from '@/swimmers/[urlIdentifier]/types/search-params.interface';

export interface SwimmerGraphProperties {
  urlIdentifier: string;
}

export async function SwimmerGraph({
  urlIdentifier,
}: SwimmerGraphProperties): Promise<ReactElement> {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();

  const fullName = urlIdentifierToName(urlIdentifier);
  const valueMap = await useSwimmerValues(fullName);
  let firstValidKey = '';

  for (const [key, value] of valueMap.entries()) {
    if (typeof value !== 'string') {
      firstValidKey = key;
      break;
    }
  }

  function replaceParams(): void {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  if (
    typeof valueMap.get(`${params.get('technique')}-${params.get('track')}`) ===
    'string'
  ) {
    const [technique, track] = firstValidKey.split('-');
    if (!technique || !track) {
      throw new Error(
        'You found a really rare error, where a swimmer has no displable graphs. Please report this to the developers.',
      );
    }

    params.set('technique', technique);
    params.set('track', track);
    replaceParams();
  }

  function setTechnique(technique: keyof typeof TechniqueDictionary): void {
    params.set('technique', technique);
    replaceParams();
  }

  function setTrack(track: keyof typeof TrackDictionary): void {
    params.set('track', track);
    replaceParams();
  }

  return (
    <div className="flex flex-col space-y-2">
      <Typography component="h4" variant="large">
        Parameters
      </Typography>
      <ComboBox
        initialValue={Object.keys(TechniqueDictionary).find(
          (el) => TechniqueDictionary[el] === params.get('technique'),
        )}
        optionType="technique"
        options={Object.keys(TechniqueDictionary).map((el) => ({
          label: el,
          value: el,
          onClick: () => {
            setTechnique(TechniqueDictionary[el] || 'F');
          },
        }))}
      />
      <ComboBox
        initialValue={Object.keys(TrackDictionary).find(
          (el) => TrackDictionary[el] === params.get('track'),
        )}
        optionType="track"
        options={Object.keys(TrackDictionary).map((el) => ({
          label: el,
          value: el,
          onClick: () => {
            setTrack(TrackDictionary[el] || '25');
          },
        }))}
      />
      {/* <InteractiveGraph swimmerResponse={{ dataPoints, regressionLine }} /> */}
    </div>
  );
}
