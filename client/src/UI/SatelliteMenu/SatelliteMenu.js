/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Center, Flex, VStack,
} from '@chakra-ui/layout';
import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader,
} from '@chakra-ui/modal';
import {
  FormLabel,
  Input,
  Spinner,
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../Model/store';
import { defaultValues } from '../../Util/defaultInputs';
import SPButton from '../Elements/SPButton';
import ConstellationList from './Payload/ConstellationList';
import SpacePowerConstellations from './SpacePower/SpacePowerConstellations';

function SatelliteMenu() {
  const {
    isOpen, openMenu, closeMenu, isEditing, setEditing,
  } = useUIStore((state) => ({
    isOpen: state.isOpen.satellites,
    openMenu: state.openMenu,
    closeMenu: state.closeMenu,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
  }), shallow);

  const isInitialized = useSimStore((state) => state.isInitialized);

  const onClose = () => {
    closeMenu('satellites');
    openMenu('HUD');
  };

  const {
    getValues,
    reset,
  } = useFormContext();

  // const onUpdate = () => {
  //   handleSubmit();
  // };

  const [previousValues, setPrevious] = useState(defaultValues);
  const onEdit = () => {
    setPrevious(() => structuredClone(getValues()));
    setEditing(true);
  };

  const onDiscard = () => {
    reset(previousValues);
    setEditing(false);
  };

  const onLoad = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (event) => {
      reset(JSON.parse(event.target.result));
      e.target.value = null;
    };
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
                <ConstellationList />
              </TabPanel>
              <TabPanel>
                <Flex direction="column" align="center">
                  <SpacePowerConstellations />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Center mt={10}>
            {isEditing ? (
              <Flex align="center" direction="column" gap={5}>
                <SPButton
                  onClick={() => null}
                  disabled={!isInitialized}
                  type="submit"
                  form="sim-form"
                  width="30ch"
                >
                  {!isInitialized ? (
                    <Flex justify="center" align="center" gap={5}>
                      Updating
                      <Spinner />
                    </Flex>
                  ) : 'Save and Update'}

                </SPButton>
                {!isInitialized
                  ? ''
                  : (
                    <SPButton
                      as={FormLabel}
                      htmlFor="file-upload"
                      width="30ch"
                    >
                      Import
                      <Input
                        id="file-upload"
                        type="file"
                        display="none"
                        accept="application/JSON"
                        onChange={onLoad}
                      />
                    </SPButton>
                  )}
                {!isInitialized
                  ? ''
                  : (
                    <SPButton
                      type="reset"
                      onClick={onDiscard}
                      width="30ch"
                    >
                      Discard Changes
                    </SPButton>
                  )}

              </Flex>
            ) : (
              <VStack gap={5}>
                <SPButton
                  onClick={onEdit}
                  width="30ch"
                >
                  Edit
                </SPButton>
                <SPButton
                  as="a"
                  type="button"
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(getValues()),
                  )}`}
                  download="filename.json"
                  width="30ch"
                >
                  Export
                </SPButton>
              </VStack>
            )}
          </Center>
          <Center>
            {/* <Text color="red" width="50%" align="center">{errors}</Text> */}
          </Center>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default SatelliteMenu;
