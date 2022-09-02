/* eslint-disable react/prop-types */
import { GridItem } from '@chakra-ui/react';
import ChartEditor from './ChartEditor';

function PerformanceView({ shouldDisplay }) {
  return (
    shouldDisplay
      ? (
        <>
          <GridItem area="performance">
            <ChartEditor />
          </GridItem>
          <GridItem area="summary" />
        </>
      ) : ''
  );
}

export default PerformanceView;
