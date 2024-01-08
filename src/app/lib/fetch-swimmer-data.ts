import type { SearchParams } from '@/swimmers/[name]/types/search-params.interface';
import type { DataPoint } from './data-point.interface';

export interface SwimmerResponse {
  dataPoints: DataPoint[];
  regressionLine: DataPoint[];
}

interface FetchResponse {
  mes_values: DataPoint[];
  pred_values: DataPoint[];
}

export async function fetchSwimmerData(
  { technique, track }: SearchParams,
  surname: string,
  lastname: string,
): Promise<SwimmerResponse> {
  if (!technique || !track) {
    throw new Error('Invalid technique or track');
  }

  const response = await fetch(
    `https://www.horus-tech.com:9387/requestData?firstname=${surname}&lastname=${lastname}&track_length=${track}&technique=${technique}`,
    {
      next: { revalidate: 86400 },
    },
  );

  if (!response.ok || response.status !== 200) {
    throw new Error((await response.text()) && 'Error fetching data');
  }

  const { mes_values: dataPoints, pred_values: regressionLine } =
    (await response.json()) as FetchResponse;

  return { dataPoints, regressionLine };
}
