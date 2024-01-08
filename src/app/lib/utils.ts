import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
