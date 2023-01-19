/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import shallow from 'zustand/shallow';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import ChartEditor from './ChartEditor';
import { useUIStore } from '../../Model/store';

function PerformanceView() {
  const { isOpen, closeMenu, openMenu } = useUIStore((state) => ({
    isOpen: state.isOpen.performance,
    closeMenu: state.closeMenu,
    openMenu: state.openMenu,
  }), shallow);

  const onClose = () => {
    closeMenu('performance');
    openMenu('HUD');
  };
  console.log(isOpen);
  return isOpen && (
  <Drawer
    isOpen={isOpen}
    placement="left"
    onClose={onClose}
    variant="permanent"
    size={['full', 'full', 'xl', 'xl']}
    px={0}
  >
    <DrawerContent background="background.100" p={[2, 2, 5]}>
      <DrawerCloseButton />
      <DrawerBody p={0}>
        <ChartEditor />
      </DrawerBody>

    </DrawerContent>
  </Drawer>
  );
}

export default PerformanceView;
