import { type ClassValue, clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import type { SwimmerName } from 'src/db/schema';
import type { SwimmerGraphDetails } from './use-dynamic-swimmers';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const NAME_SPLIT: string = '_' as const;

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

export interface Slots {
  used: SwimmerGraphDetails[];
  free: SwimmerGraphDetails[];
}

export const domainDefaults = {
  upper: 160,
  lower: 80,
};

export function getDomainValue(
  part: keyof typeof domainDefaults,
  value: number[],
): number {
  return value[0] ? value[0] : domainDefaults[part];
}

export function urlIdentifierToName(param: string): SwimmerName {
  const [surname, lastname] = param.split(NAME_SPLIT);
  if (!surname || !lastname) {
    notFound();
  }

  return { surname, lastname };
}

export function nameToUrlIdentifier({
  surname,
  lastname,
}: SwimmerName): string {
  return `${surname.toLowerCase()}${NAME_SPLIT}${lastname.toLowerCase()}`;
}

export const preambleList = ['a-', 'b-', 'c-', 'd-', 'e-', 'f-', 'g-', 'h-'];

export function getInitialSlots(sizeOfUsed = 2): Slots {
  const all = [
    {
      preamble: 'h-',
      colors: {
        dataPoints: '#ec4899',
        regressionLine: '#ec4899',
      },
    },
    {
      preamble: 'g-',
      colors: {
        dataPoints: '#06b6d4',
        regressionLine: '#06b6d4',
      },
    },

    {
      preamble: 'f-',
      colors: {
        dataPoints: '#14b8a6',
        regressionLine: '#14b8a6',
      },
    },
    {
      preamble: 'e-',
      colors: {
        dataPoints: '#a855f7',
        regressionLine: '#a855f7',
      },
    },
    {
      preamble: 'd-',
      colors: {
        dataPoints: '#eab308',
        regressionLine: '#eab308',
      },
    },
    {
      preamble: 'c-',
      colors: {
        dataPoints: '#22c55e',
        regressionLine: '#22c55e',
      },
    },
    {
      preamble: 'b-',
      colors: {
        dataPoints: '#ef4444',
        regressionLine: '#ef4444',
      },
    },
    {
      preamble: 'a-',
      colors: {
        dataPoints: '#3b82f6',
        regressionLine: '#3b82f6',
      },
    },
  ];

  const returnValue = {
    used: [...all.splice(-Math.abs(sizeOfUsed < 2 ? 2 : sizeOfUsed)).reverse()],
    free: [...all],
  };

  return returnValue;
}
