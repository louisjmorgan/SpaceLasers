/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable quote-props */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import {
  Box, Center, Flex, VStack,
} from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import {
  useCallback,
  useEffect, useRef, useState,
} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
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
  series, chartWindow, pauseUpdates, showLegend = true,
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
    time,
  } = useSimStore(
    (state) => ({
      satellites: state.mission.satellites.customers,
      // spacePowers: state.mission.satellites.spacePowers,
      time: state.mission.time,
    }),
    shallow,
  );

  // initialize chart

  const chart = useRef();
  const [options, setOptions] = useState({
    width: 800,
    height: 400,
    class: 'satellite-chart',
    pxAlign: 0,
    ms: 1,
    hooks: {
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
      // size: 50,
      grid: {
        show: true,
        stroke: '#EDEDED',
        width: 0.1,
      },
    },
    ],

  });

  const [data, setData] = useState([
    time.slice(0, frame.current),
    ...series.map((s) => s.data.slice(0, frame.current)),
  ]);

  // DOM handling

  const target = useRef();
  const parentRef = useRef();
  const [isMounted, setMounted] = useState(false);

  const handleResize = () => {
    if (!parentRef.current) return;
    if (!chart.current) return;
    const width = parentRef.current.clientWidth;
    setOptions((prev) => ({
      ...prev,
      width: width > 1400 ? 1000 : width * (showLegend ? 0.8 : 1),
    }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ref = useCallback((node) => {
    target.current = node;
    setMounted(true);
  }, []);

  useEffect(() => { handleResize(); }, [isMounted]);

  const handleLegend = () => {
    const legend = chart.current.root.querySelector('.u-legend');
    if (showLegend) {
      legend.style.display = 'table';
    } else {
      legend.style.display = 'none';
    }
  };
  useEffect(() => {
    if (!chart.current) return;
    handleLegend();
    handleResize();
    chart.current.redraw();
  }, [showLegend]);

  // updating data (realtime)

  const updateData = () => {
    const start = frame.current - chartWindow.current >= 0
      ? frame.current - chartWindow.current : 0;
    return [
      time.slice(start, frame.current > chartWindow.current ? frame.current : chartWindow.current),
      ...series.map((s) => s.data.slice(start, frame.current)),
    ];
  };

  addEffect(() => {
    if (!chart.current) return;
    if (pauseUpdates.current) return;
    chart.current.setData(updateData());
  });

  // updating series (on user selection)

  useEffect(() => {
    if (!chart.current) return;
    pauseUpdates.current = true;
    let title;
    let scale;
    if (series.length) {
      scale = { min: 0, max: 100 };
      if (!series[0].shouldFixYScale) {
        const min = Math.min(...series.map((s) => s.scale.min));
        const max = Math.max(...series.map((s) => s.scale.max));
        scale.min = min > 0 ? min * 0.9 : min * 1.1;
        scale.max = max > 0 ? max * 1.1 : max * 0.9;
      }
      title = `${dataHelpers[series[0].param].name}`;
    }

    setOptions((prev) => ({
      ...prev,
      title: title || prev.title,
      series: [{ _hide: true, scale: 'x' }, ...series.map((s) => ({
        label: s.name,
        stroke: s.color,
        paths: uPlot.paths.linear(),
        scale: 'y',
        // value: (self, rawValue) => `${(rawValue * 100).toFixed(1)}%`,
      }))],
      scales: scale ? {
        'y': {
          range: () => ([scale.min, scale.max]),
        },
      } : prev.scales,
    }));
  }, [series]);

  useEffect(() => {
    if (!chart.current) return;
    pauseUpdates.current = true;
    handleLegend();
    // setData(updateData());
    chart.current.setData(updateData());
    pauseUpdates.current = false;
  }, [options]);

  return (
    <Flex justify="center" width="100%" ref={parentRef}>
      <div ref={ref} width="100%" />
      {isMounted
        && (
        <UplotReact
          key="space-chart"
          onCreate={(u) => { chart.current = u; }}
          data={data}
          target={target.current}
          options={options}
        />
        )}
    </Flex>
  );
}

export default Chart;
