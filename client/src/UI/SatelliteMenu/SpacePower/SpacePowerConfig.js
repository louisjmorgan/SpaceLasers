/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import { useUIStore } from '../../../Model/store';
import CustomNumberInput from '../../Elements/CustomNumberInput';

function SpacePowerConfig({ index }) {
  const openMenu = useUIStore((state) => state.openMenu);

  const onConfig = () => {
    openMenu('spacePowerConfig');
  };

  return (
    <Flex
      direction="column"
      align="center"
      mb={5}
    >
      <CustomNumberInput
        name={`constellations[${index}].spacePowersCount`}
        label="Number of power satellites"
        min={0}
        max={10}
      />
      <Button m={3} leftIcon={<FaCog />} onClick={onConfig}>
        Configure
      </Button>
    </Flex>
  );
}

export default SpacePowerConfig;
