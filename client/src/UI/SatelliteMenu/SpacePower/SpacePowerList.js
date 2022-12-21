/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Flex, List, Text } from '@chakra-ui/layout';
import { AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FaEyeSlash, FaTag } from 'react-icons/fa';
import { useDebouncyFn } from 'use-debouncy';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../../Model/store';
import ColorPicker from '../../Elements/ColorPicker';
import CustomIconButton from '../../Elements/CustomIconButton';
import SpacePowerConfig from './SpacePowerConfig';
import SpacePowerListItem from './SpacePowerListItem';

function SpacePowerList({ index, constellation }) {
  const { isEditing } = useUIStore((state) => ({
    isEditing: state.isEditing,
  }), shallow);
  const {
    constellationOptions, toggleSpacePowerLabels, toggleSpacePowerVisibility, changeSpacePowerColor,
  } = useSimStore((state) => ({
    constellationOptions: state.constellationOptions.get(constellation && constellation.id),
    toggleSpacePowerLabels: state.toggleSpacePowerLabels,
    toggleSpacePowerVisibility: state.toggleSpacePowerVisibility,
    changeSpacePowerColor: state.changeSpacePowerColor,
  }), shallow);

  const onLabel = () => {
    toggleSpacePowerLabels(constellation.id);
  };

  const onEye = () => {
    toggleSpacePowerVisibility(constellation.id);
  };
  const { setValue, getValues } = useFormContext();

  const onChangeColor = useDebouncyFn(
    (c) => {
      setValue(`constellations.${index}.spacePowerColor`, c);
      if (constellationOptions) changeSpacePowerColor(constellation.id, c);
    },
    400, // number of milliseconds to delay
  );

  useWatch(`constellations.${index}.spacePowerColor`);
  return (
    <AccordionItem position="relative" m={0}>
      <Flex
        justify="space-between"
        width="100%"
        gap={5}
        align="center"
        p={1}
        m={0}
      >
        <AccordionButton
          variant="ghost"
          textTransform="uppercase"
          fontSize="1.25rem"
          fontWeight="bold"
          flexBasis="100%"
        >
          <Flex justify="space-between" align="space-between" width="100%">
            <Text mr={5}>
              {getValues(`constellations.${index}.name`)}
            </Text>
            <Text>
              {`(${getValues(`constellations.${index}.spacePowersCount`)})`}
            </Text>
          </Flex>
        </AccordionButton>
        <Flex flexBasis="auto">
          <ColorPicker
            id={getValues(`constellations.${index}.id`)}
            onChange={onChangeColor}
            color={getValues(`constellations.${index}.spacePowerColor`)}
          />
          {isEditing ? '' : (
            <>
              <CustomIconButton
                icon={<FaTag />}
                onClick={onLabel}
                isActive={constellationOptions.showSpacePowerLabels}
                label="toggle label"
              />
              <CustomIconButton
                icon={<FaEyeSlash />}
                onClick={onEye}
                isActive={!constellationOptions.isSpacePowerVisible}
                label="toggle visibility"
              />
            </>
          )}
        </Flex>
      </Flex>
      <AccordionPanel p={0}>
        {isEditing ? <SpacePowerConfig index={index} />
          : (
            <List width="100%" maxHeight="60vh" overflowY="auto" margin="auto">
              {constellation.spacePowers.map((id, i) => (
                <SpacePowerListItem
                  satellite={id}
                  index={i}
                  isPayload={false}
                  key={id}
                />
              ))}
            </List>
          )}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default SpacePowerList;
