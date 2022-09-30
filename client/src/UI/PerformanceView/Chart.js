/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import React, {
  useCallback,
  useEffect, useRef,
} from 'react';
import * as fc from 'd3fc';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';
import { useFrameStore } from '../../Model/store';
import './Charts.css';

const colors = [
  [[139, 0, 0, 1], [205, 92, 92, 1]],
  [[0, 100, 0, 1], [85, 107, 47, 1]],
  [[0, 0, 139, 1], [173, 216, 230, 1]],
  [[48, 25, 52, 1], [147, 112, 219, 1]],
  [[204, 85, 0, 1], [255, 191, 0, 1]],
  [[31, 38, 42, 1], [128, 128, 128, 1]],
];

const webglColors = colors.map(
  (color) => color.map((col) => col.map((c, i) => (i < 3 ? c / 255 : 1))),
);

const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    unit: '%',
    label: '',
    getValue: (frame, satellite) => satellite.performance.chargeState[frame] * 100,
    shouldFixedYScale: true,
    min: 0,
    max: 100,

  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
    unit: '%',
    label: 'w/o Space Power',
    getValue: (frame, satellite) => satellite.performance.chargeStateNoBeams[frame] * 100,
    shouldFixedYScale: true,

    min: 0,
    max: 100,
  },
  netCurrent: {
    name: 'Net Current',
    unit: 'A',
    label: '',
    getValue: (frame, satellite) => satellite.params.load.powerProfiles[
      satellite.performance.sources[frame]
    ][
      satellite.performance.currentDuties[frame]
    ],
    shouldFixedYScale: false,

  },
  consumption: {
    name: 'Consumption',
    unit: 'W',
    label: '',
    getValue: (frame, satellite) => satellite.params.load.duties[
      satellite.performance.currentDuties[frame]
    ].consumption,
    shouldFixedYScale: false,
  },
};

const xExtent = fc.extentDate().accessors([(d) => d[0].x]);
const yExtent = fc
  .extentLinear()
  .accessors([(d) => d[0].y])
  .pad([0.25, 0.25]);

const getSeries = (index, context, colorMap) => fc
  .seriesWebglLine()
  .crossValue((d) => d[index].x)
  .mainValue((d) => d[index].y)
  .defined(() => 1)
  .equals((previousData) => previousData.length > 0)
  .lineWidth(3)
  .context(context)
  .decorate((c) => {
    const { i, j } = colorMap[index];
    fc.webglStrokeColor(webglColors[i][j])(c);
  });

const gridlines = fc.annotationSvgGridline();

function Chart({
  selected, shouldUpdate, time, zoom,
}) {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        if (state.frame - 2 > frame.current) { frame.current = state.frame; }
        if (frame.current > state.frame) { frame.current = state.frame; }

        // frame.current = state.frame;
      },
    );
  }, []);

  const context = useRef();

  const data = useRef([]);
  const chart = useRef();
  const chartRef = useRef();

  const drawChart = () => {
    d3.select(chartRef.current).datum(data.current).call(chart.current);
  };
  const colorMap = useRef();
  const newSeries = useRef();
  const updateData = () => time.current.map((t, f) => {
    newSeries.current = [];
    selected.current.satellites.forEach((satellite) => {
      selected.current.params.forEach((param) => {
        const helpers = dataHelpers[param];
        newSeries.current.push({
          x: t,
          y: helpers.getValue(f, satellite),
        });
      });
    });
    return newSeries.current;
  });

  const legendRef = useRef();
  const multi = useRef();
  const series = useRef();
  const legend = useRef();
  const ordinal = useRef();
  const labels = useRef();
  const helpers = useRef();
  const updateChart = () => {
    const { satellites, params } = selected.current;
    labels.current = satellites.map((satellite) => params.map((param) => `${satellite.name} ${dataHelpers[param].label}`)).flat();
    colorMap.current = satellites.map(
      (satellite, i) => params.map((param, j) => ({ i, j })),
    ).flat();
    ordinal.current = d3.scaleOrdinal()
      .domain(labels.current)
      .range(labels.current.map((label, index) => {
        const { i, j } = colorMap.current[index];
        return `rgb(${colors[i][j].slice(0, 3)})`;
      }));

    series.current = Array.from(
      { length: satellites.length * params.length },
      (v, i) => getSeries(i, context.current, colorMap.current),
    );

    if (!multi.current) multi.current = fc.seriesWebglMulti();
    multi.current
      .series(series.current)
      .context(context.current);

    legend.current = legendColor()
      .shape('path', d3.symbol().type(d3.symbolSquare).size(150)())
      .shapePadding(20)
      .labelWrap(100)
      .scale(ordinal.current);

    try {
      d3.select(legendRef.current).select('svg')
        .call(legend.current)
        .select('.legendCells')
        .attr('transform', 'translate(0,150)')
        .attr('align', 'center');
    } catch {}

    if (!chart.current) {
      chart.current = fc.chartCartesian(d3.scaleTime(), d3.scaleLinear())
        .xLabel('Time')
        .svgPlotArea(gridlines)
        .webglPlotArea(multi.current);
    }

    helpers.current = dataHelpers[params[0]];
    chart.current
      .yLabel(helpers.current.unit)
      .chartLabel(helpers.current.name);
    if (helpers.current.shouldFixedYScale) {
      chart.current.yDomain([helpers.current.min, helpers.current.max]);
    } else chart.current.yDomain(yExtent(data.current));
  };

  const nextData = useRef();
  const prevFrame = useRef();
  const window = useRef();
  addEffect(() => {
    if (prevFrame.current === frame.current) return;
    if (!time.current) return;
    if (!chart.current) {
      data.current = updateData();
      updateChart();
      drawChart();
      if (!context.current) {
        const canvas = d3.select(chartRef.current).select('d3fc-canvas canvas').node();
        context.current = canvas.getContext('webgl');
      }
    }
    if (shouldUpdate.current) {
      data.current = updateData();
      updateChart();
      shouldUpdate.current = false;
    }
    window.current = frame.current - ((frame.current - 500) * (zoom.current / 1000));

    nextData.current = data.current.slice(frame.current - window.current >= 0
      ? frame.current - window.current : 0, frame.current);
    // nextData.current = data.current.slice(0, frame.current);
    chart.current
      .xDomain(xExtent(nextData.current));

    drawChart();
    prevFrame.current = frame.current;
  });

  const ref = useCallback((node) => {
    chartRef.current = node;
  }, []);

  return (
    <Box maxHeight={500} width="100%">
      <Flex justify="center">
        <div
          style={{
            width: '80%',
            height: '500px',
            padding: '2.5rem',
          }}
          ref={ref}
          id="chart"
        />
        <d3fc-svg
          id="legend"
          ref={legendRef}
          style={{
            width: '20%',
            height: '500px',
          }}
        />
      </Flex>
    </Box>
  );
}

export default React.memo(Chart);
