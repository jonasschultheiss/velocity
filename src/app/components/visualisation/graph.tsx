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

export interface Dataset {
  name: string;
  color: string;
  data: DataPoint[];
}

export interface SwimmerDataSet {
  regressionLine: Dataset;
  dataPoints: Dataset;
}

export interface GraphProperties {
  data: SwimmerDataSet[];
  height: number;
  tooltipEnabled: boolean;
  domainUpper: number;
  domainLower: number;
}

export function Graph({
  data,
  height,
  tooltipEnabled,
  domainUpper,
  domainLower,
}: GraphProperties): ReactElement {
  const tickLabelOffset = 15;
  const accessors = {
    xAccessor: (d: DataPoint) => d.x,
    yAccessor: (d: DataPoint) => d.y,
  };
  const accessorsNullable = {
    xAccessor: (d: DataPoint | null) => (d ? d.x : null),
    yAccessor: (d: DataPoint | null) => (d ? d.y : null),
  };

  const distances: number[] = [0, 50, 100, 200, 400, 1500, 2000];

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
      {data.map(({ regressionLine }) => (
        <AnimatedLineSeries
          data={regressionLine.data}
          dataKey={regressionLine.name}
          enableEvents={false}
          key={regressionLine.name}
          stroke={regressionLine.color}
          {...accessorsNullable}
        />
      ))}
      {data.map(({ dataPoints }) => (
        <GlyphSeries
          colorAccessor={() => dataPoints.color}
          data={dataPoints.data}
          dataKey={dataPoints.name}
          enableEvents
          key={dataPoints.name}
          {...accessorsNullable}
        />
      ))}
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
