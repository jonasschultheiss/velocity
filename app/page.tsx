'use client';

import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, GlyphSeries, Tooltip, XYChart } from '@visx/xychart';
import { IDataPoint } from './data/interfaces';
import { useDataPoints } from './data/useDataPoints';
import { useRegressionLine } from './data/useRegressionLine';

export default function Page() {
  const { regressionLine } = useRegressionLine();
  const { dataPoints } = useDataPoints();

  const tickLabelOffset = 15;

  const accessors = {
    xAccessor: (d: IDataPoint) => d.x,
    yAccessor: (d: IDataPoint) => d.y,
  };

  const distances: number[] = [0, 50, 100, 200, 400, 800, 1500, 5000];

  return (
    <div>
      <XYChart
        height={270}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', zero: false, domain: [1, 2.5] }}
      >
        <AnimatedGrid
          columns={true}
          numTicks={distances.length}
          lineStyle={{
            stroke: '#000000',
            strokeLinecap: 'round',
            strokeWidth: 1,
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          tickValues={distances}
          hideAxisLine
          rangePadding={{ start: 0, end: 3 }}
          orientation="bottom"
          tickLabelProps={(value, index) => ({ dy: tickLabelOffset })}
          numTicks={8}
        />
        <AnimatedAxis hideAxisLine orientation="left" numTicks={4} tickLabelProps={() => ({ dx: -10 })} />
        <AnimatedLineSeries stroke="#ef4444" dataKey="regressionLine" data={regressionLine} {...accessors} />
        <GlyphSeries colorAccessor={() => '#3b82f6'} data={dataPoints} dataKey="dataPoint" {...accessors} />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: '#008561',
            strokeWidth: 0,
          }}
          renderTooltip={({ tooltipData }) => {
            return (
              <div>
                {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                  const [key, value] = lineDataArray;
                  console.log('🚀 ~ file: page.tsx:63 ~ {Object.entries ~ value:', value);

                  return (
                    <div className="row" key={key}>
                      <div className="date">{accessors.xAccessor(value.datum as IDataPoint)}</div>
                      <div className="value">{accessors.yAccessor(value.datum as IDataPoint)}</div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
}
