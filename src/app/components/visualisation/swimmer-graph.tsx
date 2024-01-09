/* eslint-disable @typescript-eslint/no-non-null-assertion -- Timely reasons TODO: remove*/
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { TechniqueDictionary, TrackDictionary } from '@/lib/utils';
import type { SwimmerPossibilities } from '@/lib/fetch-swimmer-options';
import { ComboBox } from '../combo-box';
import { Typography } from '../typography';

export interface SwimmerGraphProperties {
  possibleOptions: SwimmerPossibilities;
}

export function SwimmerGraph({
  possibleOptions,
}: SwimmerGraphProperties): ReactElement {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();

  function replaceParams(): void {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setTechnique(technique: keyof typeof TechniqueDictionary): void {
    params.set('technique', technique);
    replaceParams();
  }

  function setTrack(track: keyof typeof TrackDictionary): void {
    params.set('track', track);
    replaceParams();
  }

  function shouldBeDisabled(type: 'technique' | 'track', el: string): boolean {
    const technique = params.get('technique');
    const track = params.get('track');

    if (type === 'technique' && el === 'B') {
      console.log(`${el}-${track}`);
      console.log(
        `case a: ${Boolean(
          possibleOptions[`${el}-${track}` as keyof SwimmerPossibilities],
        )}`,
      );
    }

    if (type === 'track' && technique) {
      return possibleOptions[
        `${technique}-${el}` as keyof SwimmerPossibilities
      ];
    }

    if (type === 'technique' && track) {
      return possibleOptions[`${el}-${track}` as keyof SwimmerPossibilities];
    }

    return false;
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
          // disabled: shouldBeDisabled('technique', TechniqueDictionary[el]!),
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
          // disabled: shouldBeDisabled('track', TrackDictionary[el]!),
          onClick: () => {
            setTrack(TrackDictionary[el] || '25');
          },
        }))}
      />

      {/* <InteractiveGraph swimmerResponse={{ dataPoints, regressionLine }} /> */}
    </div>
  );
}
