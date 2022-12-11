/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Button, ButtonGroup } from '@chakra-ui/button';
import { Center, Flex, Text } from '@chakra-ui/layout';
import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay,
} from '@chakra-ui/modal';
import { useState } from 'react';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../Model/store';
import { defaultValues } from '../../Util/defaultInputs';
import SPButton from '../Elements/SPButton';
import SatelliteList from './SatelliteList';

function SatelliteMenu({ formik }) {
  const {
    isOpen, closeMenu, isEditing, setEditing,
  } = useUIStore((state) => ({
    isOpen: state.isOpen.satellites,
    closeMenu: state.closeMenu,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
  }), shallow);

  const onClose = () => {
    closeMenu('satellites');
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
    setEditing(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="md"
    >
      <DrawerContent bg="background.100" py={10}>
        <DrawerCloseButton />
        <DrawerHeader textAlign="center" textTransform="uppercase">Satellites</DrawerHeader>

        <DrawerBody>
          <SatelliteList formik={formik} />
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
