/* eslint-disable react/prop-types */
import {
  Button, ButtonGroup, Center, GridItem,
} from '@chakra-ui/react';
import { useStore } from 'Model/store';

function ViewButtons() {
  const setView = useStore((state) => state.setView);
  return (

    <GridItem area="views">
      <Center>
        <ButtonGroup onClick={(e) => setView(e.target.value)}>
          <Button value="mission">
            Mission Planner
          </Button>
          <Button value="performance">
            Performance View
          </Button>
        </ButtonGroup>
      </Center>
    </GridItem>

  );
}

export default ViewButtons;
