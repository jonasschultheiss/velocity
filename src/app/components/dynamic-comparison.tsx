/* eslint-disable @typescript-eslint/no-non-null-assertion -- ts doenst get type safety in this case*/
'use client';

/* eslint-disable react/no-array-index-key -- scusa*/
import { useState, type ReactElement } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { Typography } from '@/components/typography';
import { InteractiveGraph } from '@/components/visualisation/interactive-graph';
import { SwimmerComparisonCard } from '@/components/swimmer-comparison-card';
import type { Swimmer } from 'src/db/schema';
import type { Slots } from '@/lib/utils';
import { getInitialSlots } from '@/lib/utils';
import { useDynamicSwimmers } from '@/lib/use-dynamic-swimmers';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

type SwimmerWithExtras = Swimmer & { fullName: string; urlIdentifier: string };

export interface DynamicComparisonProperties {
  allSwimmers: SwimmerWithExtras[];
}

export function DynamicComparison({
  allSwimmers,
}: DynamicComparisonProperties): ReactElement {
  const searchParams = useSearchParams();

  let initialAmountOfSlots = 0;
  for (const key of searchParams.keys()) {
    if (key.includes('swimmer')) {
      initialAmountOfSlots++;
    }
  }

  const [slots, setSlots] = useState<Slots>(
    getInitialSlots(initialAmountOfSlots),
  );

  const { comparedSwimmers, datasets } = useDynamicSwimmers(
    searchParams,
    slots.used,
  );

  function canBeAdded(): boolean {
    return slots.used.length >= 2 && slots.used.length <= 7;
  }

  function addSlot(): void {
    if (canBeAdded()) {
      setSlots(({ used, free }) => {
        const freeInterim = [...free];
        const usedInterim = [...used];
        usedInterim.push(freeInterim.pop()!);
        return {
          free: [...freeInterim],
          used: [...usedInterim],
        };
      });
    }
  }

  return (
    <>
      <ScrollArea className="display:hidden">
        <ScrollBar orientation="horizontal" />
        <div className="min-w-full w-max md:flex display:hidden">
          {comparedSwimmers.map(
            ({ preamble, possibleOptions, swimmer }, index) => (
              <div
                className="flex flex-col items-center md:flex-row gap-y-8 md:gap-y-0 md:gap-x-8"
                key={index}
              >
                <SwimmerComparisonCard
                  key={`${index}-card`}
                  possibleOptions={possibleOptions}
                  preamble={preamble}
                  selectedSwimmer={swimmer}
                  swimmers={allSwimmers}
                />
                {comparedSwimmers.length !== index + 1 ? (
                  <Typography
                    className="block mb-8 text-center md:mb-0 md:mr-8"
                    component="p"
                    key={`${index}-vs`}
                    variant="h1"
                  >
                    VS
                  </Typography>
                ) : null}
              </div>
            ),
          )}
        </div>
      </ScrollArea>

      <Button
        className="my-4 md:my-8"
        disabled={!canBeAdded()}
        onClick={() => {
          addSlot();
        }}
        type="button"
      >
        <UserPlusIcon className="w-4 h-4 mr-2" /> Add another swimmer
      </Button>
      <InteractiveGraph data={datasets} />
    </>
  );
}
