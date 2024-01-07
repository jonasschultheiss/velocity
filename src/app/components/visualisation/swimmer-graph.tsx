'use client';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { useState } from 'react';
import type { SwimmerResponse } from '@/lib/fetch-swimmer-data';
import { ComboBox } from '../combo-box';
import { Typography } from '../typography';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Label } from '../ui/label';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Graph } from './graph';

export interface SwimmerGraphProperties {
  swimmerResponse: SwimmerResponse;
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

const domainDefaults = {
  upper: 250,
  lower: 140,
};

function getDomainValue(
  part: keyof typeof domainDefaults,
  value: number[],
): number {
  return value[0] ? value[0] : domainDefaults[part];
}

export function SwimmerGraph({
  swimmerResponse: { dataPoints, regressionLine },
}: Readonly<SwimmerGraphProperties>): ReactElement {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();
  const [tooltipEnabled, setTooltipEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [domainUpper, setDomainUpper] = useState([domainDefaults.upper]);
  const [domainLower, setDomainLower] = useState([domainDefaults.lower]);

  function setTechnique(technique: keyof typeof TechniqueDictionary): void {
    params.set('technique', technique);
    replace(`${pathname}?${params.toString()}`);
  }

  function setTrack(track: keyof typeof TrackDictionary): void {
    params.set('track', track);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Collapsible
        className="w-full space-y-2"
        onOpenChange={setIsOpen}
        open={isOpen}
      >
        <Card>
          <CardHeader>
            <CardTitle>Graph controls</CardTitle>
            <CardDescription>Change how you see data</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
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
            <CollapsibleContent className="flex flex-col gap-y-2">
              <Separator className="my-4" />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={tooltipEnabled}
                  id="tooltip"
                  onCheckedChange={() => {
                    setTooltipEnabled(!tooltipEnabled);
                  }}
                />
                <Label htmlFor="tooltip">
                  Enable tooltip
                  <Badge
                    className="relative z-10 ml-1 bottom-2"
                    variant="destructive"
                  >
                    Buggy
                  </Badge>
                </Label>
              </div>
              <div className="flex items-center py-2 space-x-2">
                <Label htmlFor="slider-domain-upper">Domain upper bound</Label>
                <Slider
                  id="slider-domain-upper"
                  max={300}
                  min={0}
                  onValueChange={(k) => {
                    setDomainUpper(k);
                  }}
                  step={10}
                  value={domainUpper}
                />
              </div>
              <div className="flex items-center py-2 space-x-2">
                <Label htmlFor="slider-domain-lower">Domain lower bound</Label>
                <Slider
                  id="slider-domain-lower"
                  max={300}
                  min={0}
                  onValueChange={(k) => {
                    setDomainLower(k);
                  }}
                  step={10}
                  value={domainLower}
                />
              </div>
            </CollapsibleContent>
          </CardContent>
          <CardFooter>
            <CollapsibleTrigger asChild>
              <Button className="" variant="ghost">
                {isOpen ? (
                  <>
                    <Typography component="span" variant="small">
                      Collapse
                    </Typography>
                    <ChevronUp className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <Typography component="span" variant="small">
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
          <ParentSize className="h-full">
            {({ height }) => (
              <Graph
                dataPoints={dataPoints}
                domainLower={getDomainValue('lower', domainLower)}
                domainUpper={getDomainValue('upper', domainUpper)}
                height={height}
                regressionLine={regressionLine}
                tooltipEnabled={tooltipEnabled}
              />
            )}
          </ParentSize>
        </AspectRatio>
      </ScrollArea>
    </div>
  );
}
