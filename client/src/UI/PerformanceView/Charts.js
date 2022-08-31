/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Box, Center, Flex, Select, VStack,
} from '@chakra-ui/react';
import { addEffect } from '@react-three/fiber';
import { Chart, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-luxon';
import { useStore, useFrameStore } from 'Model/store';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import shallow from 'zustand/shallow';
import { seededRandom } from 'three/src/math/MathUtils';
import chartConfig from './chartConfig';
import SatelliteList from './SatelliteList';

ChartJS.register(...registerables);
// ChartJS.register(ChartDataLabels);
ChartJS.defaults.color = '#fff';
ChartJS.defaults.borderColor = '#fff';

const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    format: (value) => (value * 100),
  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
    label: 'w/o Space Power',
    format: (value) => (value * 100),
  },
};
function Charts() {
  const {
    time, customers, spacePowers, averages,
  } = useStore(
    (state) => ({
      time: state.mission.time,
      customers: state.mission.satellites.customers,
      spacePowers: state.mission.satellites.spacePowers,
      averages: state.mission.satellites.averages,
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

  const selectedSatellites = useRef([...customers]);
  // const [selected, setSelected] = useState({
  //   satellites: [customers[0]],
  //   dataTypes: ['chargeState', 'chargeStateNoBeams'],
  // });
  const selectedDataTypes = useRef(['chargeState', 'chargeStateNoBeams']);
  const data = useRef();
  const shouldUpdate = useRef(true);
  const [isLoaded, setLoaded] = useState(false);
  const chartRef = useRef();

  const updateData = () => {
    const newData = [];
    selectedSatellites.current.forEach(
      (satellite, i) => selectedDataTypes.current.forEach((dataType, j) => {
        const helpers = dataHelpers[dataType];
        newData.push({
          ...chartConfig.defaultDataSet,
          label: `${satellite.name} ${helpers.label || ''}`,
          id: `${satellite.id}-${dataType}`,
          data: time.map(
            (t, index) => ({
              x: t,
              y: helpers.format(satellite.performance[dataType][index]),
            }),
          ),
          backgroundColor: chartConfig.colors[i][j],
          borderColor: chartConfig.colors[i][j],
        });
      }),
    );
    data.current = newData;
    shouldUpdate.current = false;
  };

  useEffect(() => {
    updateData();
    setLoaded(true);
  }, []);

  const toggleSelected = (satellite) => {
    if (selectedSatellites.current.includes(satellite)) {
      if (selectedSatellites.current.length === 1) return;
      selectedSatellites.current = selectedSatellites.current.filter((v) => v.id !== satellite.id);
    } else {
      selectedSatellites.current.push(satellite);
    }
    shouldUpdate.current = true;
    // setSelected((prev) => ({
    //   ...prev,
    //   satellites: selectedSatellites.current,
    // }));
  };

  addEffect(() => {
    if (!chartRef.current) return;
    if (shouldUpdate.current) {
      updateData();
      chartRef.current.data.datasets = data.current.map(
        (series) => ({ ...series, data: [] }),
      );
    }
    data.current.forEach((series, index) => {
      if (!chartRef.current.data.datasets) return;
      chartRef.current.data.datasets[index].data = Array.from(
        { length: 1000 },
        (value, i) => (
          i < frame.current
            ? series.data.slice(frame.current - 1000 > 0
              ? frame.current - 1000 : 0, frame.current)[i]
            : ({ x: time[i], y: null })),
      );
    });
    chartRef.current.data.labels = frame.current > 1000
      ? [time[frame.current], time[frame.current - 500]] : [time[frame.current]];
    chartRef.current.update('quiet');
  });

  useEffect(() => (chartRef.current && chartRef.current.destroy()), []);
  return (
    <VStack>
      <Box maxHeight={500} width="80%">
        <Flex justify="center">
          {isLoaded
            ? (
              <Line
                datasetIdKey="id"
                ref={chartRef}
                data={{
                  datasets: data.current.map(
                    (series) => ({ ...series, data: [series.data[0]] }),
                  ),
                }}
                options={chartConfig.options}
          // plugins={[chartConfig.custom_canvas_background_color]}
                className="chart"

              />
            ) : ''}
        </Flex>
      </Box>
      <Flex width="100%">
        <SatelliteList
          toggleSelected={toggleSelected}
          // selected={selected.satellites}
        />
      </Flex>
    </VStack>
  );
}

export default Charts;
