import type { DefinedSearchParams } from '@/swimmers/[urlIdentifier]/types/search-params.interface';
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
  { technique, track }: DefinedSearchParams,
  surname: string,
  lastname: string,
): Promise<SwimmerResponse | string> {
  let response: Response;
  try {
    response = await fetch(
      `https://www.horus-tech.com:9387/requestData?firstname=${surname}&lastname=${lastname}&track_length=${track}&technique=${technique}`,
      {
        next: { revalidate: 86400 },
      },
    );
  } catch (error) {
    return 'Error fetching data';
  }

  if (!response.ok || response.status !== 200) {
    return (await response.text()) && 'Error fetching data';
  }

  const { mes_values: dataPoints, pred_values: regressionLine } =
    (await response.json()) as FetchResponse;

  return { dataPoints, regressionLine };
}
