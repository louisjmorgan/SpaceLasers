/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FaCog } from 'react-icons/fa';
import { useUIStore } from '../../../Model/store';
import CustomNumberInput from '../../Elements/CustomNumberInput';

function SpacePowerConfig({ index }) {
  const openMenu = useUIStore((state) => state.openMenu);

  const onConfig = () => {
    openMenu('spacePowerConfig');
  };
  const { setValue, getValues } = useFormContext();
  const onChangeNumber = () => {
    const prev = getValues(`constellations.${index}.spacePowerIndices`);
    setValue(`constellations.${index}.spacePowerIndices`, [...prev, 0]);
  };

  useWatch(`constellations.${index}`);
  return (
    <Flex
      direction="column"
      align="center"
      mb={5}
    >
      <CustomNumberInput
        name={`constellations.${index}.spacePowersCount`}
        label="Number of power satellites"
        min={0}
        max={10}
        sideEffect={onChangeNumber}
      />
      <Button m={3} leftIcon={<FaCog />} onClick={onConfig}>
        Configure
      </Button>
    </Flex>
  );
}

export default SpacePowerConfig;
