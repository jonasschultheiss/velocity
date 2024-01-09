import type { TechniqueDictionary, TrackDictionary } from '@/lib/utils';

export interface DefinedSearchParams extends Record<string, string> {
  track: keyof typeof TrackDictionary;
  technique: keyof typeof TechniqueDictionary;
}

export const DEFAULT_PARAMS = {
  track: '50',
  technique: 'F',
};
