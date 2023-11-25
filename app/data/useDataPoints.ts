import { IDataPoint } from './interfaces';

export interface IRegressionLine {
  dataPoints: IDataPoint[];
}

export function useDataPoints(): IRegressionLine {
  return {
    dataPoints: [
      {
        x: 100,
        y: 1.6126431220770845,
      },
      {
        x: 200,
        y: 1.4951035359198623,
      },
    ],
  };
}
