/* eslint-disable react/jsx-curly-brace-presence */
import {
  Center,
  ChakraProvider,
  Grid, GridItem, Spinner, Button,
} from '@chakra-ui/react';
import {
  useState, useEffect, useRef, useCallback, Suspense,
} from 'react';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/400.css';
import shallow from 'zustand/shallow';
import PerformanceView from 'UI/PerformanceView/PerformanceView';
import Controls from './UI/Controls';
import useStore from './Model/store';
import { defaultValues } from './UI/MissionPlanner/defaultInputs';
import { MissionPlanner, HUD } from './UI';
import theme from './theme';
import ViewButtons from './UI/ViewButtons';
import Simulation from './Simulation/Simulation';

function App() {
  const {
    view, setView, initializeMission, mission,
  } = useStore(
    (state) => ({
      view: state.view,
      setView: state.setView,
      initializeMission: state.initializeMission,
      mission: state.mission,
    }),
    shallow,
  );

  useEffect(() => {
    initializeMission(defaultValues);
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Grid
        minHeight={'100vh'}
        width={'100%'}
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
              <Center>
                <h1>Space Power</h1>
              </Center>
            </GridItem>
            <GridItem area={'controls'}>
              { mission
                ? (
                  <Controls
                    times={mission.time}
                    satellites={mission.satellites}
                  />
                )
                : '' }
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem position="relative" area={view.simulationArea}>
          <Grid
            h={'100%'}
            templateColumns={'1fr 0.125fr'}
            templateRows={'2fr 0.5fr 0.125fr'}
          >
            { mission ? (
              <Suspense>
                <Simulation />
                <HUD
                  satellites={mission.satellites}
                  shouldDisplay={view.name === 'simulation'}
                />

              </Suspense>
            ) : <Spinner position="absolute" top="50%" left="50%" transform={'translate(-50%, -50%)'} />}
            {((view.name === 'mission') || (view.name === 'performance'))
              ? (
                <GridItem area={'3 / 2 / 4 / 3'}>
                  <Button value={'simulation'} onClick={(e) => setView(e.target.value)}>
                    Return
                  </Button>
                </GridItem>
              ) : ''}
          </Grid>
        </GridItem>
        <MissionPlanner shouldDisplay={view.name === 'mission'} />
        <PerformanceView shouldDisplay={view.name === 'performance'} />
        <GridItem area={view.footerArea}>
          Footer
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
