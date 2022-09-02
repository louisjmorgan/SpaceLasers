/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Box, Center, Flex, Select, VStack,
} from '@chakra-ui/react';
import { useStore, useFrameStore } from 'Model/store';

import {
  useCallback,
  useContext, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import shallow from 'zustand/shallow';
import Chart from './Chart';
import SatelliteList from './SatelliteList';

function ChartEditor() {
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

  const [selectedSatellites, setSelectedSatellites] = useState([...customers]);
  const [selectedParams, setSelectedParams] = useState(['chargeState', 'chargeStateNoBeams']);

  const toggleSelected = (id) => {
    const satellite = customers.find((v) => v.id === id);
    if (selectedSatellites.includes(satellite)) {
      if (selectedSatellites.length === 1) return;
      setSelectedSatellites((prev) => prev.filter((v) => v.id !== satellite.id));
    } else {
      setSelectedSatellites((prev) => [...prev, satellite]);
    }
  };

  return (

    <VStack>
      <Chart
        selectedParams={selectedParams}
        selectedSatellites={selectedSatellites}
      />
      <Flex width="100%">
        <SatelliteList toggleSelected={toggleSelected} selected={selectedSatellites} />
      </Flex>
    </VStack>
  );
}

export default ChartEditor;
