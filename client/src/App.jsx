/* eslint-disable react/jsx-curly-brace-presence */
import {
  Center,
  ChakraProvider,
  Grid, GridItem, Spinner, Button,
} from '@chakra-ui/react';
import {
  useState, useEffect, useRef,
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
  templateRows: '0.75fr 1.75fr 0.125fr',
  templateColumns: '1fr 2.25fr',
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

const defaultUI = {
  showLabel: false,
};

function App() {
  const [view, setView] = useState(simulationView);
  // const [simData, setSimData] = useState();
  const [loaded, setLoaded] = useState(false);
  const simData = useRef();

  const ui = useRef(new Map());
  const initializeUI = (mission) => {
    mission.satellites.customers.forEach((satellite) => {
      ui.current.set(satellite.id, {
        ...defaultUI,
        color: 'red',
      });
    });
    mission.satellites.spacePowers.forEach((satellite) => {
      ui.current.set(satellite.id, {
        ...defaultUI,
        color: 'yellow',
      });
    });
  };

  const updateMission = (mission) => {
    setLoaded(() => false);
    initializeUI(mission);
    simData.current = mission;
    // setSimData(() => mission);
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

  const handleLabel = (id) => {
    console.log(id);
    const prev = ui.current.get(id);
    console.log(prev);
    ui.current.set(id, {
      ...prev,
      showLabel: !prev.showLabel,
    });
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
              <p>{simData.current ? new Date(simData.current.time[currentFrame]).toISOString() : ''}</p>
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
                  simData={simData.current}
                  currentFrame={currentFrame}
                  setCurrentFrame={setCurrentFrame}
                  handleLabel={handleLabel}
                  ui={ui.current}
                />
                {view.name === 'simulation'
                  ? (
                    <HUD
                      satellites={simData.current.satellites}
                      frame={currentFrame}
                      ui={ui.current}
                      handleLabel={handleLabel}
                    />
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
