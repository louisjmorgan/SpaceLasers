/* eslint-disable react/prop-types */
import {
  Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Spinner, Text,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useEffect, useState } from 'react';
import CustomNumberInput from '../../Elements/CustomNumberInput';
import optimizeSpacePower from '../../../Model/optimizer';
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
    min: -0.1,
    max: 0.1,
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

function SpacePowerModal({ formik }) {
  const { isOpen, closeMenu, constellationIndex } = useUIStore((state) => ({
    isOpen: state.isOpen.spacePowerConfig,
    closeMenu: state.closeMenu,
    constellationIndex: state.constellationIndex,
  }), shallow);

  const [isSubmitting, setSubmitting] = useState(false);
  const onOptimize = () => {
    setSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      optimizeSpacePower(formik.values).then((result) => {
        Object.entries(result).forEach(([key, value]) => {
          formik.setFieldValue(`constellations[${constellationIndex}].offsets[${key}]`, value);
        });
      });

      setSubmitting(false);
    }
  }, [isSubmitting]);

  const onClose = () => {
    closeMenu('spacePowerConfig');
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="background.200" width="80vw">
        <ModalHeader align="center" fontSize="1.5rem">Configure Space Power</ModalHeader>
        <ModalCloseButton />
        <ModalBody width="100%">
          <Center>
            <CustomNumberInput
              value={formik.values.constellations[constellationIndex].spacePowersCount}
              name={`constellations[${constellationIndex}].spacePowersCount`}
              formik={formik}
              label="Number of power satellites"
              min={0}
              max={10}
            />
          </Center>
          <Text as="h3" textAlign="center" fontSize="1.25rem">Offsets</Text>
          <Flex justify="center" direction="row" wrap="wrap" width="100%">
            {fields.map((param) => (
              <CustomNumberInput
                value={formik.values.constellations[constellationIndex].offsets[`${param.id}`]}
                key={param.id}
                step={param.step}
                name={`constellations[${constellationIndex}].offsets[${param.id}]`}
                units={param.units}
                formik={formik}
                label={param.label}
                min={param.min}
                max={param.max}
              />
            ))}

          </Flex>
          <Center m={10}>
            <SPButton onClick={onOptimize} isDisabled={isSubmitting}>
              {isSubmitting
                ? (
                  <Flex justify="center" align="center" gap={5}>
                    Optimizing
                    <Spinner />
                  </Flex>
                ) : 'Optimize'}
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
