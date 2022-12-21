/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Box,
  Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast,
} from '@chakra-ui/react';
import { spawn, Thread, Worker } from 'threads';
import shallow from 'zustand/shallow';
import { useEffect, useRef } from 'react';
import {
  Controller, useFieldArray, useFormContext, useWatch,
} from 'react-hook-form';
import CustomNumberInput from '../../Elements/CustomNumberInput';
import { useUIStore } from '../../../Model/store';
import SPButton from '../../Elements/SPButton';

const offsetFields = [
  {
    id: 'inclination',
    step: 1,
    label: 'Inclination',
    min: 0,
    max: 36,
    units: '°',
  },
  {
    id: 'rightAscension',
    step: 0.01,
    label: 'Right Ascension',
    min: 0,
    max: 36,
    units: '°',
  },
  {
    id: 'eccentricity',
    step: 0.001,
    label: 'Eccentricity',
    min: 0,
    max: 0.5,
    units: '°',
  },
  {
    id: 'perigee',
    step: 0.001,
    label: 'Perigee',
    min: 0,
    max: 36,
    units: '°',
  },
  {
    id: 'meanAnomaly',
    step: 0.01,
    label: 'Mean Anomaly',
    min: 0,
    max: 36,
    units: '°',
  },
  {
    id: 'meanMotion',
    step: 0.01,
    label: 'Mean Motion',
    min: 0,
    max: 0.5,
    units: (
      <span>
        revs day
        <sup>-1</sup>
      </span>
    ),
  },
];

const optimizationFields = [
  {
    id: 'population',
    step: 10,
    label: 'Population',
    min: 10,
    max: 10000,
  },
  {
    id: 'generations',
    label: 'Generations',
    step: 1,
    min: 3,
    max: 100,
  },
  {
    id: 'threads',
    step: 1,
    label: 'Number of threads',
    min: 1,
    max: 16,
  },
];

function SpacePowerModal() {
  const {
    isOpen, closeMenu, constellationIndex, setOptimizing, isOptimizing,
  } = useUIStore((state) => ({
    isOpen: state.isOpen.spacePowerConfig,
    closeMenu: state.closeMenu,
    constellationIndex: state.constellationIndex,
    setOptimizing: state.setOptimizing,
    isOptimizing: state.isOptimizing,
  }), shallow);

  const toastIdRef = useRef();

  const toast = useToast({
    title: 'Optimization in progress...',
    variant: 'subtle',
    position: 'bottom-right',
    containerStyle: {
      maxWidth: '100%',
    },
    padding: '3rem',
    isClosable: false,
    duration: null,
  });

  useWatch(`constellations.${constellationIndex}.offsets`);
  const { getValues, setValue, control } = useFormContext();

  const {
    fields: indexFields,
  } = useFieldArray({
    control,
    name: `constellations.${constellationIndex}.spacePowerIndices`,
    keyName: 'key',
  });

  const onOptimize = async () => {
    setOptimizing(true);
    const worker = await spawn(new Worker(new URL('../../../Model/workers/optimizeWorker.js', import.meta.url)));
    const result = await worker.optimize({ constellations: [getValues(`constellations.${constellationIndex}`)] });
    Object.entries(result.offsets).forEach(([key, value]) => {
      setValue(`constellations.${constellationIndex}.offsets.${key}`, value);
    });
    setValue(`constellations.${constellationIndex}.spacePowerIndices`, result.indices);
    setOptimizing(false);
    toast.update(toastIdRef.current, { title: 'Optimization complete.', isClosable: true, duration: 9000 });
    await Thread.terminate(worker);
  };

  const onClose = () => {
    closeMenu('spacePowerConfig');
  };

  function addToast() {
    toastIdRef.current = toast();
  }

  useEffect(() => {
    if (isOptimizing && !isOpen) {
      addToast();
    } else if (isOpen) {
      toast.closeAll();
    }
  }, [isOpen, isOptimizing]);
  return isOpen && (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent
        bg="background.200"
        as={Flex}
        direction="column"
        my="5vh"
        align="center"
        height="90vh"
      >
        <ModalHeader
          align="center"
          fontSize="1.5rem"
          mt={10}
        >
          Configure Space Power
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          width="100%"
          as={Flex}
          align="center"
          direction="column"
          maxWidth="80ch"
          overflowY="auto"
          height="100%"
        >
          <Flex direction="column" align="center">
            <Box mb={5}>
              <CustomNumberInput
                name={`constellations.${constellationIndex}.spacePowersCount`}
                label="Number of power satellites"
                min={0}
                max={10}
              />
            </Box>
            <Tabs align="center">
              <TabList>
                <Tab>Orbital Offsets</Tab>
                <Tab>Offset From</Tab>
                <Tab>Optimization Parameters</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex justify="space-between" width={['50%', '50%', '90%', '90%']} direction="row" align="start" wrap="wrap">
                    {offsetFields.map((param) => (
                      <CustomNumberInput
                        key={param.id}
                        step={param.step}
                        name={`constellations.${constellationIndex}.offsets.${param.id}`}
                        units={param.units}
                        label={param.label}
                        min={param.min}
                        max={param.max}
                      />
                    ))}

                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex justify="space-between" width={['50%', '50%', '90%', '90%']} direction="row" align="start" wrap="wrap">
                    {indexFields.map((field, i) => (
                      <Controller
                        control={control}
                        key={field.key}
                        name={`constellations.${constellationIndex}.spacePowerIndices.${i}`}
                        render={({
                          field: {
                            onChange, onBlur, value, name, ref,
                          },
                          fieldState: { error },
                        }) => (
                          <FormControl py={4} isInvalid={!!error} id={`constellations.${constellationIndex}.spacePowerIndices.${i}`}>
                            <FormLabel>{`Space Power ${i + 1}`}</FormLabel>
                            <Select
                              ref={ref}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              name={name}
                            >
                              {getValues(`constellations.${constellationIndex}.satellites`).map((sat, index) => (
                                <option value={index} key={sat.id}>{sat.name}</option>
                              ))}
                            </Select>
                            <FormErrorMessage>{error && error.message}</FormErrorMessage>
                          </FormControl>
                        )}
                      />
                    ))}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex justify="space-between" width={['50%', '50%', '90%', '90%']} direction="row" align="start" wrap="wrap">
                    {optimizationFields.map((param) => (
                      <CustomNumberInput
                        key={param.id}
                        step={param.step}
                        name={`constellations.${constellationIndex}.optimization.${param.id}`}
                        units={param.units}
                        label={param.label}
                        min={param.min}
                        max={param.max}
                      />
                    ))}

                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Center m={10}>
            <SPButton onClick={onOptimize} type="button" width="30ch" disabled={isOptimizing} pointerEvents={isOptimizing && 'none'}>
              {isOptimizing
                ? (
                  <Flex justify="center" align="center" gap={5}>
                    Optimizing
                    <Spinner />
                  </Flex>
                )
                : 'Optimize'}
            </SPButton>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SpacePowerModal;
