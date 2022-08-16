/* eslint-disable react/prop-types */
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import CustomNumberInput from './CustomNumberInput';

const fields = [
  {
    id: 'powerSats',
    step: 1,
    label: 'Number of Space Power Satellites',
    min: 0,
    max: 10,
  },
  {
    id: 'inclinationOffset',
    step: 1,
    label: 'Inclination Offset',
    min: -180,
    max: 180,
    units: '°',
  },
];

function ConfigModal({ formik }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <SettingsIcon mx={2} />
        Power
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="background.100">
          <ModalHeader>Configure Space Power</ModalHeader>
          <ModalCloseButton />
          <ModalBody />
          {fields.map((param) => (
            <CustomNumberInput
              value={formik.values[`${param.id}`]}
              key={param.id}
              step={param.step}
              name={`${param.id}`}
              units={param.units}
              formik={formik}
              label={param.label}
              min={param.min}
              max={param.max}
            />
          ))}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfigModal;
