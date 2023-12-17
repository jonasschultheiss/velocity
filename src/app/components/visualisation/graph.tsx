'use client';

import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, GlyphSeries, Tooltip, XYChart } from '@visx/xychart';
import { IDataPoint } from '../../data/interfaces';

export default function Graph({
  dataPoints,
  regressionLine,
  height,
  tooltipEnabled,
  domainUpper,
  domainLower,
}: {
  dataPoints: IDataPoint[];
  regressionLine: IDataPoint[];
  height: number;
  tooltipEnabled: boolean;
  domainUpper: number;
  domainLower: number;
}) {
  const tickLabelOffset = 15;
  const accessors = {
    xAccessor: (d: IDataPoint) => d.x,
    yAccessor: (d: IDataPoint) => d.y,
  };
  const accessorsNullable = {
    xAccessor: (d: IDataPoint) => (d ? d.x : null),
    yAccessor: (d: IDataPoint) => (d ? d.y : null),
  };

  const distances: number[] = [0, 50, 100, 200, 400, 1500];

  return (
    <XYChart
      width={height * (16 / 9) > 900 ? height * (16 / 9) : 900}
      xScale={{ type: 'linear' }}
      yScale={{ type: 'linear', zero: false, domain: [domainLower, domainUpper] }}
    >
      <AnimatedGrid
        lineStyle={{
          stroke: '#696969',
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
        {...accessorsNullable}
      />
      <GlyphSeries
        colorAccessor={() => '#3b82f6'}
        enableEvents
        data={dataPoints}
        dataKey="dataPoint"
        {...accessorsNullable}
      />
      {tooltipEnabled && (
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: '#606060',
            strokeWidth: 5,
          }}
          renderTooltip={({ tooltipData, colorScale }) => {
            if (!tooltipData || tooltipData.nearestDatum?.key !== 'dataPoint') {
              return;
            }

            return (
              <div className="">
                <div style={{ color: colorScale ? colorScale('dataPoint') : '#ff6969' }}>
                  {tooltipData?.nearestDatum?.key}
                </div>
                {tooltipData.nearestDatum && accessors.xAccessor(tooltipData.nearestDatum.datum as IDataPoint)}
                {', '}
                {tooltipData.nearestDatum && accessors.yAccessor(tooltipData.nearestDatum.datum as IDataPoint)}
              </div>
            );
          }}
        />
      )}
    </XYChart>
  );
}
