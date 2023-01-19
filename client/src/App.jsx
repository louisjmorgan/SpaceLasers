/* eslint-disable react/jsx-curly-brace-presence */
import {
  ChakraProvider,
  Grid, GridItem, Spinner, Flex, Text, DarkMode,
} from '@chakra-ui/react';
import {
  useState, useEffect,
  useLayoutEffect,
} from 'react';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/azeret-mono';
import shallow from 'zustand/shallow';
import { useGLTF } from '@react-three/drei';
import Controls from './UI/Controls';
import { useSimStore } from './Model/store';
import { defaultValues } from './Util/defaultInputs';
import theme from './theme';
import MenuButtons from './UI/MenuButtons';
import Simulation from './Simulation/Simulation';
import SatelliteGLB from './Assets/Mesh/lowpolysat.glb';
import LoopDialog from './UI/LoopDialog';
import FormWrapper from './UI/FormWrapper';
import HUD from './UI/HUD';
import Time from './UI/Time';
import PerformanceView from './UI/PerformanceView/PerformanceView';

const view = {
  name: 'simulation',
  templateRows: '0.375fr 2.125fr 0.125fr',
  templateColumns: '1fr',
  templateAreas: '',
  simulationArea: ' 1 / 1 / 4 / 2',
  headerArea: ' 1 / 1 / 2 / 4',
  footerArea: '3 / 1 / 4 / 2',
};

function App() {
  const {
    initializeMission, isInitialized, storeObj, updateStatus, status,
  } = useSimStore(
    (state) => ({
      initializeMission: state.initializeMission,
      isInitialized: state.isInitialized,
      storeObj: state.storeObj,
      updateStatus: state.updateStatus,
      status: state.status,
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
      const worker = new Worker(new URL('./Model/workers/missionWorker.js', import.meta.url), { type: module });
      worker.postMessage({ messageType: 'Request', req: defaultValues });
      worker.onmessage = (e) => {
        if (e.data.done === true) {
          const { mission } = e.data;
          initializeMission(mission);
        } else {
          updateStatus(e.data.message);
        }
      };
    }
  }, [firstRender]);

  useEffect(() => {
    setFirstRender(true);
  }, []);

  return (
    <ChakraProvider
      theme={theme}
      portalZIndex={3}
    >
      <DarkMode>
        <Grid
          minHeight={'100vh'}
          width={'100vw'}
          maxWidth={'100vw'}
          overflow="hidden"
          templateRows={view.templateRows}
          templateColumns={view.templateColumns}
          templateAreas={view.templateAreas}
          position="relative"
        >
          <GridItem area={view.headerArea} display={view.name === 'simulation' ? '' : 'none'} zIndex={1}>
            <Grid
              h={'100%'}
              templateColumns={'1fr 1fr 1fr'}
              templateRows={'1fr 2fr'}
              templateAreas={
               `". . ."
               "menu-buttons title controls"`
            }
            >
              <MenuButtons />
              <GridItem area={'title'}>
                {/* <Flex align="center" height="100%" justify="center" gap={2}>
                  { isInitialized
                    ? (
                    ) : ''}
                </Flex> */}
              </GridItem>
              <GridItem area={'controls'}>
                { isInitialized
                  ? (
                    <Flex align="center" height="100%">
                      <Time />
                      <Controls />
                    </Flex>
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
              ) : (
                <Flex
                  position="absolute"
                  top="0"
                  bottom="0"
                  left="0"
                  right="0"
                  direction="column"
                  align="center"
                  justify="center"
                  gap={5}
                >
                  <Text width="30ch" textAlign="center" height="2ch">{status}</Text>
                  <Spinner
                    // position="absolute"
                    // top="50%"
                    // left="50%"
                    // transform={'translate(-50%, -50%)'}
                    size={'lg'}
                  />
                </Flex>
              )}
            </Grid>
          </GridItem>
          <FormWrapper />
          <PerformanceView />
          <GridItem area={view.footerArea}>
            <Text align="center" fontSize="0.75rem" color="grey">
              Copyright © SPACE POWER Ltd 2022. All Rights Reserved.
            </Text>
          </GridItem>
          <LoopDialog />
        </Grid>
      </DarkMode>
    </ChakraProvider>
  );
}

export default App;
