/* eslint-disable react/jsx-curly-brace-presence */
import {
  Center,
  ChakraProvider,
  Grid, GridItem, Spinner, Button,
} from '@chakra-ui/react';
import {
  useState, useEffect,
} from 'react';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/400.css';
import { defaultValues } from './UI/MissionPlanner/defaultInputs';
import { MissionPlanner, HUD } from './UI';
import theme from './theme';
import ViewButtons from './UI/ViewButtons';
import Simulation from './Simulation/Simulation';
import { handleMissionRequest } from './Model/mission';

const simulationView = {
  name: 'simulation',
  templateRows: '0.5fr 2fr 0.125fr',
  templateColumns: '1fr',
  templateAreas: '',
  simulationArea: ' 1 / 1 / 4 / 2',
  headerArea: ' 1 / 1 / 2 / 4',
  footerArea: '3 / 1 / 4 / 2',
};

const missionView = {
  name: 'mission',
  templateRows: '1fr 1.5fr 0.125fr',
  templateColumns: '1fr 2fr',
  templateAreas: `"simulation parameters"
  "select parameters"
  "footer footer"`,
  simulationArea: 'simulation',
  headerArea: '',
  footerArea: 'footer',
};

const performanceView = {
  name: 'performance',
  templateRows: '1fr 1.5fr 0.125fr',
  templateColumns: '1fr 2fr',
  templateAreas: `"simulation performance"
  "select performance"
  "footer footer"`,
};

function App() {
  const [view, setView] = useState(simulationView);
  // const [simData, setSimData] = useState();
  const [loaded, setLoaded] = useState(false);
  // const simData = useRef();
  const [simData, setSimData] = useState();
  const updateMission = (mission) => {
    setLoaded(() => false);
    // simData.current = mission;
    setSimData(() => mission);
    setLoaded(() => true);
  };

  useEffect(() => {
    updateMission(handleMissionRequest(defaultValues));
    setLoaded(() => true);
  }, []);

  const [currentFrame, setCurrentFrame] = useState(0);

  const handleView = (selection) => {
    let newView = simulationView;
    if (selection === 'mission') newView = missionView;
    if (selection === 'performance') newView = performanceView;
    setView(newView);
  };

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
            <ViewButtons handleView={handleView} />
            <GridItem area={'title'}>
              <Center>
                <h1>Space Power</h1>
              </Center>
            </GridItem>
            <GridItem area={'controls'}>
              <p>{simData ? new Date(simData.time[currentFrame]).toISOString() : ''}</p>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem position="relative" area={view.simulationArea}>
          <Grid
            h={'100%'}
            templateColumns={'1fr 0.125fr'}
            templateRows={'2fr 0.5fr 0.125fr'}
          >
            { loaded ? (
              <>
                <Simulation
                  simData={simData}
                  currentFrame={currentFrame}
                  setCurrentFrame={setCurrentFrame}
                />
                {view.name === 'simulation'
                  ? (
                    <HUD satellites={simData.satellites} frame={currentFrame} />
                  ) : '' }
              </>
            ) : <Spinner position="absolute" top="50%" left="50%" transform={'translate(-50%, -50%)'} />}
            {((view.name === 'mission') || (view.name === 'performance'))
              ? (
                <GridItem area={'3 / 2 / 4 / 3'}>
                  <Button value={'simulation'} onClick={(e) => handleView(e.target.value)}>
                    Return
                  </Button>
                </GridItem>
              ) : ''}
          </Grid>
        </GridItem>

        <MissionPlanner shouldDisplay={view.name === 'mission'} updateMission={updateMission} />

        <GridItem area={view.footerArea}>
          Footer
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
