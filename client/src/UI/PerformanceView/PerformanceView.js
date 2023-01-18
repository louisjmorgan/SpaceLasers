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
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        variant="permanent"
        size={['full', 'full', 'xl', 'xl']}
        // size="sm"
        px={0}
      >
        <DrawerContent background="background.100" p={[2, 2, 5]}>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <ChartEditor />
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PerformanceView;
