/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex } from '@chakra-ui/layout';
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import { Switch } from '@chakra-ui/switch';
import {
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/tabs';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../../Model/store';
import DutyTab from './DutyTab';
import OrbitTab from './OrbitTab';
import PowerTab from './PowerTab';

function SatelliteConfig({ formik }) {
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

  return (
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
          gap={3}
          p={10}
        >
          <FormControl as={Flex} align="center" width="60ch" gap={3}>
            <FormLabel my={0}>
              Edit
            </FormLabel>
            <Select variant="filled" value={constellationIndex} onChange={onSelectConstellation} width="20ch">
              {formik.values.constellations.map(
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
              {formik.values.constellations[constellationIndex].satellites.map(
                (satellite, index) => (
                  <option
                    key={satellite.id}
                    value={index}
                  >
                    {satellite.name}
                  </option>
                ),
              )}
            </Select>
          </FormControl>
          <FormControl as={Flex} align="center" width="20ch">
            <FormLabel my={0}>
              Advanced Editor
            </FormLabel>
            <Switch onChange={onAdvanced} isChecked={isAdvanced} />
          </FormControl>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            align="center"
            width="100%"
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
              <TabPanel pt={5}>
                <OrbitTab
                  formik={formik}
                />
              </TabPanel>
              <TabPanel pt={10}>
                <PowerTab address={`constellations[${constellationIndex}].satellites[${satIndex}]`} formik={formik} />
              </TabPanel>
              <TabPanel pt={10}>
                <DutyTab address={`constellations[${constellationIndex}].satellites[${satIndex}]`} formik={formik} />
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
