/* eslint-disable react/prop-types */
import { GridItem } from '@chakra-ui/react';
import Charts from './Charts';

function PerformanceView({ shouldDisplay }) {
  return (
    shouldDisplay
      ? (
        <>
          <GridItem area="performance"><Charts /></GridItem>
          <GridItem area="summary">Summary</GridItem>
        </>
      ) : ''
  );
}

export default PerformanceView;
