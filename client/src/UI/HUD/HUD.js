/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Flex, Select, Stat, StatLabel, StatNumber,
  Box, Center, StatGroup, GridItem, StatHelpText, ButtonGroup,
  Button, Text,
} from '@chakra-ui/react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import shallow from 'zustand/shallow';
import { addEffect } from '@react-three/fiber';
import * as d3 from 'd3';
import { TriangleUpIcon } from '@chakra-ui/icons';
import { useFrameStore, useSimStore, useUIStore } from '../../Model/store';
import Gauge from './Gauge';
import './HUD.css';
import { FRAMES } from '../../Util/constants';

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
    getValue: (frame, selected) => selected.performance.chargeStateNoBeams[frame] * 100,
    formatValue: (value) => `${(value).toPrecision(3)}%`,
    getHelpText: () => 'w/ Space Power',
    getHelpNumber: (frame, selected) => `${(selected.performance.chargeState[frame] * 100).toPrecision(3)}% `,
  },
];

function HUD() {
  const {
    satellites, attachCamera,
    detachCamera, cameraTarget,
    toggleLabel, toggleAllLabels, satelliteOptions,
  } = useSimStore(
    (state) => ({
      satellites: state.mission.satellites,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
      toggleLabel: state.toggleLabel,
      toggleAllLabels: state.toggleAllLabels,
      satelliteOptions: state.satelliteOptions,
    }),
    shallow,
  );

  const view = useUIStore((state) => state.view, shallow);

  const [selected, setSelected] = useState(satellites.customers[0]);
  useEffect(() => {
    setSelected(() => satellites.customers[0]);
  }, [satellites]);

  const handleSelectSatellite = (e) => {
    const selection = e.target.value;
    if (selection === 'fleet') {
      setSelected(() => satellites.fleet);
    } else {
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
        if (state.frame - 10 > frame.current) frame.current = state.frame;
        if (frame.current > state.frame) frame.current = state.frame;
      },
    );
  }, []);

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

  const prevFrame = useRef();
  const arrow = useRef();
  const parent = useRef();
  addEffect(() => {
    if (frame.current > FRAMES) return;
    statRefs.current.forEach((stat) => {
      if (!stat.ref) return;
      parent.current = d3.select(stat.ref);

      if (selected.name === 'fleet' && stat.key !== 'chargeState') {
        if (!parent.current.classed('hide')) d3.select(stat.ref).classed('hide', true);
        return;
      }
      if (parent.current.classed('hide')) d3.select(stat.ref).classed('hide', false);
      let value;
      try {
        value = stat.getValue(frame.current, selected);
      } catch {
        return;
      }

      parent.current.selectAll('.chakra-stat__number')
        .select('span')
        .text(stat.formatValue(value));

      parent.current.selectAll('.chakra-stat__help-text')
        .select('.help-text')
        .text(stat.getHelpText(frame.current, selected));

      if (stat.getHelpNumber) {
        parent.current.selectAll('.chakra-stat__help-text')
          .select('.help-number')
          .text(stat.getHelpNumber(frame.current, selected));
      }

      if (stat.shouldArrows) {
        arrow.current = parent.current.select('.chakra-stat__help-text').select('.up-arrow');

        if (value > 0) {
          if (arrow.current.select('path').attr('fill') !== 'rgb(72,187, 120, 1') arrow.current.select('path').attr('fill', 'rgb(72,187, 120, 1');
          if (arrow.current.attr('transform') !== 'rotate(0,0,0)') arrow.current.attr('transform', 'rotate(0 0 0)');
        } else {
          if (arrow.current.select('path').attr('fill') !== 'rgb(245,101, 101, 1') arrow.current.select('path').attr('fill', 'rgb(245,101, 101, 1');
          if (arrow.current.attr('transform') !== 'rotate(180,0,0)') arrow.current.attr('transform', 'rotate(180 0 0)');
        }
      }
    });
    prevFrame.current = frame.current;
  });

  if (!satellites) return;
  return (
    <GridItem area={'3 / 1 / 4 / 3'} zIndex={99} transform={view.name === 'simulation' ? '' : 'translate(-9999px, 0)'} position={view.name === 'simulation' ? '' : 'absolute'}>
      <Flex height="100%" justify="space-between" align-items="center">
        <Center flex={1}>
          <Box px={2}>
            <Select onChange={handleSelectSatellite}>
              {satellites.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
              <option value="fleet">Fleet</option>
            </Select>

          </Box>
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
                        <TriangleUpIcon className="up-arrow" m={1} ml={0} />
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
