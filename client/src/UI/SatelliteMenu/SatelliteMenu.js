/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Center, Flex, Text,
} from '@chakra-ui/layout';
import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader,
} from '@chakra-ui/modal';
import {
  Spinner,
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../Model/store';
import { defaultValues } from '../../Util/defaultInputs';
import SPButton from '../Elements/SPButton';
import ConstellationList from './ConstellationList';
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

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="md"
      variant="permanent"
    >
      <DrawerContent bg={['background.300', 'background.300', 'background.100']} py={10}>
        <DrawerCloseButton zIndex={3} />
        <DrawerHeader as="h2" textAlign="center" fontSize="2rem" textTransform="uppercase">Satellites</DrawerHeader>
        <DrawerBody>
          <Tabs align="center">
            <TabList>
              <Tab>Payload</Tab>
              <Tab>Space Power</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ConstellationList formik={formik} />
              </TabPanel>
              <TabPanel>
                <Flex direction="column" align="center" m={3}>
                  {isEditing ? <SpacePowerConfig formik={formik} /> : <SpacePowerList />}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Center mt={10}>
            {
              isEditing ? (
                <Flex align="center" direction="column" gap={5}>
                  <SPButton
                    onClick={onUpdate}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
                      <Flex justify="center" align="center" gap={5}>
                        Updating
                        <Spinner />
                      </Flex>
                    ) : 'Save and Update'}

                  </SPButton>
                  {formik.isSubmitting
                    ? ''
                    : <SPButton onClick={onDiscard}>Discard Changes</SPButton>}
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
      </DrawerContent>
    </Drawer>
  );
}

export default SatelliteMenu;
