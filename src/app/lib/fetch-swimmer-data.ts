import type { DefinedSearchParams } from '@/swimmers/[urlIdentifier]/types/search-params.interface';
import type { DataPoint } from './data-point.interface';
import { getDataPoints, useDataPoints } from './use-data-points';
import { getRegressionLine, useRegressionLine } from './use-regression-line';

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
  if (Math.random()) {
    return {
      ...getDataPoints(),
      ...getRegressionLine(),
    };
  }

  return 'Error fetching data';

  // const response = await fetch(
  //   `http://www.horus-tech.com:9387/requestData?firstname=${surname}&lastname=${lastname}&track_length=${track}&technique=${technique}`,
  //   {
  //     next: { revalidate: 86400 },
  //   },
  // );

  // if (!response.ok || response.status !== 200) {
  //   return (await response.text()) && 'Error fetching data';
  // }

  // const { mes_values: dataPoints, pred_values: regressionLine } =
  //   (await response.json()) as FetchResponse;

  // return { dataPoints, regressionLine };
}
