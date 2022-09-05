/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Flex, Select, Stat, StatLabel, StatNumber,
  Box, Center, StatGroup, GridItem, StatHelpText, StatArrow, ButtonGroup, Button, StatUpArrow, StatDownArrow, Text,
} from '@chakra-ui/react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ParentSize } from '@visx/responsive';
import shallow from 'zustand/shallow';
import { useFrameStore, useStore } from 'Model/store';
import { addEffect } from '@react-three/fiber';
import * as d3 from 'd3';
import Gauge from './Gauge';
import './HUD.css';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const statProps = [
  {
    key: 'netCurrent',
    label: 'Net Current',
    shouldArrows: true,
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
    shouldArrows: false,
    getValue: (frame, selected) => selected.params.load.duties[
      selected.performance.currentDuties[frame]
    ].consumption,
    formatValue: (value) => `${value}W`,
    getHelpText: (frame, selected) => `${capitalize(selected.params.load.duties[selected.performance.currentDuties[frame]].name)}`,

  },
  {
    key: 'chargeState',
    label: '',
    shouldArrows: false,
    getValue: (frame, selected) => selected.performance.chargeState[frame] * 100,
    formatValue: (value) => `${(value).toPrecision(3)}%`,
    getHelpText: () => 'w/o Space Power',
    getHelpNumber: (frame, selected) => `${(selected.performance.chargeStateNoBeams[frame] * 100).toPrecision(3)}% `,
  },
];

function HUD({
  shouldDisplay,
}) {
  const {
    satellites, toggleLabel, toggleAllLabels, attachCamera,
    detachCamera, cameraTarget, satelliteOptions,
  } = useStore(
    (state) => ({
      satellites: state.mission.satellites,
      toggleLabel: state.toggleLabel,
      toggleAllLabels: state.toggleAllLabels,
      satelliteOptions: state.satelliteOptions,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
    }),
    shallow,
  );

  // const [selected, setSelected] = useState(satellites.customers[0]);
  // const selected = useRef(satellites.customers[0]);
  const [selected, setSelected] = useState(satellites.customers[0]);
  useEffect(() => {
    // selected.current = satellites.customers[0];
    setSelected(() => satellites.customers[0]);
  }, [satellites]);

  const handleSelectSatellite = (e) => {
    const selection = e.target.value;
    if (selection === 'all') {
      // selected.current = satellites.averages;
      setSelected(() => satellites.averages);
    } else {
      // selected.current = satellites.customers.find((customer) => (
      //   customer.id === selection));
      setSelected(() => satellites.customers.find((customer) => (
        customer.id === selection)));
    }
  };

  const handleLabel = () => {
    toggleLabel(selected.id);
  };

  const handleCamera = () => {
    if (cameraTarget.id === selected.id) detachCamera();
    else attachCamera(selected.id);
  };

  const hideAllLabels = () => {
    toggleAllLabels(false);
  };

  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        if (state.frame - 10 > frame.current) { frame.current = state.frame; }
      },
    );
  }, []);

  // const statRefs = useRef([]);
  const statRefs = useRef(new Map());
  const handleStatRefs = useCallback((node) => {
    if (!node) return;
    const stat = statProps.find((v) => v.key === node.id);
    statRefs.current.set(
      stat.key,
      {
        ...stat,
        ref: node,
      },
    );
  }, []);

  console.log(statRefs.current);
  addEffect(() => {
    statRefs.current.forEach((stat) => {
      if (!stat.ref) return;
      const parent = d3.select(stat.ref);

      if (selected.name === 'averages' && stat.key !== 'chargeState') {
        if (!parent.classed('hide')) d3.select(stat.ref).classed('hide', true);
        return;
      }
      if (parent.classed('hide')) d3.select(stat.ref).classed('hide', false);

      const value = stat.getValue(frame.current, selected);

      parent.selectAll('.chakra-stat__number')
        .select('span')
        .text(stat.formatValue(value));

      parent.selectAll('.chakra-stat__help-text')
        .select('.help-text')
        .text(stat.getHelpText(frame.current, selected));

      if (stat.getHelpNumber) {
        parent.selectAll('.chakra-stat__help-text')
          .select('.help-number')
          .text(stat.getHelpNumber(frame.current, selected));
      }

      if (stat.shouldArrows) {
        const upArrow = parent.select('.chakra-stat__help-text').select('.up-arrow');
        const downArrow = parent.select('.chakra-stat__help-text').select('.down-arrow');
        if (value > 0) {
          upArrow.attr('visibility', 'visible');
          upArrow.style('position', 'relative');
          downArrow.attr('visibility', 'hidden');
          downArrow.style('position', 'absolute');
        } else {
          upArrow.attr('visibility', 'hidden');
          upArrow.style('position', 'absolute');
          downArrow.attr('visibility', 'visible');
          downArrow.style('position', 'relative');
        }
      }
    });
  });

  if (!satellites) return;
  return (
    <GridItem area={'2 / 1 / 3 / 3'} zIndex={99}>
      <Flex height="100%" justify="space-between" align-items="center" display={shouldDisplay ? 'flex' : 'none'}>
        <Center flex={1}>
          <Box px={2}>
            <Select onChange={handleSelectSatellite}>
              {satellites.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
              <option value="all">Average</option>
            </Select>

          </Box>
          {selected.name !== 'averages'
            ? (
              <ButtonGroup>
                <Button onClick={handleLabel}>
                  {satelliteOptions.get(selected.id).showLabel ? 'Hide Label' : 'Show Label'}
                </Button>
                <Button
                  // onClick={
                  //     cameraTarget.id === selected.id
                  //       ? () => detachCamera() : () => attachCamera(selected.id)
                  //   }
                  onClick={handleCamera}
                >
                  {cameraTarget.id === selected.id ? 'Detach Camera' : 'Attach Camera'}
                </Button>
              </ButtonGroup>
            )
            : <Button onClick={hideAllLabels}>{'Hide All Labels'}</Button>}
        </Center>
        <Box height="100%" flex={1}>
          <Center>
            <Stat
              align="center"
              ref={handleStatRefs}
              id={'chargeState'}

            >
              <StatLabel>Charge</StatLabel>

              <Gauge
                height={200}
                selected={selected}
                styles={{ position: 'absolute' }}
              />
              <StatNumber textStyle="number">
                <span />
              </StatNumber>
              <StatHelpText width="100%">
                <Text as={'span'} textStyle="number" className="help-number" />
                <span className="help-text" />
              </StatHelpText>

            </Stat>
          </Center>
        </Box>
        <Center flex={1}>
          <Box>
            <StatGroup>
              {statProps.slice(0, 2).map((stat) => (
                <Stat
                  width="30ch"
                  key={stat.key}
                  id={stat.key}
                  ref={handleStatRefs}
                >
                  <StatLabel>{stat.label}</StatLabel>
                  <StatNumber textStyle="number"><span /></StatNumber>
                  <StatHelpText>
                    {stat.shouldArrows
                      ? (
                        <>
                          <StatArrow type="increase" className="up-arrow hide" />
                          <StatArrow type="decrease" className="down-arrow hide" />
                        </>
                      )
                      : '' }
                    <span className="help-text" />
                  </StatHelpText>
                </Stat>
              ))}
            </StatGroup>
          </Box>
        </Center>
      </Flex>
    </GridItem>
  );
}

export default HUD;
