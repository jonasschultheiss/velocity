import type { TechniqueDictionary, TrackDictionary } from '@/lib/utils';

export interface DefinedSearchParams
  extends Record<string, string | undefined | null> {
  track?: keyof typeof TrackDictionary;
  technique?: keyof typeof TechniqueDictionary;
  absolute?: string | null;
}

export const DEFAULT_PARAMS = {
  track: '50',
  technique: 'F',
};
