/* eslint-disable react/prop-types */
import {
  Flex, Text,
} from '@chakra-ui/layout';
import {
  AccordionButton, AccordionItem, AccordionPanel,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import {
  FaCog, FaEyeSlash, FaTag, FaTrash,
} from 'react-icons/fa';
import { useDebouncyFn } from 'use-debouncy';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../../Model/store';
import ColorPicker from '../../Elements/ColorPicker';
import CustomIconButton from '../../Elements/CustomIconButton';
import SatelliteList from './SatelliteList';

function ConstellationListItem({
  constellation, index, remove,
}) {
  const {
    satIndex, setSatIndex, constellationIndex, setConstellationIndex,
    openMenu, isOpen, setEditing, isEditing,
  } = useUIStore((state) => ({
    satIndex: state.satIndex,
    setConstellationIndex: state.setConstellationIndex,
    constellationIndex: state.constellationIndex,
    setSatIndex: state.setSatIndex,
    openMenu: state.openMenu,
    isOpen: state.isOpen,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
  }), shallow);

  const {
    constellationOptions, toggleConstellationLabels, toggleConstellationVisibility,
    changeConstellationColor,
  } = useSimStore((state) => ({
    constellationOptions: state.constellationOptions.get(constellation.id),
    toggleConstellationLabels: state.toggleConstellationLabels,
    toggleConstellationVisibility: state.toggleConstellationVisibility,
    changeConstellationColor: state.changeConstellationColor,
  }));
  const onRemove = () => {
    if (index === constellationIndex) {
      setConstellationIndex(
        () => (index > 0 ? index - 1 : 0),
      );
    } else if (index < constellationIndex) {
      setConstellationIndex((prev) => prev - 1);
    }
    remove(index);
  };

  const onCog = () => {
    if (!isEditing) setEditing(true);
    setSatIndex(index);
    setConstellationIndex(index);
    openMenu('constellationConfig');
  };

  const onLabel = () => {
    toggleConstellationLabels(constellation.id);
  };

  const onEye = () => {
    toggleConstellationVisibility(constellation.id);
  };

  const { setValue, getValues } = useFormContext();

  const onChangeColor = useDebouncyFn(
    (c) => {
      setValue(`constellations.${index}.color`, c);
      getValues(`constellations.${index}.satellites`).forEach((satellite, i) => {
        setValue(`constellations.${index}.satellites.${i}.color`, c);
      });
      if (constellationOptions) changeConstellationColor(constellation.id, c);
    },
    400, // number of milliseconds to delay
  );
  return (
    <AccordionItem position="relative">
      <Flex
        justify="space-between"
        width="100%"
        gap={5}
        align="center"
        p={1}
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
              {`(${getValues(`constellations.${index}.satellites.length`)})`}
            </Text>
          </Flex>
        </AccordionButton>
        <Flex flexBasis="auto">
          <ColorPicker
            id={constellation.id}
            onChange={onChangeColor}
            color={getValues(`constellations.${index}.color`)}
          />
          {isEditing ? (
            <>
              <CustomIconButton
                className="secondary"
                onClick={onRemove}
                icon={<FaTrash />}
                label="remove"
              />
              <CustomIconButton
                icon={<FaCog />}
                onClick={onCog}
                isActive={(index === satIndex) && isOpen.constellationConfig}
              />
            </>
          ) : (
            <>
              <CustomIconButton
                icon={<FaTag />}
                onClick={onLabel}
                isActive={constellationOptions.showLabel}
                label="toggle label"
              />
              <CustomIconButton
                icon={<FaEyeSlash />}
                onClick={onEye}
                isActive={!constellationOptions.isVisible}
                label="toggle visibility"
              />
            </>
          )}
        </Flex>
      </Flex>
      <AccordionPanel p={0}>
        <SatelliteList constellation={index} />
      </AccordionPanel>
    </AccordionItem>
  );
}

export default ConstellationListItem;
