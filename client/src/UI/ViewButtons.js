/* eslint-disable react/prop-types */
import {
  Button, ButtonGroup, Flex, GridItem,
} from '@chakra-ui/react';
import { useStore } from '../Model/store';

function ViewButtons() {
  const setView = useStore((state) => state.setView);
  return (

    <GridItem
      area="views"
      // sx={{
      //   borderImageSlice: '1',
      //   borderWidth: '5px',
      //   borderImageSource: 'linear-gradient(to left, #743ad5, #d53a9d)',
      //   borderRadius: '5%',
      // }}
    >
      <Flex alignItems="center" justify="center" height="100%">
        <ButtonGroup onClick={setView}>
          <Button value="mission">
            Mission Planner
          </Button>
          <Button value="performance">
            Performance View
          </Button>
        </ButtonGroup>
      </Flex>
    </GridItem>

  );
}

export default ViewButtons;
