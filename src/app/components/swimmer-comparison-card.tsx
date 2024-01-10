'use client';

import type { ReactElement } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Swimmer, SwimmerWithExtras } from 'src/db/schema';
import type { SwimmerPossibilities } from '@/lib/fetch-swimmer-options';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import { ComboBox } from './combo-box';
import { SwimmerGraphParameters } from './visualisation/swimmer-graph';

export interface SwimmerComparisonCardProperties {
  swimmers: SwimmerWithExtras[];
  selectedSwimmer?: Swimmer;
  possibleOptions?: SwimmerPossibilities;
  preamble: string;
}

export function SwimmerComparisonCard({
  swimmers,
  selectedSwimmer,
  possibleOptions,
  preamble = '',
}: SwimmerComparisonCardProperties): ReactElement {
  const params = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();
  const paramKey = `${preamble}swimmer`;

  function replaceParams(): void {
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function setSelectedSwimmer(urlIdentifier?: string): void {
    if (urlIdentifier) {
      params.set(paramKey, urlIdentifier);
    } else {
      params.delete(paramKey);
    }

    replaceParams();
  }

  return (
    <Card>
      {selectedSwimmer ? (
        <CardHeader className="flex flex-col gap-y-4">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="Image of the swimmer"
              className="object-cover object-top rounded-lg"
              fill
              src="/swimmers/cameron_mcevoy.jpeg"
            />
          </AspectRatio>
          <CardTitle>
            {selectedSwimmer.surname} {selectedSwimmer.lastname}
          </CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className={!selectedSwimmer ? 'pt-6' : undefined}>
        <ComboBox
          initialValue={
            selectedSwimmer
              ? `${selectedSwimmer.surname} ${selectedSwimmer.lastname}`
              : undefined
          }
          optionType="Swimmer"
          options={swimmers
            .map((swimmer) => ({
              label: swimmer.fullName,
              value: swimmer.urlIdentifier,
              onClick: () => {
                setSelectedSwimmer(swimmer.urlIdentifier);
              },
            }))
            .concat({
              label: 'Remove selection',
              value: 'remove',
              onClick: () => {
                setSelectedSwimmer();
              },
            })}
        />
      </CardContent>
      {selectedSwimmer && possibleOptions ? (
        <CardFooter>
          <SwimmerGraphParameters
            possibleOptions={possibleOptions}
            preamble={preamble}
          />
        </CardFooter>
      ) : null}
    </Card>
  );
}
