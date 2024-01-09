import type { DataPoint } from './data-point.interface';

export interface RegressionLine {
  dataPoints: DataPoint[];
}

export function getDataPoints(): RegressionLine {
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
