/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-confusing-non-null-assertion */
'use client';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { domainDefaults, getDomainValue } from '@/lib/utils';
import { Typography } from '../typography';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Label } from '../ui/label';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { ColorPicker } from '../color-picker';
import type { SwimmerDataSet } from './graph';
import { Graph } from './graph';

export interface InteractiveGraphProperties {
  data: SwimmerDataSet[];
}

export interface KeyAndColor {
  key: string;
  colorCode: string;
}

export interface ColorPair {
  regressionLine: KeyAndColor;
  dataPoints: KeyAndColor;
}

export function InteractiveGraph({
  data,
}: Readonly<InteractiveGraphProperties>): ReactElement {
  const [tooltipEnabled, setTooltipEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [domainUpper, setDomainUpper] = useState([domainDefaults.upper]);
  const [domainLower, setDomainLower] = useState([domainDefaults.lower]);
  const [colors, setColors] = useState<ColorPair[]>([]);

  useEffect(() => {
    setColors(
      data.map((el) => {
        return {
          regressionLine: {
            key: el.regressionLine.name,
            colorCode: el.regressionLine.color,
          },
          dataPoints: {
            key: el.regressionLine.name,
            colorCode: el.regressionLine.color,
          },
        };
      }),
    );
  }, [data]);

  return (
    <Collapsible
      className="w-full space-y-2"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex flex-col space-y-2">
        <CollapsibleContent className="flex flex-col gap-y-2">
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
          {colors.map(({ regressionLine, dataPoints }, index) => (
            <div className="flex" key={index}>
              <ColorPicker
                colorCode={regressionLine.colorCode}
                dataKey={regressionLine.key}
                onValueChanged={(e) => {
                  const newArray = [...colors];
                  newArray[index]!.regressionLine.colorCode = e.target.value;
                  setColors(newArray);
                }}
              />
              {/* <ColorPicker
                colorCode={dataPoints.colorCode}
                key={dataPoints.key}
              /> */}
            </div>
          ))}
        </CollapsibleContent>
      </div>

      <CollapsibleTrigger asChild>
        <Button className="" variant="ghost">
          {isOpen ? (
            <>
              <Typography component="span" variant="small">
                Collapse graph controls
              </Typography>
              <ChevronUp className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              <Typography component="span" variant="small">
                Expand graph controls
              </Typography>
              <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
      <ScrollArea className="p-2 pt-0 ">
        <ScrollBar orientation="horizontal" />
        <AspectRatio ratio={16 / 9}>
          <ParentSize className="h-full">
            {({ height }) => (
              <Graph
                data={data}
                domainLower={getDomainValue('lower', domainLower) / 100}
                domainUpper={getDomainValue('upper', domainUpper) / 100}
                height={height}
                tooltipEnabled={tooltipEnabled}
              />
            )}
          </ParentSize>
        </AspectRatio>
      </ScrollArea>
    </Collapsible>
  );
}
