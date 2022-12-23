/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import { rgb } from 'd3';
import React, {
  useCallback,
  useEffect, useRef,
} from 'react';
import TimeChart from 'timechart';
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

function Chart({
  selected, shouldUpdate, time, zoom,
}) {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        if (state.frame - 100 > frame.current) { frame.current = state.frame; }
        if (frame.current > state.frame) { frame.current = state.frame; }

        // frame.current = state.frame;
      },
    );
  }, []);

  const data = useRef(
    Array.from(
      { length: selected.current.satellites.length * selected.current.params.length },
      () => [],
    ),
  );

  const initializeSeries = () => {
    const series = [];
    let index = 0;
    selected.current.satellites.forEach((satellite, i) => {
      selected.current.params.forEach((param, j) => {
        const helpers = dataHelpers[param];
        series.push({
          name: `${satellite.name}-${helpers.name}`,
          color: rgb(255, 0, 255),
          visible: true,
          data: data.current[index],
        });
        index += 1;
      });
    });
    return series;
  };
  const prevFrame = useRef(0);

  const updateData = () => {
    let index = 0;

    selected.current.satellites.forEach((satellite) => {
      selected.current.params.forEach((param) => {
        const helpers = dataHelpers[param];
        data.current[index].push(
          ...time.slice(prevFrame.current, frame.current).map((t, f) => ({
            x: t,
            y: helpers.getValue(f, satellite),
          })),
        );
        index += 1;
      });
    });
  };

  const canvasRef = useRef();
  const chart = useRef();
  useEffect(() => {
    updateData();
    chart.current = new TimeChart(canvasRef.current, {
      series: initializeSeries(),
      // realTime: true,
      // xRange: { min: 0, max: 10 * 1000 },
      // zoom: {
      //   x: { autoRange: true },
      //   y: { autoRange: true },
      // },
      // tooltip: true,
      legend: false,
      // debugWebGL: true,
    });
    // return () => chart.current.dispose();
  }, []);

  addEffect(() => {
    if (prevFrame.current === frame.current) return;
    if (!time) return;
    if (!canvasRef.current) return;
    if (!chart.current) return;
    updateData();
    chart.current.update();
    prevFrame.current = frame.current;
  });
  // addEffect(() => {
  //   if (prevFrame.current === frame.current) return;
  //   if (!time.current) return;
  //   if (!chart.current) {
  //     data.current = updateData();
  //     updateChart();
  //     drawChart();
  //   }
  //   if (shouldUpdate.current) {
  //     data.current = updateData();
  //     updateChart();
  //     shouldUpdate.current = false;
  //   }
  //   window.current = frame.current - ((frame.current - 500) * (zoom.current / 1000));
  //   nextData.current = data.current.slice(frame.current - window.current >= 0
  //     ? frame.current - window.current : 0, frame.current);
  //   // nextData.current = data.current.slice(0, frame.current);

  //   drawChart();
  //   prevFrame.current = frame.current;
  // });

  // const ref = useCallback((node) => {
  //   canvasRef.current = node;
  // }, []);

  return (
    <Box maxHeight={500} width="100%" zIndex>
      <Flex justify="center">
        <div
          style={{
            width: '80%',
            height: '500px',
            padding: '2.5rem',
          }}
          ref={canvasRef}
          // id="chart"
        />
      </Flex>
    </Box>
  );
}

export default React.memo(Chart);
