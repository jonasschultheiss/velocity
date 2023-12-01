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
    xAccessor: (d: IDataPoint) => (d ? d.x : null),
    yAccessor: (d: IDataPoint) => (d ? d.y : null),
  };

  const distances: number[] = [0, 50, 100, 200, 400, 800, 1500, 5000];

  return (
    <div>
      <XYChart
        height={300}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', zero: false, domain: [1.2, 2.5] }}
      >
        <AnimatedGrid
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
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
        />
        <AnimatedAxis hideAxisLine orientation="left" numTicks={4} tickLabelProps={() => ({ dx: -10 })} />
        <AnimatedLineSeries
          enableEvents={false}
          stroke="#ef4444"
          dataKey="regressionLine"
          data={regressionLine}
          {...accessors}
        />
        <GlyphSeries colorAccessor={() => '#3b82f6'} data={dataPoints} dataKey="dataPoint" {...accessors} />
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: '#111111',
            strokeWidth: 0,
          }}
          renderTooltip={({ tooltipData, colorScale }) => {
            return (
              <div className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                <div style={{ color: colorScale ? colorScale('dataPoint') : '#ff6969' }}>
                  {tooltipData?.datumByKey['dataPoint'].key}
                </div>
                {accessors.xAccessor(tooltipData?.datumByKey['dataPoint'].datum as IDataPoint)}
                {', '}
                {accessors.yAccessor(tooltipData?.datumByKey['dataPoint'].datum as IDataPoint)}
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
}
