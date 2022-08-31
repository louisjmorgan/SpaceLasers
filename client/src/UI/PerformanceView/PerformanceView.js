/* eslint-disable react/prop-types */
import { GridItem, VStack } from '@chakra-ui/react';
import Charts from './Charts';
import SatelliteList from './SatelliteList';

function PerformanceView({ shouldDisplay }) {
  return (
    shouldDisplay
      ? (
        <>
          <GridItem area="performance">
            <Charts />
          </GridItem>
          <GridItem area="summary" />
        </>
      ) : ''
  );
}

export default PerformanceView;
