/* eslint-disable react/prop-types */
import {
  Flex, Text,
} from '@chakra-ui/layout';
import {
  AccordionButton, AccordionItem, AccordionPanel,
} from '@chakra-ui/react';
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
  constellation, formik, index, remove,
}) {
  const {
    satIndex, setSatIndex, setConstellationIndex, openMenu, isOpen,
    setEditing, isEditing,
  } = useUIStore((state) => ({
    satIndex: state.satIndex,
    setConstellationIndex: state.setConstellationIndex,
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
    if (index === satIndex) {
      setSatIndex(
        () => (index > 0 ? index - 1 : 0),
      );
    } else if (index < satIndex) {
      setSatIndex((prev) => prev - 1);
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

  const onChangeColor = useDebouncyFn(
    (c) => {
      formik.setFieldValue(`constellations[${index}].color`, c);
      formik.values.constellations[index].satellites.forEach((satellite, i) => {
        formik.setFieldValue(`constellations[${index}].satellites[${i}].color`, c);
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
              {formik.values.constellations[index].name}
            </Text>
            <Text>
              {`(${formik.values.constellations[index].satellites.length})`}
            </Text>
          </Flex>
        </AccordionButton>
        <Flex flexBasis="auto">
          <ColorPicker
            id={constellation.id}
            onChange={onChangeColor}
            color={formik.values.constellations[index].color}
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
        <SatelliteList formik={formik} constellation={index} />
      </AccordionPanel>
    </AccordionItem>
  );
}

export default ConstellationListItem;
