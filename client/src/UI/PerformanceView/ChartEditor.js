/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Box, Center, Flex, FormControl, FormLabel,
  Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Switch, Text, VStack,
} from '@chakra-ui/react';

import React, {
  startTransition,
  useCallback,
  useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition,
} from 'react';
import shallow from 'zustand/shallow';
import { useFrameStore, useSimStore } from '../../Model/store';
import { FPmS, FRAMES } from '../../Util/constants';
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

const zoomScale = [
  1,
  48 / 44,
  46 / 4,
  12,
  16,

];

function ChartEditor() {
  const {
    customers, time, spacePowers, averages, setPaused,
  } = useSimStore(
    (state) => ({
      customers: state.mission.satellites.customers,
      spacePowers: state.mission.satellites.spacePowers,
      averages: state.mission.satellites.averages,
      time: state.mission.time,
      setPaused: state.setPaused,
    }),
    shallow,
  );

  const [selected, setSelected] = useState({
    satellites: [customers[0].id],
    params: ['chargeState', 'chargeStateNoBeams'],
  });
  const [selectedParams, setSelectedParams] = useState('chargeState');

  const onSelectSatellite = (values) => {
    // // const sat = customers.fivalues((c) => c.id === id);
    // setSelected((prev) => ({
    //   ...prev,
    //   satellites: prev.satellites.includes(id)
    //     ? prev.satellites.filter((v) => v !== id)
    //     : [...prev.satellites, id],
    // }));
    setSelected((prev) => ({
      ...prev,
      satellites: [...values.map((s) => s.value)],
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
    scale: {
      min: 0,
      max: 100,
    },
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
  const pauseUpdates = useRef(false);
  useEffect(() => {
    pauseUpdates.current = true;
    setSeries((prev) => {
      let index = 0;
      const newSeries = selected.satellites.map((id) => {
        const satellite = customers.find((c) => c.id === id);
        return (
          selected.params.map((param) => {
            const data = time.map(
              (t, j) => dataHelpers[param].getValue(j, satellite),
            );
            return {
              data,
              scale: {
                min: Math.min(...data),
                max: Math.max(...data),
              },
              param,
              name: `${satellite.name} ${dataHelpers[param].label}`,
              color: palette[index++],
              shouldFixYScale: dataHelpers[param].shouldFixYScale,
            };
          }));
      });
      return newSeries.flat();
    });
  }, [selected.satellites, selected.params]);

  const chartWindow = useRef(FRAMES / 24);
  const [zoom, setZoom] = useState(12);
  const handleZoom = (v) => {
    chartWindow.current = FRAMES / (48 / (48 - v));
    setZoom(48 - v);
  };

  const [showLegend, setLegend] = useState(true);

  const handleLegend = (e) => {
    setLegend(e.target.checked);
  };
  return (
    <Flex direction="column" justify="start" height="100%">
      <Chart
        series={series}
        time={time}
        chartWindow={chartWindow}
        pauseUpdates={pauseUpdates}
        showLegend={showLegend}
      />
      <Flex width="100%" align="start" justify="start" pl="15%" direction="column" mt="66px" mb={5} gap={7}>
        <Flex align="start" flexWrap="wrap" gap={10} width="100%">
          <FormControl
            maxWidth={['90%', '90%', '60%']}
            as={VStack}
            align="start"
            mb={5}
          >
            <FormLabel height="100%" textAlign="left">Zoom</FormLabel>
            <Slider
              aria-label="slider-ex-2"
              colorScheme="black"
              defaultValue={36}
              min={24}
              max={47}
              step={2}
              maxWidth="30ch"
              onChange={handleZoom}
            >
              <SliderMark
                value={48 - zoom}
                textAlign="left"
                color="white"
                mt="2"
                w="15ch"
              >
                {`${zoom} `}
                hour
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl
            display="flex"
            alignItems="start"
            width="20ch"
            flexDirection="column"
            maxWidth={['90%', '90%', '30%']}
          >
            <FormLabel htmlFor="show-legend">
              Show Legend
            </FormLabel>
            <Switch id="show-legend" isChecked={showLegend} onChange={handleLegend} />
          </FormControl>
        </Flex>
        <Flex align="start" flexWrap="wrap" gap={10} width="100%">
          <SatelliteList onSelectSatellite={onSelectSatellite} selected={selected.satellites} />
          <FormControl as={VStack} align="start" maxWidth={['90%', '90%', '30%']}>
            <FormLabel textAlign="left">Parameter</FormLabel>
            <Select
              onChange={onSelectParam}
            >
              {paramChoices.map((choice) => (
                <option value={choice.key} key={choice.key}>{choice.name}</option>
              ))}
            </Select>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ChartEditor;
