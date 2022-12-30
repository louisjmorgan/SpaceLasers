/* eslint-disable quote-props */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/react';
import { addAfterEffect, addEffect } from '@react-three/fiber';
import { rgb } from 'd3';
import React, {
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import uPlot from 'uplot';
import UplotReact from 'uplot-react';
import shallow from 'zustand/shallow';
import { useFrameStore, useSimStore } from '../../Model/store';
import './Charts.css';
// const { linear, stepped, bars, linear, spline2 } = uPlot.paths;

// const colors = [
//   [[139, 0, 0, 1], [205, 92, 92, 1]],
//   [[0, 100, 0, 1], [85, 107, 47, 1]],
//   [[0, 0, 139, 1], [173, 216, 230, 1]],
//   [[48, 25, 52, 1], [147, 112, 219, 1]],
//   [[204, 85, 0, 1], [255, 191, 0, 1]],
//   [[31, 38, 42, 1], [128, 128, 128, 1]],
// ];

const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    unit: '%',
    label: '',
    getValue: (frame, satellite) => (satellite.performance.chargeState[frame] * 100).toFixed(2),
    shouldFixYScale: true,
    min: 0,
    max: 100,

  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
    unit: '%',
    label: 'w/o Space Power',
    getValue: (frame, satellite) => satellite.performance.chargeStateNoBeams[frame] * 100,
    shouldFixYScale: true,

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
    shouldFixYScale: false,

  },
  consumption: {
    name: 'Consumption',
    unit: 'W',
    label: '',
    getValue: (frame, satellite) => satellite.params.load.duties[
      satellite.performance.currentDuties[frame]
    ].consumption,
    shouldFixYScale: false,
  },
};

function Chart({
  series, window,
}) {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);
  const {
    time, setPaused, isPaused,
  } = useSimStore(
    (state) => ({
      satellites: state.mission.satellites.customers,
      setPaused: state.setPaused,
      isPaused: state.isPaused,
      // spacePowers: state.mission.satellites.spacePowers,
      time: state.mission.time,
    }),
    shallow,
  );

  console.log(series);
  const shouldFixYScale = useRef(true);
  const chart = useRef();
  const [options, setOptions] = useState({
    title: `${dataHelpers[series[0].param].name}`,
    width: 800,
    height: 400,
    class: 'satellite-chart',
    pxAlign: 0,
    ms: 1,
    hooks: {
      addSeries: [
        (u, seriesIdx) => {
          console.log(`addSeries${u.status === 0 ? ' (init)' : ''}`, seriesIdx);
        },
      ],
      delSeries: [
        (u, seriesIdx) => {
          console.log('delSeries', seriesIdx);
        },
      ],
      setSeries: [
        (u, seriesIdx) => {
          console.log('setSeries', seriesIdx);
        },
      ],
      init: [
        (u) => {
          [...u.root.querySelectorAll('.u-legend .u-series')].forEach((el, i) => {
            if (u.series[i]._hide) {
              el.style.display = 'none';
            }
          });
        },
      ],
    },
    scales: {
      'y': {
        range: (self, dataMin, dataMax) => (shouldFixYScale.current
          ? [0, 100] : (uPlot.rangeNum(dataMin, dataMax, 0.1, true))),
      },

    },
    series: [{ _hide: true, scale: 'x' }, ...series.map((s) => ({
      label: s.name,
      stroke: s.color,
      paths: uPlot.paths.linear(),
      scale: 'y',
      // value: (self, rawValue) => `${(rawValue * 100).toFixed(1)}%`,
    }))],
    axes: [{
      stroke: '#EDEDED',
      grid: {
        show: true,
        stroke: '#EDEDED',
        width: 0.1,
      },
    },
    {
      stroke: '#EDEDED',
      scale: 'y',
      grid: {
        show: true,
        stroke: '#EDEDED',
        width: 0.1,
      },
    },
    ],

  });

  const pauseUpdates = useRef(true);

  const updateData = () => {
    if (!chart.current) return;
    if (pauseUpdates.current || isPaused) return;
    const start = frame.current - window.current >= 0
      ? frame.current - window.current : 0;
    const newData = [
      time.slice(start, frame.current > window.current ? frame.current : window.current),
      ...series.map((s) => s.data.slice(start, frame.current)),
    ];
    chart.current.setData(newData);
  };

  useEffect(() => {
    if (!chart.current) return;
    pauseUpdates.current = true;
    // setPaused(true);

    console.log(chart.current);
    chart.current.batch(() => {
      const helpers = dataHelpers[series[0].param];
      console.log(helpers);
      series.forEach((s, i) => {
        const newSeries = {
          label: `${s.name}`,
          stroke: s.color,
          paths: uPlot.paths.linear(),
        };
        if (chart.current.series[i + 1]) {
          chart.current.setSeries(i + 1, newSeries);
          return;
        }
        chart.current.addSeries(newSeries, i + 1);
      });

      if (chart.current.series.length > series.length + 1) {
        chart.current.series.slice(series.length + 1).forEach(() => {
          chart.current.delSeries(series.length + 1);
          chart.current.setData(chart.current.data.filter((v, j) => j !== series.length + 1));
        });
      }
    });
    shouldFixYScale.current = series[0].shouldFixYScale;
    chart.current.redraw();
    // setPaused(false);
    pauseUpdates.current = false;
  }, [series]);

  const target = useRef();

  addEffect(() => {
    // if (prevFrame.current === frame.current) return;
    // if (!time) return;
    // if (!canvasRef.current) return;
    if (!chart.current) return;
    if (!target.current) return;
    if (isPaused || pauseUpdates.current) return;
    updateData();

    // chart.current.update();
    // prevFrame.current = frame.current;
  });

  const [isMounted, setMounted] = useState(false);
  const ref = useCallback((node) => {
    target.current = node;
    setMounted(true);
  }, []);

  return (
    <Box width="100%">
      <Flex justify="center">
        <div ref={ref} width="100%" />
        {isMounted
        && (
        <UplotReact
          key="space-chart"
          onCreate={(u) => { chart.current = u; }}
          data={[
            time.slice(0, frame.current),
            ...series.map((s) => s.data.slice(0, frame.current)),
          ]}
          target={target.current}
          options={options}
        />
        )}

      </Flex>
    </Box>
  );
}

export default Chart;
