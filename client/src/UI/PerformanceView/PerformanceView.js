/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Center, GridItem } from '@chakra-ui/react';
import React from 'react';
import shallow from 'zustand/shallow';
import { isMobile } from 'react-device-detect';
import ChartEditor from './ChartEditor';
import Summary from './Summary';

function PerformanceView() {
  return (
    <>
      {/* <GridItem area="performance"> */}
      {isMobile
        ? <Center p={10}>Charts are not currently availabe on mobile</Center>
        : <ChartEditor />}
      {/* </GridItem> */}
      {/* <GridItem area="summary"> */}
      {/* <Summary /> */}
      {/* </GridItem> */}
    </>
  );
}

export default PerformanceView;
