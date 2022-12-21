/* eslint-disable react/prop-types */
import {
  Button, Flex, GridItem, Show,
} from '@chakra-ui/react';
import {
  // FaRocket,
  FaSatellite,
} from 'react-icons/fa';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../Model/store';

function MenuButtons() {
  const { isOpen, openMenu } = useUIStore((state) => ({
    openMenu: state.openMenu,
    isOpen: state.isOpen,
  }), shallow);

  const isInitialized = useSimStore((state) => state.isInitialized);
  const onSatellites = () => {
    openMenu('satellites');
  };

  // const onMission = () => {
  //   openMenu('mission');
  // };

  return (
    <GridItem
      area="menu-buttons"
    >
      {isOpen.satellites
      || (
      <Flex alignItems="center" justify="center" height="100%" gap={3}>
        <Button
          id="satellites"
          onClick={onSatellites}
          disabled={!isInitialized}
        >
          <Flex align="center" gap={2}>

            <Show above="md">
              Satellites
            </Show>
            <FaSatellite />
          </Flex>
        </Button>
        {/* <Button
          id="mission"
          onClick={onMission}
        >
          <Flex align="center" gap={2}>
            <Show above="md">
              Create a Mission
            </Show>
            <FaRocket />
          </Flex>
        </Button> */}
      </Flex>
      )}
    </GridItem>

  );
}

export default MenuButtons;
