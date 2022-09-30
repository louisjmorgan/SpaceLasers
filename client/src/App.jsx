/* eslint-disable react/jsx-curly-brace-presence */
import {
  Center,
  ChakraProvider,
  Grid, GridItem, Spinner, Button, Flex, Text,
} from '@chakra-ui/react';
import {
  useState, useEffect, useRef, useCallback, Suspense,
  useTransition,
  useMemo,
  useLayoutEffect,
} from 'react';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/azeret-mono';
import shallow from 'zustand/shallow';
import PerformanceView from 'UI/PerformanceView/PerformanceView';
import { useGLTF } from '@react-three/drei';
import Controls from './UI/Controls';
import { useStore } from './Model/store';
import { defaultValues } from './UI/MissionPlanner/defaultInputs';
import { MissionPlanner, HUD } from './UI';
import theme from './theme';
import ViewButtons from './UI/ViewButtons';
import Simulation from './Simulation/Simulation';
import SatelliteGLB from './Assets/Mesh/lowpolysat.glb';
import ReturnButton from './UI/ReturnButton';
import LoopDialog from './UI/LoopDialog';

function App() {
  const {
    view, setView, initializeMission, isInitialized, storeObj,
  } = useStore(
    (state) => ({
      view: state.view,
      setView: state.setView,
      initializeMission: state.initializeMission,
      isInitialized: state.isInitialized,
      storeObj: state.storeObj,
    }),
    shallow,
  );
  const obj = useGLTF(SatelliteGLB);

  useLayoutEffect(() => {
    obj.nodes.Satellite.geometry.rotateY((3 * Math.PI) / 2);
    storeObj(obj);
  }, [obj]);

  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (firstRender) {
      initializeMission(defaultValues);
    }
  }, [firstRender]);
  useEffect(() => {
    setFirstRender(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Grid
        minHeight={'100vh'}
        width={'100vw'}
        maxWidth={'100vw'}
        templateRows={view.templateRows}
        templateColumns={view.templateColumns}
        templateAreas={view.templateAreas}
      >
        <GridItem area={view.headerArea} display={view.name === 'simulation' ? '' : 'none'} zIndex={99}>
          <Grid
            h={'100%'}
            templateColumns={'1fr 1fr 1fr'}
            templateRows={'1fr 2fr'}
            templateAreas={
               `". . ."
               "views title controls"`
            }
          >
            <ViewButtons />
            <GridItem area={'title'}>
              <Flex align="center" height="100%" justify="center" gap={2}>
                <h1>Space Power Simulator</h1>
                <span>(beta)</span>
              </Flex>
            </GridItem>
            <GridItem area={'controls'}>
              { isInitialized
                ? (
                  <Controls />
                )
                : '' }
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem position="relative" area={view.simulationArea}>
          <Grid
            h={'100%'}
            maxWidth={'100vw'}
            overflow={'hidden'}
            templateColumns={'1fr 0.25fr'}
            templateRows={`0.125fr 1.75fr 0.625fr ${view.name === 'simulation' ? '0.125fr' : ''}`}
          >
            { isInitialized ? (
              <>
                <Simulation />
                <HUD />
              </>
            ) : <Spinner position="absolute" top="50%" left="50%" transform={'translate(-50%, -50%)'} />}
            {((view.name === 'mission') || (view.name === 'performance'))
              ? (
                <>
                  <ReturnButton />
                  <GridItem area={'1 / 1 / 1 / 3'}>
                    <Controls />
                  </GridItem>
                </>
              ) : ''}
          </Grid>
        </GridItem>
        <MissionPlanner shouldDisplay={view.name === 'mission'} />
        {isInitialized ? (
          <PerformanceView />
        )
          : ''}
        <GridItem area={view.footerArea}>
          <Text align="center" fontSize="0.75rem" color="grey">
            Copyright © SPACE POWER Ltd 2022. All Rights Reserved.
          </Text>
        </GridItem>
        <LoopDialog />

      </Grid>

    </ChakraProvider>
  );
}

export default App;
