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

export function getInitialSlots(): Slots {
  return {
    used: [
      {
        preamble: 'b-',
        colors: {
          dataPoints: '#eab308',
          regressionLine: '#22c55e',
        },
      },
      {
        preamble: 'a-',
        colors: {
          dataPoints: '#3b82f6',
          regressionLine: '#ef4444',
        },
      },
    ],
    free: [
      {
        preamble: 'h-',
        colors: {
          dataPoints: '#a855f7',
          regressionLine: '#22c55e',
        },
      },
      {
        preamble: 'g-',
        colors: {
          dataPoints: '#06b6d4',
          regressionLine: '#a855f7',
        },
      },

      {
        preamble: 'f-',
        colors: {
          dataPoints: '#eab308',
          regressionLine: '#ec4899',
        },
      },
      {
        preamble: 'e-',
        colors: {
          dataPoints: '#a855f7',
          regressionLine: '#06b6d4',
        },
      },
      {
        preamble: 'd-',
        colors: {
          dataPoints: '#ec4899',
          regressionLine: '#eab308',
        },
      },
      {
        preamble: 'c-',
        colors: {
          dataPoints: '#ef4444',
          regressionLine: '#3b82f6',
        },
      },
    ],
  };
}
