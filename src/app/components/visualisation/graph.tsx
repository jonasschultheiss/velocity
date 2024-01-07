'use client';

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  GlyphSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import type { ReactElement } from 'react';
import type { DataPoint } from '../../lib/data-point.interface';

export function Graph({
  dataPoints,
  regressionLine,
  height,
  tooltipEnabled,
  domainUpper,
  domainLower,
}: {
  dataPoints: DataPoint[];
  regressionLine: DataPoint[];
  height: number;
  tooltipEnabled: boolean;
  domainUpper: number;
  domainLower: number;
}): ReactElement {
  const tickLabelOffset = 15;
  const accessors = {
    xAccessor: (d: DataPoint) => d.x,
    yAccessor: (d: DataPoint) => d.y,
  };
  const accessorsNullable = {
    xAccessor: (d: DataPoint | null) => (d ? d.x : null),
    yAccessor: (d: DataPoint | null) => (d ? d.y : null),
  };

  const distances: number[] = [0, 50, 100, 200, 400, 1500];

  return (
    <XYChart
      width={height * (16 / 9) > 900 ? height * (16 / 9) : 900}
      xScale={{ type: 'linear' }}
      yScale={{
        type: 'linear',
        zero: false,
        domain: [domainLower, domainUpper],
      }}
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
        hideAxisLine
        orientation="bottom"
        tickLabelProps={() => ({ dy: tickLabelOffset })}
        tickValues={distances}
      />
      <AnimatedAxis
        hideAxisLine
        numTicks={4}
        orientation="left"
        tickLabelProps={() => ({ dx: -10 })}
      />
      <AnimatedLineSeries
        data={regressionLine}
        dataKey="regressionLine"
        enableEvents={false}
        stroke="#ef4444"
        {...accessorsNullable}
      />
      <GlyphSeries
        colorAccessor={() => '#3b82f6'}
        data={dataPoints}
        dataKey="dataPoint"
        enableEvents
        {...accessorsNullable}
      />
      {tooltipEnabled ? (
        <Tooltip
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
                <div
                  style={{
                    color: colorScale ? colorScale('dataPoint') : '#ff6969',
                  }}
                >
                  {tooltipData.nearestDatum.key}
                </div>
                {accessors.xAccessor(
                  tooltipData.nearestDatum.datum as DataPoint,
                )}
                {', '}
                {accessors.yAccessor(
                  tooltipData.nearestDatum.datum as DataPoint,
                )}
              </div>
            );
          }}
          showSeriesGlyphs
          snapTooltipToDatumX
          snapTooltipToDatumY
        />
      ) : null}
    </XYChart>
  );
}
