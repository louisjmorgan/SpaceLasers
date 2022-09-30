import { Button, GridItem } from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useStore } from '../Model/store';

function ReturnButton() {
  const {
    setView,
  } = useStore(
    (state) => ({
      setView: state.setView,
    }),
    shallow,
  );
  return (
    <GridItem area="3 / 2 / span 1 / span 1">
      <Button
        value="simulation"
        onClick={setView}
        position="absolute"
        right={0}
        bottom={0}
      >
        Return
      </Button>
    </GridItem>
  );
}

export default ReturnButton;
