/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Box,
  Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useToast,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import CustomNumberInput from '../../Elements/CustomNumberInput';
import { useUIStore } from '../../../Model/store';
import SPButton from '../../Elements/SPButton';

const fields = [
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
  const { getValues, setValue } = useFormContext();

  const onOptimize = async () => {
    setOptimizing(true);
    const worker = new Worker(new URL('../../../Model/workers/optimizeWorker.js', import.meta.url), { type: module });
    worker.postMessage({ req: { constellations: [getValues(`constellations.${constellationIndex}`)] } });
    worker.onmessage = (e) => {
      const { result } = e.data;
      Object.entries(result.offsets).forEach(([key, value]) => {
        setValue(`constellations.${constellationIndex}.offsets.${key}`, value);
      });
      setValue(`constellations.${constellationIndex}.spacePowerIndices`, result.indices);
      setOptimizing(false);
      toast.update(toastIdRef.current, { title: 'Optimization complete.', isClosable: true, duration: 9000 });
      worker.terminate();
    };
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

          <Flex direction="column" width={['50%', '50%', '90%', '90%']} maxWidth="60ch" align="center">
            <Box width="100%">
              <CustomNumberInput
                name={`constellations.${constellationIndex}.spacePowersCount`}
                label="Number of power satellites"
                min={0}
                max={10}
              />
            </Box>
            <Text as="h3" textAlign="left" fontSize="1.25rem" width="100%" p={5}>Offsets</Text>
            <Flex justify="space-between" direction="row" align="start" wrap="wrap">
              {fields.map((param) => (
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
          </Flex>
          <Center m={10}>
            <SPButton onClick={onOptimize} type="button" disabled={isOptimizing} pointerEvents={isOptimizing && 'none'}>
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
