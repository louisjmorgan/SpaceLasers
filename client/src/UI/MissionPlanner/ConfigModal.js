/* eslint-disable react/prop-types */
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import CustomNumberInput from '../Elements/CustomNumberInput';
import optimizeSpacePower from '../../Model/optimizer';

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

function ConfigModal({ formik }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOptimize = async () => {
    const result = await optimizeSpacePower(formik.values);
    console.log(result);
    Object.entries(result).forEach(([key, value]) => {
      formik.setFieldValue(`offsets[${key}]`, value);
    });
  };
  return (
    <>
      <Button onClick={onOpen}>
        <SettingsIcon mx={2} />
        Power
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="background.100" width="80vw">
          <ModalHeader align="center">Configure Space Power</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="100%">
            <Center>
              <CustomNumberInput
                value={formik.values.spacePowers}
                name="spacePowers"
                formik={formik}
                label="Number of power satellites"
                min={0}
                max={10}
              />
            </Center>
            <h3>Offsets</h3>
            <Flex justify="center" direction="row" wrap="wrap" width="100%">
              {fields.map((param) => (
                <CustomNumberInput
                  value={formik.values.offsets[`${param.id}`]}
                  key={param.id}
                  step={param.step}
                  name={`offsets[${param.id}]`}
                  units={param.units}
                  formik={formik}
                  label={param.label}
                  min={param.min}
                  max={param.max}
                />
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onOptimize}>
              Optimize
            </Button>
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
