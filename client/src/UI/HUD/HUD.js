/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Flex, Select, Stat, StatLabel, StatNumber,
  Box, Center, StatGroup, StatHelpText, Text,
  Drawer, DrawerContent,
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
    getValue: (frame, selected) => `${(selected.performance.chargeState[frame] * 100).toPrecision(3)}% `,
    formatValue: (value) => value,
    getHelpText: (frame, selected) => (selected.isCustomer ? 'w/o Space Power' : ''),
    getHelpNumber: (frame, selected) => (selected.isCustomer ? `${(selected.performance.chargeStateNoBeams[frame] * 100).toPrecision(3)}% ` : ''),
  },
];

function HUD() {
  const {
    satellites, constellations, toggleLabel, toggleAllLabels,
    satelliteOptions, constellationOptions,
  } = useSimStore((state) => ({
    satellites: state.mission.satellites,
    constellations: state.mission.constellations,
    toggleLabel: state.toggleLabel,
    toggleAllLabels: state.toggleAllLabels,
    satelliteOptions: state.satelliteOptions,
    constellationOptions: state.constellationOptions,
  }), shallow);

  const {
    isOpen, closeMenu,
  } = useUIStore((state) => ({
    view: state.view,
    isOpen: state.isOpen.HUD,
    closeMenu: state.closeMenu,
  }), shallow);

  const onClose = () => {
    closeMenu('HUD');
  };

  const [selected, setSelected] = useState({
    constellation: constellations[0],
    satellite: satellites.customers[0],
  });

  useEffect(() => {
    setSelected(() => ({
      constellation: constellations[0],
      satellite: satellites.customers[0],
    }));
  }, [satellites, constellations]);

  const handleSelectSatellite = (e) => {
    const selection = e.target.value;
    if (selection === selected.constellation.id) {
      setSelected(() => ({
        ...selected,
        satellite: selected.constellation,
      }));
    } else {
      setSelected(() => ({
        ...selected,
        satellite: satelliteOptions.get(selection).isCustomer
          ? satellites.customers.find((customer) => (customer.id === selection))
          : satellites.spacePowers.find((spacePower) => (spacePower.id === selection)),
      }));
    }
  };

  const handleSelectConstellation = (e) => {
    const selection = e.target.value;
    setSelected(() => ({
      constellation: constellationOptions.get(selection),
      satellite: satellites.customers.find((customer) => (
        customer.id === constellationOptions.get(selection).satellites[0]
      )),
    }));
  };

  useEffect(() => {
    if (selected.satellite.id === selected.constellation.id) {
      toggleAllLabels(true);
    } else {
      toggleAllLabels(false);
      toggleLabel(selected.satellite.id);
    }
  }, [selected]);

  const frame = useRef(useFrameStore.getState().frame);
  useEffect(() => {
    useFrameStore.subscribe(
      (state) => {
        if (state.frame - 5 > frame.current) frame.current = state.frame;
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

      if (selected.satellite.id === selected.constellation.id && stat.key !== 'chargeState') {
        if (!parent.current.classed('hide')) d3.select(stat.ref).classed('hide', true);
        return;
      }
      if (parent.current.classed('hide')) d3.select(stat.ref).classed('hide', false);
      let value;
      try {
        value = stat.getValue(frame.current, selected.satellite);
      } catch {
        return;
      }

      parent.current.selectAll('.chakra-stat__number')
        .select('span')
        .text(stat.formatValue(value));

      parent.current.selectAll('.chakra-stat__help-text')
        .select('.help-text')
        .text(stat.getHelpText(frame.current, selected.satellite));

      if (stat.getHelpNumber) {
        parent.current.selectAll('.chakra-stat__help-text')
          .select('.help-number')
          .text(stat.getHelpNumber(frame.current, selected.satellite));
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
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      closeOnEsc={false}
      size="md"
      variant="permanent"
    >
      {/* <GridItem
      area={'3 / 1 / 4 / 3'}
      zIndex={99} transform={view.name === 'simulation' ? '' : 'translate(-9999px, 0)'}
      position={view.name === 'simulation' ? '' : 'absolute'}
      > */}
      <DrawerContent
        width="100%"
        backgroundColor={['background.100', 'background.100', 'transparent']}
        pb="6vh"
        pt={5}
        boxShadow="0"

      >
        <Flex height="100%" justify="space-around" align-items="center" flexWrap="wrap" width="100%">
          <Center flex={1}>
            <Flex gap={5} direction="column" minWidth="15ch">
              <Select value={selected.constellation.id} onChange={handleSelectConstellation}>
                {[...constellationOptions.entries()].map(([id, constellation]) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {constellation.name}
                  </option>
                ))}
              </Select>
              <Select value={selected.satellite.id} onChange={handleSelectSatellite}>
                {constellationOptions.get(selected.constellation.id).satellites.map((id) => (
                  <option key={id} value={id}>{satelliteOptions.get(id).name}</option>
                ))}
                <option value={selected.constellation.id}>All</option>
              </Select>
            </Flex>
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
                  selected={selected.satellite}
                  styles={{ position: 'absolute' }}
                />
                <StatNumber textStyle="number" color="green.500">
                  <span />
                </StatNumber>
                <StatHelpText width="100%">
                  <Text as={'span'} textStyle="number" className="help-number" />
                  <span className="help-text" />
                </StatHelpText>
              </Stat>
            </Center>
          </Box>
          <Center flex={1} minWidth="15ch">
            <StatGroup as={Flex} justify="space-around" width="100%" flexWrap="wrap" gap={5}>
              {statProps.slice(0, 2).map((stat) => (
                <Stat
                  key={stat.key}
                  id={stat.key}
                  ref={handleStatRefs}
                  width="auto"
                  as={Flex}
                  justify="center"
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
          </Center>
        </Flex>
      </DrawerContent>
      {/* </GridItem> */}
    </Drawer>
  );
}

export default HUD;
