'use client';

import { ISwimmerResponse } from '@/lib/fetchSwimmerData';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComboBox } from '../combo-box';
import { AspectRatio } from '../ui/aspect-ratio';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Graph from './graph';
import { NoData } from './no-data';

export interface SwimmerGraphProperties {
  swimmerResponse: ISwimmerResponse;
  id: string;
}

export const TrackDictionary: Record<string, string> = {
  '25 m': '25',
  '50 m': '50',
};

export const TechniqueDictionary: Record<string, string> = {
  Butterfly: 'S',
  Backstroke: 'R',
  Breaststroke: 'B',
  Freestyle: 'F',
  'Individual Medley': 'L',
};

// searchParams: { track: keyof typeof TrackDictionary; technique: keyof typeof TechniqueDictionary };
export function SwimmerGraph({ id, swimmerResponse: { data, error } }: Readonly<SwimmerGraphProperties>) {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();

  function setTechnique(technique: keyof typeof TechniqueDictionary) {
    params.set('technique', technique);
    replace(`${pathname}?${params.toString()}`);
  }

  function setTrack(track: keyof typeof TrackDictionary) {
    params.set('track', track);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-y-2">
      <ComboBox
        options={Object.keys(TechniqueDictionary).map((el) => ({
          label: el,
          value: el,
          onClick: () => setTechnique(TechniqueDictionary[el] || 'F'),
        }))}
        optionType="technique"
        initialValue={Object.keys(TechniqueDictionary).find(
          (el) => TechniqueDictionary[el] === params.get('technique'),
        )}
      />
      <ComboBox
        options={Object.keys(TrackDictionary).map((el) => ({
          label: el,
          value: el,
          onClick: () => setTrack(TrackDictionary[el] || '25'),
        }))}
        optionType="track"
        initialValue={Object.keys(TrackDictionary).find((el) => TrackDictionary[el] === params.get('track'))}
      />

      <ScrollArea className="my-2 border rounded-md">
        <ScrollBar orientation="horizontal" />
        <AspectRatio ratio={16 / 9}>
          {error || (!params.get('technique') && !params.get('track')) ? (
            <NoData message={error} />
          ) : (
            <ParentSize className="h-full">
              {({ height }) => (
                <Graph height={height} dataPoints={data!.dataPoints} regressionLine={data!.regressionLine} />
              )}
            </ParentSize>
          )}
        </AspectRatio>
      </ScrollArea>
    </div>
  );
}
