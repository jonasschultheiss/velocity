'use client';

import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactElement } from 'react';
import { useState } from 'react';
import type { SwimmerResponse } from '@/lib/fetch-swimmer-data';
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
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Graph } from './graph';

export interface InteractiveGraphProperties {
  swimmerResponse: SwimmerResponse;
}

export function InteractiveGraph({
  swimmerResponse: { dataPoints, regressionLine },
}: Readonly<InteractiveGraphProperties>): ReactElement {
  const [tooltipEnabled, setTooltipEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [domainUpper, setDomainUpper] = useState([domainDefaults.upper]);
  const [domainLower, setDomainLower] = useState([domainDefaults.lower]);

  return (
    <Collapsible
      className="w-full space-y-2"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex flex-col space-y-2">
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
      </div>

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
      <Separator />
      <ScrollArea className="p-2 pt-0 ">
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
    </Collapsible>
  );
}