// 'use client';

import { ReactElement } from 'react';

import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { fetchSwimmerData } from '@/lib/fetch-swimmer-data';
import { db } from 'src/db';
import { SwimmerTable } from 'src/db/schema';
import { SwimmerGraph } from '@/components/visualisation/swimmer-graph-wrapper';
import type { SearchParams } from '../types/search-params.interface';

export interface SwimmerPageProperties {
  params: { id: string };
  searchParams: SearchParams;
}

async function GG({
  params,
  searchParams,
}: Readonly<SwimmerPageProperties>): Promise<ReactElement> {
  return <SwimmerGraph id={params.id} swimmerResponse={swimmerResponse} />;
}

export default function Page(): ReactElement {
  return (
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
  );
}

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
