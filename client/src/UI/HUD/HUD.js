/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Flex, Select, Stat, StatLabel, StatNumber,
  Box, Center, StatGroup, GridItem, StatHelpText, StatArrow, ButtonGroup, Button,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { ParentSize } from '@visx/responsive';
import shallow from 'zustand/shallow';
import { useStore } from 'Model/store';
import Gauge from './Gauge';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function HUD({
  satellites, shouldDisplay,
}) {
  const {
    toggleLabel, toggleAllLabels, attachCamera, detachCamera, cameraTarget, satelliteOptions,
  } = useStore(
    (state) => ({
      toggleLabel: state.toggleLabel,
      toggleAllLabels: state.toggleAllLabels,
      satelliteOptions: state.satelliteOptions,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
    }),
    shallow,
  );
  const frame = useStore((state) => state.frame);
  const [selected, setSelected] = useState(satellites.averages);

  const handleSelectSatellite = (selection) => {
    if (selection === 'all') setSelected(() => satellites.averages);
    else {
      setSelected(() => (
        satellites.customers.find((customer) => (
          customer.id === selection))));
    }
  };

  const netCurrent = useRef(0);
  useEffect(() => {
    if (!selected.params) return;
    netCurrent.current = selected.params.load.powerProfiles[
      selected.performance.sources[frame]
    ][
      selected.performance.currentDuties[frame]
    ];
  }, [selected, frame]);

  if (!satellites) return;
  return (
    <GridItem area={'2 / 1 / 3 / 3'} zIndex={99}>
      <Flex height="100%" justify="space-between" align-items="center" display={shouldDisplay ? 'flex' : 'none'}>
        <Center flex={1}>
          <Box px={2}>
            <Select onChange={(e) => handleSelectSatellite(e.target.value)}>
              <option value="all">Average</option>
              {satellites.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </Select>

          </Box>
          {selected.name !== 'averages'
            ? (
              <ButtonGroup>
                <Button onClick={() => toggleLabel(selected.id)}>
                  {satelliteOptions.get(selected.id).showLabel ? 'Hide Label' : 'Show Label'}
                </Button>
                <Button onClick={
                      cameraTarget.id === selected.id
                        ? () => detachCamera() : () => attachCamera(selected.id)
                    }
                >
                  {cameraTarget.id === selected.id ? 'Detach Camera' : 'Attach Camera'}
                </Button>
              </ButtonGroup>
            )
            : <Button onClick={() => toggleAllLabels(false)}>{'Hide All Labels'}</Button>}
        </Center>
        <Box height="100%" flex={1}>

          <ParentSize>
            {({ height }) => (

              <Gauge
                height={height}
                beams={selected.performance.chargeState[frame] * 100}
                noBeams={selected.performance.chargeStateNoBeams[frame] * 100}
              />

            )}
          </ParentSize>

        </Box>
        <Center flex={1}>
          <Box>
            {selected.params ? (

              <StatGroup>
                <Stat width="30ch">
                  <StatLabel>Net Current</StatLabel>
                  <StatNumber>{`${(netCurrent.current).toFixed(2)}A`}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={netCurrent.current > 0 ? 'increase' : 'decrease'} />
                    {`${capitalize(selected.performance.sources[frame])} `}
                  </StatHelpText>
                </Stat>
                <Stat width="30ch">
                  <StatLabel>Consumption</StatLabel>
                  <StatNumber>{`${selected.params.load.duties[selected.performance.currentDuties[frame]].consumption}W`}</StatNumber>
                  <StatHelpText>{`${capitalize(selected.params.load.duties[selected.performance.currentDuties[frame]].name)}`}</StatHelpText>
                </Stat>
              </StatGroup>
            ) : '' }
          </Box>
        </Center>
      </Flex>
    </GridItem>
  );
}

export default HUD;
