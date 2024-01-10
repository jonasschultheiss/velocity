import type { Dataset } from '@/components/visualisation/graph';
import type { DataPoint } from './data-point.interface';

export function makeDataset(
  name: string,
  color: string,
  data: DataPoint[],
): Dataset {
  return {
    name,
    color,
    data,
  };
}
