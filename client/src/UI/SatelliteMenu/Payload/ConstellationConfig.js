/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Center, Flex, Text } from '@chakra-ui/layout';
import {
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/modal';
import { Button, Switch } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import {
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/tabs';
import shallow from 'zustand/shallow';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useUIStore } from '../../../Model/store';
import { defaultSatellite } from '../../../Util/defaultInputs';
import SPButton from '../../Elements/SPButton';
import ConstellationOrbitTab from './ConstellationOrbitTab';
import DutyTab from './DutyTab';
import PowerTab from './PowerTab';
import { twoline2satrec } from '../../../Util/astronomy';

function ConstellationConfig() {
  const {
    isOpen, closeMenu, setSatIndex, constellationIndex,
    setConstellationIndex, setAdvanced, isAdvanced, orbitLists,
  } = useUIStore((state) => ({
    isOpen: state.isOpen.constellationConfig,
    closeMenu: state.closeMenu,
    satIndex: state.satIndex,
    constellationIndex: state.constellationIndex,
    setConstellationIndex: state.setConstellationIndex,
    setSatIndex: state.setSatIndex,
    orbitLists: state.orbitLists,
    isAdvanced: state.isAdvanced,
    setAdvanced: state.setAdvanced,
  }), shallow);

  const onClose = () => {
    closeMenu('constellationConfig');
  };

  const onSelectConstellation = (e) => {
    setConstellationIndex(e.target.value);
    setSatIndex(0);
  };

  const onAdvanced = (e) => {
    setAdvanced(e.target.checked);
  };

  const [error, setError] = useState('');
  const [failed, setFailed] = useState(0);
  const { setValue, getValues } = useFormContext();
  const extractTle = (tle) => {
    let satRec;
    try {
      const { tle1, tle2 } = tle.tles;
      satRec = twoline2satrec(tle1, tle2);
    } catch {
      throw new Error('Error extracting TLE');
    }
    return {
      epoch: satRec.epochdatetimelocal,
      meanMotionDot: satRec.ndottle,
      bstar: satRec.bstar || satRec.bstar.toFixed(5),
      inclination: satRec.inclotle,
      rightAscension: satRec.nodeotle,
      eccentricity: satRec.ecco,
      perigee: satRec.argpotle,
      meanAnomaly: satRec.motle,
      meanMotion: satRec.notle,
      tle: `${tle.name}\n${tle.tles.tle1}\n${tle.tles.tle2}`,
      list: getValues(`constellations.${constellationIndex}.list`),
    };
  };

  const onGenerate = () => {
    const tles = orbitLists.find(
      (v) => v.name === getValues(`constellations.${constellationIndex}.list`),
    ).tles.slice(0, getValues(`constellations.${constellationIndex}.satelliteCount`));
    const constellation = getValues(`constellations.${constellationIndex}`);
    const newSats = [];
    tles.forEach((tle, index) => {
      try {
        const newOrbit = extractTle(tle, index);
        newSats.push({
          ...defaultSatellite,
          ...constellation.payload,
          name: `Satellite ${index + 1}`,
          id: uuidv4(),
          orbit: newOrbit,
        });
        return;
      } catch (e) {
        setFailed((prev) => prev + 1);
        return null;
      }
    });
    setValue(`constellations.${constellationIndex}.satellites`, newSats);
    if (failed > 0) {
      setError(`${failed} failed.`);
      return;
    }
    setError('');
    onClose();
  };

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
            maxWidth="25ch"
            flexWrap="wrap"
            gap={3}
          >
            <FormLabel my={0}>
              Edit
            </FormLabel>
            <Select variant="filled" value={constellationIndex} onChange={onSelectConstellation} width="20ch">
              {getValues('constellations').map(
                (constellation, index) => (
                  <option
                    key={`option-${constellation.id}`}
                    value={index}
                  >
                    {constellation.name}
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
        <ModalBody>
          <Tabs
            align="center"
            width="100%"
            display="flex"
            height="90%"
            overflow="hidden"
            flexDirection="column"
          >
            <TabList>
              <Tab>Orbit</Tab>
              <Tab>Power</Tab>
              <Tab>Duty</Tab>
            </TabList>
            <TabPanels>
              <TabPanel pt={5}>
                <ConstellationOrbitTab />
              </TabPanel>
              <TabPanel pt={10}>
                <PowerTab address={`constellations.${constellationIndex}.payload`} isConstellation />
              </TabPanel>
              <TabPanel pt={10}>
                <DutyTab address={`constellations.${constellationIndex}.payload`} isConstellation />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Center>
            <Text color="red">{error}</Text>
            <SPButton onClick={onGenerate}>
              Generate Constellation
            </SPButton>
          </Center>
        </ModalBody>
        <ModalFooter height="auto">
          <Button onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConstellationConfig;
