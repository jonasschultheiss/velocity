'use client';
// used to be swimmer graph

import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Typography } from '@/components/typography';
import { ComboBox } from '@/components/combo-box';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  TechniqueDictionary,
  TrackDictionary,
  domainDefaults,
} from '@/lib/utils';
import type { DefinedSearchParams } from '../types/search-params.interface';
import { SwimmerGraph } from '@/components/visualisation/swimmer-graph';
import { useDataPoints } from '@/lib/use-data-points';
import { useRegressionLine } from '@/lib/use-regression-line';

export interface SwimmerStatisticsPageProperties {
  params: { name: string };
  searchParams: DefinedSearchParams;
}

export default function Page({
  searchParams,
  params: { name },
}: SwimmerStatisticsPageProperties): ReactElement {
  const swimmerResponse = {
    dataPoints: useDataPoints().dataPoints,
    regressionLine: useRegressionLine().regressionLine,
  };
  return <SwimmerGraph swimmerResponse={swimmerResponse} />;

  // const params = new URLSearchParams(searchParams);
  // const pathname = usePathname();
  // const { replace } = useRouter();
  // const [isOpen, setIsOpen] = useState(false);

  // function setTechnique(technique: keyof typeof TechniqueDictionary): void {
  //   params.set('technique', technique);
  //   replace(`${pathname}?${params.toString()}`);
  // }

  // function setTrack(track: keyof typeof TrackDictionary): void {
  //   params.set('track', track);
  //   replace(`${pathname}?${params.toString()}`);
  // }

  // return (
  //   <div className="flex flex-col gap-y-4">
  //     <Collapsible
  //       className="w-full space-y-2"
  //       onOpenChange={setIsOpen}
  //       open={isOpen}
  //     >
  //       <Card>
  //         <CardHeader>
  //           <CardTitle>Graph controls</CardTitle>
  //           <CardDescription>Change how you see data</CardDescription>
  //         </CardHeader>

  //         <CardFooter>
  //           <CollapsibleTrigger asChild>
  //             <Button className="" variant="ghost">
  //               {isOpen ? (
  //                 <>
  //                   <Typography component="span" variant="small">
  //                     Collapse
  //                   </Typography>
  //                   <ChevronUp className="w-4 h-4 ml-2" />
  //                 </>
  //               ) : (
  //                 <>
  //                   <Typography component="span" variant="small">
  //                     Expand
  //                   </Typography>
  //                   <ChevronDown className="w-4 h-4 ml-2" />
  //                 </>
  //               )}
  //               <span className="sr-only">Toggle</span>
  //             </Button>
  //           </CollapsibleTrigger>
  //         </CardFooter>
  //       </Card>
  //     </Collapsible>
  //   </div>
  // );
}
