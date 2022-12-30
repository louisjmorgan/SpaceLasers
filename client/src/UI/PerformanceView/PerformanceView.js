/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Button, Center, GridItem, useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import shallow from 'zustand/shallow';
import { isMobile } from 'react-device-detect';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import ChartEditor from './ChartEditor';
import Summary from './Summary';

function PerformanceView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent background="background.100">
          <DrawerCloseButton />
          <DrawerHeader>Charts</DrawerHeader>

          <DrawerBody>
            <ChartEditor />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PerformanceView;
