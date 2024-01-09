/* eslint-disable @typescript-eslint/no-non-null-assertion -- Timely reasons TODO: remove*/
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { TechniqueDictionary, TrackDictionary } from '@/lib/utils';
import type { SwimmerPossibilities } from '@/lib/fetch-swimmer-options';
import type { SwimmerResponse } from '@/lib/fetch-swimmer-data';
import { ComboBox } from '../combo-box';
import { Typography } from '../typography';
import { InteractiveGraph } from './interactive-graph';

export interface SwimmerGraphProperties {
  possibleOptions: SwimmerPossibilities;
  data: SwimmerResponse | null;
}

export function SwimmerGraph({
  possibleOptions,
  data,
}: SwimmerGraphProperties): ReactElement {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();

  function replaceParams(): void {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setTechnique(technique?: keyof typeof TechniqueDictionary): void {
    if (technique) {
      params.set('technique', technique);
    } else {
      params.delete('technique');
    }

    replaceParams();
  }

  function setTrack(track?: keyof typeof TrackDictionary): void {
    if (track) {
      params.set('track', track);
    } else {
      params.delete('track');
    }

    replaceParams();
  }

  function shouldBeDisabled(type: 'technique' | 'track', el: string): boolean {
    const technique = params.get('technique');
    const track = params.get('track');
    if (
      !technique ||
      !track ||
      (type === 'technique' && technique) ||
      (type === 'track' && track)
    ) {
      let found = false;
      for (const [key, value] of Object.entries(possibleOptions)) {
        if (!key.includes(el)) {
          continue;
        }

        if (value) {
          found = true;
          break;
        }
      }

      if ((type === 'technique' && track) || (type === 'track' && technique)) {
        return !possibleOptions[
          type === 'technique'
            ? (`${el}-${track}` as keyof SwimmerPossibilities)
            : (`${technique}-${el}` as keyof SwimmerPossibilities)
        ];
      }

      return !found;
    }

    return true;
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
        options={Object.keys(TechniqueDictionary)
          .map((el) => ({
            label: el,
            value: el,
            disabled: shouldBeDisabled('technique', TechniqueDictionary[el]!),
            onClick: () => {
              setTechnique(TechniqueDictionary[el] || 'F');
            },
          }))
          .concat({
            label: 'Remove selection',
            value: 'remove',
            disabled: false,
            onClick: () => {
              setTechnique();
            },
          })}
      />
      <ComboBox
        initialValue={Object.keys(TrackDictionary).find(
          (el) => TrackDictionary[el] === params.get('track'),
        )}
        optionType="track"
        options={Object.keys(TrackDictionary)
          .map((el) => ({
            label: el,
            value: el,
            disabled: shouldBeDisabled('track', TrackDictionary[el]!),
            onClick: () => {
              setTrack(TrackDictionary[el] || '25');
            },
          }))
          .concat({
            label: 'Remove selection',
            value: 'remove',
            disabled: false,
            onClick: () => {
              setTrack();
            },
          })}
      />

      <InteractiveGraph data={data} />
    </div>
  );
}
