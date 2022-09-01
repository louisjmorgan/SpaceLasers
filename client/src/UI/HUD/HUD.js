/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Flex, Select, Stat, StatLabel, StatNumber,
  Box, Center, StatGroup, GridItem, StatHelpText, StatArrow, ButtonGroup, Button,
} from '@chakra-ui/react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ParentSize } from '@visx/responsive';
import shallow from 'zustand/shallow';
import { useFrameStore, useStore } from 'Model/store';
import { addEffect } from '@react-three/fiber';
import Gauge from './Gauge';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const statProps = [
  {
    key: 'netCurrent',
    label: 'Net Current',
    getValue: (frame, selected) => {
      const netCurrent = selected.params.load.powerProfiles[
        selected.performance.sources[frame]
      ][
        selected.performance.currentDuties[frame]
      ];
      return netCurrent;
    },
    formatValue: (value) => `${(value).toFixed(2)}A`,
    getHelpText: (frame, selected) => capitalize(selected.performance.sources[frame]),
  },
  {
    key: 'consumption',
    label: 'Consumption',
    getValue: (frame, selected) => selected.params.load.duties[
      selected.performance.currentDuties[frame]
    ].consumption,
    formatValue: (value) => `${value}W`,
    getHelpText: (frame, selected) => `${capitalize(selected.params.load.duties[selected.performance.currentDuties[frame]].name)}`,

  },
];

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

  const [selected, setSelected] = useState(satellites.averages);

  const handleSelectSatellite = (selection) => {
    if (selection === 'all') setSelected(() => satellites.averages);
    else {
      setSelected(() => (
        satellites.customers.find((customer) => (
          customer.id === selection))));
    }
  };

  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        frame.current = state.frame;
      },
    );
  }, []);

  const statRefs = useRef([]);
  const handleStatRefs = useCallback((node, stat) => {
    statRefs.current.push({
      ...stat,
      ref: node,
    });
  });
  addEffect(() => {
    if (selected.params) {
      statRefs.current.forEach((stat) => {
        const parent = stat.ref.children[0];
        const value = stat.getValue(frame.current, selected);
        const valueContainer = parent.children[1];
        valueContainer.innerText = stat.formatValue(value);
        const helpContainer = parent.children[2];
        helpContainer.children[4].innerText = stat.getHelpText(frame.current, selected);
      });
    }
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
                {statProps.map((stat) => (
                  <Stat
                    width="30ch"
                    key={stat.key}
                    ref={(node) => handleStatRefs(node, stat)}
                  >
                    <StatLabel>{stat.label}</StatLabel>
                    <StatNumber />
                    <StatHelpText>
                      <StatArrow type="increase" />
                      <StatArrow type="decrease" />
                      <span />
                    </StatHelpText>
                  </Stat>
                ))}
                {/* <Stat width="30ch">
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
                </Stat> */}
              </StatGroup>
            ) : '' }
          </Box>
        </Center>
      </Flex>
    </GridItem>
  );
}

export default HUD;
