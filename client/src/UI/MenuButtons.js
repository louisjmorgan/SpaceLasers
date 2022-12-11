/* eslint-disable react/prop-types */
import {
  Button, ButtonGroup, Flex, GridItem,
} from '@chakra-ui/react';
import { useUIStore } from '../Model/store';

function MenuButtons() {
  const { isOpen, openMenu } = useUIStore((state) => ({
    openMenu: state.openMenu,
    isOpen: state.isOpen,
  }));
  return (
    <GridItem
      area="menu-buttons"
    >
      {isOpen.satellites
      || (
      <Flex alignItems="center" justify="center" height="100%">
        <ButtonGroup onClick={openMenu}>
          <Button value="satellites">
            Satellites
          </Button>
        </ButtonGroup>
      </Flex>
      )}
    </GridItem>

  );
}

export default MenuButtons;
