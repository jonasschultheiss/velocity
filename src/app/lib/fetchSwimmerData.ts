import { IDataPoint } from '@/data/interfaces';
import { DEFAULT_PARAMS, ISearchParams } from '@/swimmers/[id]/types/search-params.interface';

export interface ISwimmerResponse {
  data: { dataPoints: IDataPoint[]; regressionLine: IDataPoint[] } | null;
  error: null | string;
}
export async function fetchSwimmerData(
  { technique, track }: ISearchParams,
  surname: string,
  lastname: string,
): Promise<ISwimmerResponse> {
  if (!technique || !track) {
    return { data: null, error: 'Invalid search params' };
  }

  const response = await fetch(
    `https://www.horus-tech.com:9387/requestData?firstname=${surname}&lastname=${lastname}&track_length=${
      track || DEFAULT_PARAMS.track
    }&technique=${technique || DEFAULT_PARAMS.technique}`,
    {
      next: { revalidate: 86400 },
    },
  );

  if (response.status !== 200) {
    return { data: null, error: await response.text() };
  }

  const { mes_values: dataPoints, pred_values: regressionLine } = await response.json();
  return { data: { dataPoints, regressionLine }, error: null };
}
