/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Box, Center, Flex, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper,
  NumberInput, NumberInputField, NumberInputStepper, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack,
} from '@chakra-ui/react';

import React, {
  startTransition,
  useCallback,
  useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition,
} from 'react';
import shallow from 'zustand/shallow';
import { useStore, useFrameStore } from '../../Model/store';
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

function ChartEditor() {
  const {
    customers, time, spacePowers, averages,
  } = useStore(
    (state) => ({
      customers: state.mission.satellites.customers,
      spacePowers: state.mission.satellites.spacePowers,
      averages: state.mission.satellites.averages,
      time: state.mission.time,
    }),
    shallow,
  );

  // const [selected.current.satellites, setselected.current.satellite] = useState([...customers]);
  // const [selectedParams, setSelectedParams] = useState('chargeState');

  const selected = useRef({
    satellites: customers.slice(0, 3),
    params: ['chargeState', 'chargeStateNoBeams'],
  });
  const [selectedSatellites, setSelectedSatellites] = useState(customers.slice(0, 3));
  const shouldUpdate = useRef(false);
  const toggleSelected = (id) => {
    const satellite = customers.find((v) => v.id === id);
    if (selected.current.satellites.includes(satellite)) {
      if (selected.current.satellites.length === 1) return;
      selected.current.satellites = selected.current.satellites.filter(
        (v) => v.id !== satellite.id,
      );
    } else {
      selected.current.satellites = [...selected.current.satellites, satellite];
      if (selected.current.satellites.length > 6) {
        selected.current.satellites.splice(0, 1);
      }
    }
    startTransition(() => { setSelectedSatellites(selected.current.satellites); });

    shouldUpdate.current = true;
  };
  const handleSelectParam = (e) => {
    selected.current.params = paramChoices.find((v) => v.key === e.target.value).selection;
    shouldUpdate.current = true;
  };

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
  const zoom = useRef(300);
  const handleZoom = (v) => {
    zoom.current = v;
  };
  const timeRef = useRef();

  useEffect(() => {
    selected.current.satellites = customers.slice(0, 3);
    timeRef.current = time;
    shouldUpdate.current = true;
  }, [customers, time]);

  return (
    <VStack>
      <Chart
        selected={selected}
        shouldUpdate={shouldUpdate}
        time={timeRef}
        zoom={zoom}
      />
      <FormControl width="50%">
        <Flex gap={3} align="center" justify="center" m={3}>
          <FormLabel height="100%" margin={0}>Zoom:</FormLabel>
          <Slider
            aria-label="slider-ex-2"
            colorScheme="purple"
            defaultValue={300}
            min={0}
            max={1000}
            step={10}
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
        <SatelliteList toggleSelected={toggleSelected} selected={selectedSatellites} />
        <Center width="50%">
          <VStack width="50%">
            <h4>Choose parameter</h4>
            <Select
              onChange={handleSelectParam}
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
