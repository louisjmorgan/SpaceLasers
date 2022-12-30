/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Box, Center, Flex, FormControl, FormLabel,
  Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack,
} from '@chakra-ui/react';

import React, {
  startTransition,
  useCallback,
  useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition,
} from 'react';
import shallow from 'zustand/shallow';
import { useFrameStore, useSimStore } from '../../Model/store';
import { FRAMES } from '../../Util/constants';
import Chart from './Chart';
import SatelliteList from './SatelliteList';

const paramChoices = [
  {
    key: 'chargeState',
    name: 'Charge State',
    selection: ['chargeState', 'chargeStateNoBeams'],
  },
  {
    key: 'netCurrent',
    name: 'Net Current',
    selection: ['netCurrent'],
  },
  {
    key: 'consumption',
    name: 'Consumption',
    selection: ['consumption'],
  },
];

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
    getValue: (frame, satellite) => (satellite.performance.chargeStateNoBeams[frame] * 100).toFixed(2),
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

const palette = [
  '#7EB26D', // 0: pale green
  '#EAB839', // 1: mustard
  '#6ED0E0', // 2: light blue
  '#EF843C', // 3: orange
  '#E24D42', // 4: red
  '#1F78C1', // 5: ocean
  '#BA43A9', // 6: purple
  '#705DA0', // 7: violet
  '#508642', // 8: dark green
  '#CCA300', // 9: dark sand
];

function ChartEditor() {
  const {
    customers, time, spacePowers, averages,
  } = useSimStore(
    (state) => ({
      customers: state.mission.satellites.customers,
      spacePowers: state.mission.satellites.spacePowers,
      averages: state.mission.satellites.averages,
      time: state.mission.time,
    }),
    shallow,
  );

  const [selected, setSelected] = useState({
    satellites: [customers[0].id],
    params: ['chargeState', 'chargeStateNoBeams'],
  });
  const [selectedParams, setSelectedParams] = useState('chargeState');

  const onSelectSatellite = (id) => {
    // const sat = customers.find((c) => c.id === id);
    setSelected((prev) => ({
      ...prev,
      satellites: prev.satellites.includes(id)
        ? prev.satellites.filter((v) => v !== id)
        : [...prev.satellites, id],
    }));
  };

  const onSelectParam = (e) => {
    const choice = paramChoices.find((c) => c.key === e.target.value);
    setSelected((prev) => ({
      ...prev,
      params: choice.selection,
    }));
  };

  const [series, setSeries] = useState([{
    satellite: customers[0],
    param: 'chargeState',
    color: palette[0],
    name: `${customers[0].name}-${dataHelpers.chargeState.name}`,
    data: time.map(
      (t, j) => dataHelpers.chargeState.getValue(j, customers[0]),
    ),
    shouldFixYScale: true,
  },
  {
    satellite: customers[0],
    param: 'chargeStateNoBeams',
    color: palette[1],
    name: `${customers[0].name}-${dataHelpers.chargeStateNoBeams.name}`,
    data: time.map(
      (t, j) => dataHelpers.chargeStateNoBeams.getValue(j, customers[0]),
    ),
    shouldFixYScale: true,
  }]);

  useEffect(() => {
    setSeries((prev) => {
      let index = 0;
      const newSeries = selected.satellites.map((id) => {
        const satellite = customers.find((c) => c.id === id);
        return (
          selected.params.map((param) => ({
            data: time.map(
              (t, j) => dataHelpers[param].getValue(j, satellite),
            ),
            param,
            name: `${satellite.name}-${dataHelpers[param].name}`,
            color: palette[index++],
            shouldFixYScale: dataHelpers[param].shouldFixYScale,
          }))
        );
      });
      return newSeries.flat();
    });
  }, [selected.satellites, selected.params]);
  console.log(series);

  const window = useRef(300);

  const handleZoom = (v) => {
    window.current = FRAMES / v;
  };
  return (
    <VStack>
      <Chart
        series={series}
        time={time}
        window={window}
      />
      <FormControl width="50%">
        <Flex gap={3} align="center" justify="center" m={3}>
          <FormLabel height="100%" margin={0}>Zoom:</FormLabel>
          <Slider
            aria-label="slider-ex-2"
            colorScheme="purple"
            defaultValue={300}
            min={1}
            max={48}
            step={5}
            onChange={handleZoom}
            maxWidth="10rem"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </FormControl>
      <Flex width="100%" justify="flex-start">
        <SatelliteList onSelectSatellite={onSelectSatellite} selected={selected.satellites} />
        <Center width="50%">
          <VStack width="50%">
            <h4>Choose parameter</h4>
            <Select
              onChange={onSelectParam}
            >
              {paramChoices.map((choice) => (
                <option value={choice.key} key={choice.key}>{choice.name}</option>
              ))}
            </Select>
          </VStack>
        </Center>
        <Box width="20%" />
      </Flex>
    </VStack>
  );
}

export default ChartEditor;
