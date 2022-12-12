/* eslint-disable react/jsx-curly-brace-presence */
import {
  ChakraProvider,
  Grid, GridItem, Spinner, Flex, Text, DarkMode,
} from '@chakra-ui/react';
import {
  useState, useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import '@fontsource/barlow/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/azeret-mono';
import shallow from 'zustand/shallow';
import { useGLTF } from '@react-three/drei';
import { createPortal } from 'react-dom';
import Controls from './UI/Controls';
import { useSimStore, useUIStore } from './Model/store';
import { defaultValues } from './Util/defaultInputs';
import theme from './theme';
import MenuButtons from './UI/MenuButtons';
import Simulation from './Simulation/Simulation';
import SatelliteGLB from './Assets/Mesh/lowpolysat.glb';
import LoopDialog from './UI/LoopDialog';
import FormWrapper from './UI/FormWrapper';
import HUD from './UI/HUD';
import Time from './UI/Time';

// const simRoot = document.getElementById('sim-root');
// const root = document.createElement('div');
// simRoot.appendChild(root);
function App() {
  const {
    initializeMission, isInitialized, storeObj,
  } = useSimStore(
    (state) => ({
      initializeMission: state.initializeMission,
      isInitialized: state.isInitialized,
      storeObj: state.storeObj,
    }),
    shallow,
  );

  const {
    view,
  } = useUIStore(
    (state) => ({
      view: state.view,
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
          <GridItem area={view.headerArea} display={view.name === 'simulation' ? '' : 'none'} zIndex={99}>
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
                <Flex align="center" height="100%" justify="center" gap={2}>
                  { isInitialized
                    ? (
                      <Time />
                    ) : ''}
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
            </Grid>
          </GridItem>
          <FormWrapper />
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
