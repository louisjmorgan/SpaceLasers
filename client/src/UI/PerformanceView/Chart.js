/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { Box, Flex } from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import { rgb } from 'd3';
import React, {
  useCallback,
  useEffect, useRef,
} from 'react';
import UplotReact from 'uplot-react';
import { useFrameStore } from '../../Model/store';
import './Charts.css';

// const colors = [
//   [[139, 0, 0, 1], [205, 92, 92, 1]],
//   [[0, 100, 0, 1], [85, 107, 47, 1]],
//   [[0, 0, 139, 1], [173, 216, 230, 1]],
//   [[48, 25, 52, 1], [147, 112, 219, 1]],
//   [[204, 85, 0, 1], [255, 191, 0, 1]],
//   [[31, 38, 42, 1], [128, 128, 128, 1]],
// ];
const colors = [rgb(255, 255, 0), rgb(255, 0, 255), rgb(0, 255, 255), rgb(100, 0, 100)];

const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    unit: '%',
    label: '',
    getValue: (frame, satellite) => (satellite.performance.chargeState[frame] * 100).toFixed(2),
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
  selected, shouldUpdate, time, zoom, container,
}) {
  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  // const data = useRef(
  //   Array.from(
  //     { length: selected.current.satellites.length * selected.current.params.length },
  //     () => [],
  //   ),
  // );
  // console.log(time.length);

  // const initializeSeries = () => {
  //   const series = [];
  //   let index = 0;
  //   selected.current.satellites.forEach((satellite, i) => {
  //     selected.current.params.forEach((param, j) => {
  //       const helpers = dataHelpers[param];
  //       series.push({
  //         name: `${satellite.name}-${helpers.name}`,
  //         color: colors[index],
  //         visible: true,
  //         lineWidth: 1,
  //         data: data.current[index],
  //       });
  //       index += 1;
  //     });
  //   });
  //   return series;
  // };
  // const prevFrame = useRef(0);

  // const canvasRef = useRef();
  // const chart = useRef();

  const chart = useRef();
  const options = useRef({
    title: 'Fixed length / sliding data slices',
    width: 500,
    height: 600,
    hooks: {
      addSeries: [
        (u, seriesIdx) => {
          console.log(`addSeries${u.status == 0 ? ' (init)' : ''}`, seriesIdx);
        },
      ],
      delSeries: [
        (u, seriesIdx) => {
          console.log('delSeries', seriesIdx);
        },
      ],
    },
    series: [{}, {
      label: 'Charge State',
      stroke: 'red',
      values: (u, vals, space) => (v) => `${(v * 100).toFixed(1)}%`,
    }],
  });
  const seriesMap = useRef([]);
  const data = useRef([[time.slice(0, 2)], [selected.current.satellites[0].performance.chargeState.slice(0, 2)]]);

  useEffect(() => {
    const index = 0;
    updateData();
    // selected.current.satellites.forEach((satellite) => {
    //   selected.current.params.forEach((param) => {
    //     if (seriesMap.current[index] === `${satellite.id}-${param}`) return;
    //     if (seriesMap.current[index]) chart.current.delSeries(index + 1);
    //     const helpers = dataHelpers[param];
    //     chart.current.addSeries({
    //       label: `${satellite.name}-${helpers.name}`,
    //       stroke: colors[index],
    //     }, index + 1);
    //     seriesMap.current[index] = `${satellite.id}-${param}`;
    //     index += 1;
    //   });
    // });
  }, [chart]);
  const updateData = () => {
    const index = 0;
    data.current[0] = time.slice(0, frame.current);
    data.current[1] = selected.current.satellites[0].performance.chargeState.slice(0, frame.current);
    // selected.current.satellites.forEach((satellite) => {
    //   selected.current.params.forEach((param) => {
    //     if (!data.current[index + 1]) data.current.push([]);
    //     const helpers = dataHelpers[param];
    //     data.current[index + 1].push(helpers.getValue(frame.current, satellite));
    //     index += 1;
    //   });
    // });
    chart.current.setData(data.current);
  };

  addEffect(() => {
    // if (prevFrame.current === frame.current) return;
    // if (!time) return;
    // if (!canvasRef.current) return;
    if (!chart.current) return;
    updateData();
    console.log(data.current);
    // chart.current.update();
    // prevFrame.current = frame.current;
  });
  return (
    <Box maxHeight={500} width="50%" zIndex>

      <Flex justify="center">

        <UplotReact
          key="space-chart"
          onCreate={(u) => { chart.current = u; console.log(u); }}
          data={data.current}
          target={container.current}
          options={options.current}
        />

      </Flex>
    </Box>
  );
}

export default Chart;
