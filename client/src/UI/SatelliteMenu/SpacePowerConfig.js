/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import { useUIStore } from '../../Model/store';
import CustomNumberInput from '../Elements/CustomNumberInput';
import SpacePowerModal from './SpacePowerModal';

function SpacePowerConfig({ formik }) {
  const openMenu = useUIStore((state) => state.openMenu);

  const onConfig = (e) => {
    openMenu(e.target.value);
  };

  return (
    <Flex
      direction="column"
      align="center"
      mb={5}
    >
      <CustomNumberInput
        value={formik.values.spacePowers}
        name="spacePowers"
        formik={formik}
        label="Number of power satellites"
        min={0}
        max={10}
      />
      <Button m={3} leftIcon={<FaCog />} onClick={onConfig} value="spacePowerConfig">
        Configure
      </Button>
      <SpacePowerModal formik={formik} />
    </Flex>
  );
}

export default SpacePowerConfig;
