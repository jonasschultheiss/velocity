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
import type { SwimmerGraphDetails } from '@/lib/use-dynamic-swimmers';
import { useDynamicSwimmers } from '@/lib/use-dynamic-swimmers';
import { Button } from '@/components/ui/button';

type SwimmerWithExtras = Swimmer & { fullName: string; urlIdentifier: string };

export interface DynamicComparisonProperties {
  allSwimmers: SwimmerWithExtras[];
}

export function DynamicComparison({
  allSwimmers,
}: DynamicComparisonProperties): ReactElement {
  const [slots, setSlots] = useState<Slots>(getInitialSlots());
  const searchParams = useSearchParams();
  const { comparedSwimmers, datasets } = useDynamicSwimmers(
    searchParams,
    slots.used,
  );

  let selectedCount = 0;
  for (const key of searchParams.keys()) {
    if (key.includes('swimmer')) {
      selectedCount++;
    }
  }

  console.log(comparedSwimmers.length);

  return (
    <>
      {comparedSwimmers.map(({ preamble, possibleOptions, swimmer }, index) => (
        <div key={index}>
          <SwimmerComparisonCard
            possibleOptions={possibleOptions}
            preamble={preamble}
            selectedSwimmer={swimmer}
            swimmers={allSwimmers}
          />
          {comparedSwimmers.length !== index + 1 ? (
            <Typography
              className="block my-8 text-center"
              component="p"
              variant="h1"
            >
              VS
            </Typography>
          ) : null}
        </div>
      ))}
      {selectedCount >= 2 && selectedCount <= 7 ? (
        <Button
          className="my-4"
          // onClick={(e) => {
          //   handleSwimmerAddition(e);
          // }}
          type="button"
        >
          <UserPlusIcon className="w-4 h-4 mr-2" /> Add another swimmer
        </Button>
      ) : null}
      <InteractiveGraph data={datasets} />
    </>
  );
}

// console.log(swimmerGraphDetails.length === selectedCount);
// console.log(swimmerGraphDetails.length);
// console.log(selectedCount);
