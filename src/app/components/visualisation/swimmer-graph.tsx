/* eslint-disable @typescript-eslint/no-non-null-assertion -- Timely reasons TODO: remove*/
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { TechniqueDictionary, TrackDictionary } from '@/lib/utils';
import type { SwimmerPossibilities } from '@/lib/fetch-swimmer-options';
import { ComboBox } from '../combo-box';
import { Typography } from '../typography';

export interface SwimmerGraphParametersProperties {
  possibleOptions: SwimmerPossibilities;
  preamble?: string;
}

export function SwimmerGraphParameters({
  possibleOptions,
  preamble = '',
}: SwimmerGraphParametersProperties): ReactElement {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();
  const parameters = {
    technique: `${preamble}technique`,
    track: `${preamble}track`,
  };

  function replaceParams(): void {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setTechnique(technique?: keyof typeof TechniqueDictionary): void {
    if (technique) {
      params.set(parameters.technique, technique);
    } else {
      params.delete(parameters.technique);
    }

    replaceParams();
  }

  function setTrack(track?: keyof typeof TrackDictionary): void {
    if (track) {
      params.set(parameters.track, track);
    } else {
      params.delete(parameters.track);
    }

    replaceParams();
  }

  function shouldBeDisabled(type: 'technique' | 'track', el: string): boolean {
    const technique = params.get(parameters.technique);
    const track = params.get(parameters.track);
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
          (el) => TechniqueDictionary[el] === params.get(parameters.technique),
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
          (el) => TrackDictionary[el] === params.get(parameters.track),
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
    </div>
  );
}
