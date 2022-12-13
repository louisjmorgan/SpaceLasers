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
import shallow from 'zustand/shallow';
import { useUIStore } from '../../Model/store';
import CustomIconButton from '../Elements/CustomIconButton';
import SatelliteList from './SatelliteList';

function ConstellationListItem({ formik, index, remove }) {
  const {
    satIndex, setSatIndex, setConstellationIndex, openMenu, isOpen, setEditing, isEditing,
  } = useUIStore((state) => ({
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    setConstellationIndex: state.setConstellationIndex,
    openMenu: state.openMenu,
    isOpen: state.isOpen,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
  }), shallow);

  const onRemove = (e) => {
    e.stopPropagation();
    if (index === satIndex) {
      setSatIndex(
        () => (index > 0 ? index - 1 : 0),
      );
    } else if (index < satIndex) {
      setSatIndex((prev) => prev - 1);
    }
    remove(index);
  };

  const onCog = (e) => {
    e.stopPropagation();
    if (!isEditing) setEditing(true);
    setSatIndex(index);
    setConstellationIndex(index);
    openMenu('constellationConfig');
  };
  return (
    <AccordionItem>
      <AccordionButton
        variant="ghost"
        textTransform="uppercase"
        fontSize="1.25rem"
        fontWeight="bold"
        p={1}
      >
        <Flex justify="space-between" width="100%" gap={5} align="center">
          <Flex justify="space-between" align="space-between" flexBasis="100%" width="100%">
            <Text mr={5}>
              {formik.values.constellations[index].name}
            </Text>
            <Text>
              {`(${formik.values.constellations[index].satellites.length})`}
            </Text>
          </Flex>
          {isEditing ? (
            <Flex flexBasis="auto">
              <CustomIconButton
                className="secondary"
                onClick={onRemove}
                icon={<FaTrash />}
                label="remove"
              />
              <CustomIconButton
                icon={<FaCog />}
                onClick={onCog}
                isActive={(index === satIndex) && isOpen.satelliteConfig}
                value="satelliteConfig"
              />
            </Flex>
          ) : (
            <>
              {/* <CustomIconButton
                icon={<FaTag />}
                onClick={onLabel}
                isActive={satelliteOptions.get(satellite.id).showLabel}
                label="toggle label"
              /> */}
              {/* <CustomIconButton
                icon={<FaEyeSlash />}
                onClick={onEye}
                isActive={!satelliteOptions.get(satellite.id).isVisible}
                label="toggle visibility"
              /> */}
            </>
          )}

        </Flex>
      </AccordionButton>
      <AccordionPanel p={0}>
        <SatelliteList formik={formik} constellation={index} />
      </AccordionPanel>
    </AccordionItem>
  );
}

export default ConstellationListItem;
