import type {
  TechniqueDictionary,
  TrackDictionary,
} from '@/components/visualisation/swimmer-graph';

export interface SearchParams {
  track: keyof typeof TrackDictionary;
  technique: keyof typeof TechniqueDictionary;
}

export const DEFAULT_PARAMS = {
  track: '50',
  technique: 'F',
};
