/* eslint-disable react/prop-types */
import {
  Button, ButtonGroup, Center, GridItem,
} from '@chakra-ui/react';

function ViewButtons({ handleView }) {
  return (

    <GridItem area="views">
      <Center>
        <ButtonGroup onClick={(e) => handleView(e.target.value)}>
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
