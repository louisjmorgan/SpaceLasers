/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex } from '@chakra-ui/layout';
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/modal';
import { Show } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { Switch } from '@chakra-ui/switch';
import {
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/tabs';
import { useFormContext } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../../Model/store';
import DutyTab from './DutyTab';
import OrbitTab from './OrbitTab';
import PowerTab from './PowerTab';

function SatelliteConfig() {
  const {
    isOpen, closeMenu, satIndex, setSatIndex, constellationIndex,
    setConstellationIndex, setAdvanced, isAdvanced,
  } = useUIStore((state) => ({
    isOpen: state.isOpen.satelliteConfig,
    closeMenu: state.closeMenu,
    satIndex: state.satIndex,
    constellationIndex: state.constellationIndex,
    setConstellationIndex: state.setConstellationIndex,
    setSatIndex: state.setSatIndex,
    isAdvanced: state.isAdvanced,
    setAdvanced: state.setAdvanced,
  }), shallow);

  const onClose = () => {
    closeMenu('satelliteConfig');
  };

  const onSelectSatellite = (e) => {
    setSatIndex(e.target.value);
  };

  const onSelectConstellation = (e) => {
    setConstellationIndex(e.target.value);
    setSatIndex(0);
  };

  const onAdvanced = (e) => {
    setAdvanced(e.target.checked);
  };
  const { getValues } = useFormContext();

  return isOpen && (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        my="5vh"
        p={0}
        height="90vh"
        bg="background.200"
      >
        <ModalHeader
          textAlign="center"
          as={Flex}
          justify="space-around"
          align="center"
          flexWrap="wrap"
          maxWidth="100%"
          gap={3}
          p={5}
          pt={0}
          mt={10}

        >
          <FormControl
            as={Flex}
            align="center"
            justify="center"
            maxWidth="50ch"
            flexWrap="wrap"
            gap={3}
          >
            <Show above="lg">
              <FormLabel my={0}>
                Edit
              </FormLabel>
            </Show>
            <Select variant="filled" value={constellationIndex} onChange={onSelectConstellation} width="20ch">
              {getValues('constellations').map(
                (constellation, index) => (
                  <option
                    key={constellation.id}
                    value={index}
                  >
                    {constellation.name}
                  </option>
                ),
              )}
            </Select>
            <Select variant="filled" value={satIndex} onChange={onSelectSatellite} width="20ch">
              {getValues(`constellations.${constellationIndex}.satellites`).map(
                (sat, index) => (
                  <option
                    key={sat.id}
                    value={index}
                  >
                    {sat.name}
                  </option>
                ),
              )}
            </Select>
          </FormControl>
          <FormControl as={Flex} align="center" width="20ch" p={3}>
            <FormLabel my={0}>
              Advanced Editor
            </FormLabel>
            <Switch onChange={onAdvanced} isChecked={isAdvanced} />
          </FormControl>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Flex} justify="center">
          <Tabs
            align="center"
            maxWidth="80ch"
            display="flex"
            height="100%"
            overflow="hidden"
            flexDirection="column"
            m={0}
          >
            <TabList>
              <Tab>Orbit</Tab>
              <Tab>Power</Tab>
              <Tab>Duty</Tab>
            </TabList>
            <TabPanels>
              <TabPanel pt={5} maxWidth="80ch">
                <OrbitTab address={`constellations.${constellationIndex}.satellites.${satIndex}`} />
              </TabPanel>
              <TabPanel pt={10} maxWidth="80ch">
                <PowerTab address={`constellations.${constellationIndex}.satellites.${satIndex}`} />
              </TabPanel>
              <TabPanel pt={10} maxWidth="80ch">
                <DutyTab address={`constellations.${constellationIndex}.satellites.${satIndex}`} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter height="auto">
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SatelliteConfig;