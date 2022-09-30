/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Center, GridItem } from '@chakra-ui/react';
import React from 'react';
import shallow from 'zustand/shallow';
import { isMobile } from 'react-device-detect';
import { useStore } from '../../Model/store';
import ChartEditor from './ChartEditor';
import Summary from './Summary';

function PerformanceView() {
  const { view } = useStore(
    (state) => ({
      view: state.view,
    }),
    shallow,
  );
  return (
    <>
      <GridItem area="performance" transform={view.name === 'performance' ? '' : 'translate(-9999px, 0)'} position={view.name === 'performance' ? '' : 'absolute'}>
        {isMobile
          ? <Center p={10}>Charts are not currently availabe on mobile</Center>
          : <ChartEditor />}
      </GridItem>
      <GridItem area="summary" transform={view.name === 'performance' ? '' : 'translate(-9999px, 0)'} position={view.name === 'performance' ? '' : 'absolute'}>
        <Summary />
      </GridItem>
    </>
  );
}

export default React.memo(PerformanceView);
