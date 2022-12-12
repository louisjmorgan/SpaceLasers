/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Center, Flex, Text } from '@chakra-ui/layout';
import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../Model/store';
import { defaultValues } from '../../Util/defaultInputs';
import SPButton from '../Elements/SPButton';
import SatelliteList from './SatelliteList';
import SpacePowerConfig from './SpacePowerConfig';
import SpacePowerList from './SpacePowerList';

function SatelliteMenu({ formik }) {
  const {
    isOpen, openMenu, closeMenu, isEditing, setEditing,
  } = useUIStore((state) => ({
    isOpen: state.isOpen.satellites,
    openMenu: state.openMenu,
    closeMenu: state.closeMenu,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
  }), shallow);

  const onClose = () => {
    closeMenu('satellites');
    openMenu('HUD');
  };

  const [previousValues, setPrevious] = useState(defaultValues);

  const onEdit = () => {
    setEditing(true);
    setPrevious(formik.values);
  };

  const onDiscard = () => {
    formik.setValues(previousValues);
    setEditing(false);
  };

  const onUpdate = () => {
    formik.handleSubmit();
  };

  const [showSatellites, setShowSatellites] = useState({
    payload: true,
    spacePower: true,
  });

  const onShowSatellites = (e) => {
    console.log(e);
    setShowSatellites((prev) => ({
      ...prev,
      [`${e.target.id}`]: !prev[e.target.id],
    }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="md"
      variant="permanent"
    >
      <DrawerContent bg={['background.300', 'background.300', 'background.100']} py={10}>
        <DrawerCloseButton />
        <DrawerHeader as="h2" textAlign="center" fontSize="2rem" textTransform="uppercase">Satellites</DrawerHeader>
        <DrawerBody>
          <Center m={3}>
            <Button
              rightIcon={(
                <ChevronDownIcon
                  transform={showSatellites.payload ? '' : 'rotate(-90deg)'}
                  transition="transform 0.1s ease-out"
                  pointerEvents="none"
                />
              )}
              pointerEvents="all"
              id="payload"
              variant="ghost"
              textTransform="uppercase"
              onClick={onShowSatellites}
              fontSize="1.25rem"
            >
              Payload
              {` (${formik.values.satellites.length})`}
            </Button>
          </Center>
          {showSatellites.payload ? <SatelliteList formik={formik} /> : '' }
          <Center m={3} mt={10}>
            <Button
              rightIcon={(
                <ChevronDownIcon
                  transform={showSatellites.spacePower ? '' : 'rotate(-90deg)'}
                  transition="transform 0.1s ease-out"
                />
              )}
              id="spacePower"
              variant="ghost"
              onClick={onShowSatellites}
              textTransform="uppercase"
              fontSize="1.25rem"
            >
              Space Power
              {` (${formik.values.spacePowers})`}
            </Button>
          </Center>
          {showSatellites.spacePower
            ? (isEditing ? <SpacePowerConfig formik={formik} /> : <SpacePowerList />)
            : ''}
          <Center mt={10}>
            {
          isEditing ? (
            <Flex align="center" direction="column" gap={5}>
              <SPButton onClick={onUpdate}>Save and Update</SPButton>
              <SPButton onClick={onDiscard}>Discard Changes</SPButton>
            </Flex>
          )
            : (
              <SPButton onClick={onEdit}>
                Edit
              </SPButton>
            )
          }
          </Center>
          <Center>
            <Text color="red" width="50%" align="center">{formik.status}</Text>
          </Center>
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}

export default SatelliteMenu;
