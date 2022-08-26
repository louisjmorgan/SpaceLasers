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
import useStore from 'Model/store';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import shallow from 'zustand/shallow';
import { seededRandom } from 'three/src/math/MathUtils';
import chartConfig from './chartConfig';

ChartJS.register(...registerables);
ChartJS.register(ChartDataLabels);
ChartJS.defaults.color = '#fff';
ChartJS.defaults.borderColor = '#fff';

const dataHelpers = {
  chargeState: {
    name: 'Charge State',
    format: (value) => (value * 100),
  },
  chargeStateNoBeams: {
    name: 'Charge w/o Space Power',
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
  const frame = useRef(useStore.getState().frame);
  useEffect(() => {
    useStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const [selectedSatellites, setSelectedSatellites] = useState([]);
  const [selectedDataTypes, setSelectedDataTypes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!time || !customers) return;
    setData(() => []);

    selectedSatellites.forEach((satellite) => selectedDataTypes.forEach((dataType) => {
      const helpers = dataHelpers[dataType];
      setData((prev) => [...prev, {
        ...chartConfig.defaultDataSet,
        label: helpers.name,
        id: `${satellite.id}-${dataType}`,
        data: time.map(
          (t, index) => ({
            x: Number(t),
            y: helpers.format(satellite.performance[dataType][index]),
          }),
        ),
      }]);
    }));
  }, [selectedSatellites, selectedDataTypes]);

  useEffect(() => {
    setSelectedSatellites(() => [...customers]);
    setSelectedDataTypes(() => ['chargeState', 'chargeStateNoBeams']);
  }, []);
  const chartRef = useRef();
  addEffect(() => {
    if (!chartRef.current || data.length === 0) return;
    data.forEach((series, index) => {
      chartRef.current.data.datasets[index].data = Array.from(
        { length: 1000 },
        (value, i) => (
          i < frame.current
            ? series.data.slice(frame.current - 1000 > 0 ? frame.current - 1000 : 0, frame.current)[i]
            : ({ x: time[i], y: null })),
      );
    });
    // chartRef.current.options.scales.x.min = time[frame.current - 999];
    // chartRef.current.options.scales.x.max = time[frame.current];
    chartRef.current.data.labels = [time[frame.current]];
    chartRef.current.update('quiet');
  });
  useEffect(() => (chartRef.current && chartRef.current.destroy()), []);

  if (data.length === 0) return;
  return (
    <VStack>
      <Flex width="90%" justify="center" height={500}>
        <Line
          datasetIdKey="id"
          ref={chartRef}
          data={{ datasets: data.map((series) => ({ ...series, data: [series.data[0]] })) }}
          options={chartConfig.options}
          // plugins={[chartConfig.custom_canvas_background_color]}
          className="chart"
        />
      </Flex>
    </VStack>
  );
}

export default Charts;
