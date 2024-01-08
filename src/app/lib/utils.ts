import { type ClassValue, clsx } from 'clsx';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import type { SwimmerName } from 'src/db/schema';
import { SwimmerResponse, fetchSwimmerData } from './fetch-swimmer-data';

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

export const domainDefaults = {
  upper: 250,
  lower: 140,
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

export async function useSwimmerValues({
  surname,
  lastname,
}: SwimmerName): Promise<Map<string, string | SwimmerResponse>> {
  const promisedValueMap = new Map<string, Promise<SwimmerResponse | string>>();
  const valueMap = new Map<string, SwimmerResponse | string>();
  Object.values(TechniqueDictionary).forEach((technique) => {
    Object.values(TrackDictionary).forEach((track) => {
      promisedValueMap.set(
        `${technique}-${track}`,
        fetchSwimmerData({ technique, track }, surname, lastname),
      );
    });
  });

  const awaitedValues = await Promise.all(promisedValueMap.values());
  promisedValueMap.forEach((_value, key) => {
    valueMap.set(key, awaitedValues.shift() ?? 'Failed to fetch');
  });

  return valueMap;
}
