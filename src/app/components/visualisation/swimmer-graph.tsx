'use client';

import { ISwimmerResponse } from '@/lib/fetchSwimmerData';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ComboBox } from '../combo-box';
import { Typography } from '../typography';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Label } from '../ui/label';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
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
  const [tooltipEnabled, enableTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function setTechnique(technique: keyof typeof TechniqueDictionary) {
    params.set('technique', technique);
    replace(`${pathname}?${params.toString()}`);
  }

  function setTrack(track: keyof typeof TrackDictionary) {
    params.set('track', track);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Graph controls</CardTitle>
            <CardDescription>Change how you see data</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
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
            <CollapsibleContent>
              <Separator className="my-4" />
              <div className="flex items-center pt-2 space-x-2">
                <Switch id="tooltip" checked={tooltipEnabled} onCheckedChange={() => enableTooltip(!tooltipEnabled)} />
                <Label htmlFor="tooltip">
                  Enable tooltip
                  <Badge className="relative z-10 ml-1 bottom-2" variant="destructive">
                    Buggy
                  </Badge>
                </Label>
              </div>
            </CollapsibleContent>
          </CardContent>
          <CardFooter>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="">
                {isOpen ? (
                  <>
                    <Typography variant="small" component="span">
                      Collapse
                    </Typography>
                    <ChevronUp className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <Typography variant="small" component="span">
                      Expand
                    </Typography>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </>
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </CardFooter>
        </Card>
      </Collapsible>

      <ScrollArea className="my-2 border rounded-md">
        <ScrollBar orientation="horizontal" />
        <AspectRatio ratio={16 / 9}>
          {error || (!params.get('technique') && !params.get('track')) ? (
            <NoData message={error} />
          ) : (
            <ParentSize className="h-full">
              {({ height }) => (
                <Graph
                  tooltipEnabled={tooltipEnabled}
                  height={height}
                  dataPoints={data!.dataPoints}
                  regressionLine={data!.regressionLine}
                />
              )}
            </ParentSize>
          )}
        </AspectRatio>
      </ScrollArea>
    </div>
  );
}
