/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/react';
import { useFrameStore, useStore } from 'Model/store';
import { addEffect } from '@react-three/fiber';
import {
  useEffect, useRef,
} from 'react';
import shallow from 'zustand/shallow';
import * as fc from 'd3fc';
import * as d3 from 'd3';
import './Charts.css';

const colors = [
  [139, 0, 0, 1],
  [205, 92, 92, 1],
  [0, 100, 0, 1],
  [85, 107, 47, 1],
  [0, 0, 139, 1],
  [173, 216, 230, 1],
].map((color) => color.map((c, i) => (i < 3 ? c / 255 : 1)));

const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    unit: '%',
    format: (value) => (value * 100),
  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
    label: 'w/o Space Power',
    format: (value) => (value * 100),
  },
};

const xExtent = fc.extentDate().accessors([(d) => d[0].x]);
const yExtent = fc
  .extentLinear()
  .accessors([(d) => d[0].y])
  .pad([1, 0]);

const getSeries = (index) => fc
  .seriesWebglLine()
  .crossValue((d) => d[index].x)
  .mainValue((d) => d[index].y)
  .defined(() => true)
  .equals((previousData) => previousData.length > 0)
  .lineWidth(3)
  .decorate((context) => {
    fc.webglStrokeColor(colors[index])(context);
  });

const gridlines = fc.annotationSvgGridline();

function Chart({
  selectedSatellites, selectedParams,
}) {
  const { time } = useStore(
    (state) => ({
      time: state.mission.time,
    }),
    shallow,
  );

  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const data = useRef([]);

  const chart = useRef();
  const drawChart = (chartData, chartObj) => {
    d3.select('#chart').datum(chartData).call(chartObj);
  };

  const shouldUpdate = useRef(false);
  const selected = useRef({
    satellites: selectedSatellites,
    params: selectedParams,
  });
  useEffect(() => {
    if (!chart.current) return;
    shouldUpdate.current = true;
    selected.current = {
      satellites: selectedSatellites,
      params: selectedParams,
    };
  }, [selectedSatellites, selectedParams]);

  const updateData = () => time.map((t, f) => {
    const series = [];
    selected.current.satellites.forEach((satellite) => {
      selected.current.params.forEach((param) => {
        const helpers = dataHelpers[param];
        series.push({
          x: t,
          y: helpers.format(satellite.performance[param][f]),
        });
      });
    });
    return series;
  });

  const updateChart = () => {
    const series = Array.from(
      { length: selected.current.satellites.length * selected.current.params.length },
      (v, i) => getSeries(i),
    );
    const multi = fc.seriesWebglMulti().series(series);
    const newChart = fc
      .chartCartesian(d3.scaleTime(), d3.scaleLinear())
      .xLabel('Time')
      .yLabel(dataHelpers[selected.current.params[0]].unit)
      .chartLabel(dataHelpers[selected.current.params[0]].name)
      .webglPlotArea(multi)
      .svgPlotArea(gridlines)
      .yDomain(yExtent(data.current));

    return newChart;
  };

  useEffect(() => {
    if (chart.current) return;
    data.current = updateData();
    chart.current = updateChart();
  }, []);

  const nextData = useRef();
  addEffect(() => {
    if (!chart.current) return;
    if (shouldUpdate.current) {
      data.current = updateData();
      chart.current = updateChart();
      shouldUpdate.current = false;
    }
    nextData.current = data.current.slice(frame.current - 1500 > 0
      ? frame.current - 1500 : 0, frame.current);
    chart.current
      .xDomain(xExtent(nextData.current));

    drawChart(data.current, chart.current);
  });

  return (
    <Box maxHeight={500} width="80%">
      <Flex justify="center">
        <div
          style={{
            width: '100%',
            height: '500px',
            padding: '2.5rem',
          }}
          id="chart"
        />
      </Flex>
    </Box>
  );
}

export default Chart;
