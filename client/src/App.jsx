/* eslint-disable react/jsx-curly-brace-presence */
import {
  ChakraProvider,
  Grid, GridItem, Spinner, Flex, Text, DarkMode, Box,
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
        { isInitialized && (
          <>
            <Simulation />
            <PerformanceView />
            {/* <HUD /> */}
          </>

        )}
      </DarkMode>
    </ChakraProvider>
  );
}

export default App;
