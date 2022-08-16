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

const defaultRequest = {

  satellites: [
    {
      orbit: {
        epoch: '2022-09-16T04:30:45',
        meanMotionDot: 0.00003242,
        bstar: 0.0084918,
        inclination: 87.9147,
        rightAscension: 147.6632,
        eccentricity: 0.0002947,
        perigee: 88.9181,
        meanAnomaly: 343.2887,
        meanMotion: 13.16587847,
        tle: '',
      },
      power: {
        pvVoltage: 4.7,
        currentDensity: 170.5,
        area: 0.0064,
        batteryVoltage: 3.6,
        capacity: 1.125,
        powerStoringConsumption: 1.2,
      },
      duties: [
        {
          name: 'Cyclical',
          consumption: 3.2,
          type: 'cyclical',
          duration: 600,
          cycles: 6,
          priority: 1,
        },
      ],
      name: 'Satellite 1',
      id: 'dcd9b6ff-c7f6-46e4-87a0-e5f45a91da41',
    },
    {
      orbit: {
        epoch: '2022-09-16T05:06:16',
        meanMotionDot: 0.00001674,
        bstar: 0.004385,
        inclination: 87.9151,
        rightAscension: 147.6525,
        eccentricity: 0.0002601,
        perigee: 76.2503,
        meanAnomaly: 352.9196,
        meanMotion: 13.16593118,
        tle: '',
      },
      power: {
        pvVoltage: 4.7,
        currentDensity: 170.5,
        area: 0.0064,
        batteryVoltage: 3.6,
        capacity: 1.125,
        powerStoringConsumption: 1.2,
      },
      duties: [
        {
          name: 'Cyclical',
          consumption: 3.2,
          type: 'cyclical',
          duration: 600,
          cycles: 6,
          priority: 1,
        },
      ],
      name: 'Satellite 2',
      id: 'd7852436-f82d-424a-bc9e-9ee5fe40c6b3',
    },
    {
      orbit: {
        epoch: '2022-09-16T07:37:44',
        meanMotionDot: 2e-7,
        bstar: 0.000052609,
        inclination: 87.9156,
        rightAscension: 147.6698,
        eccentricity: 0.0001678,
        perigee: 89.1265,
        meanAnomaly: 358.4823,
        meanMotion: 13.16600059,
        tle: '',
      },
      power: {
        pvVoltage: 4.7,
        currentDensity: 170.5,
        area: 0.0064,
        batteryVoltage: 3.6,
        capacity: 1.125,
        powerStoringConsumption: 1.2,
      },
      duties: [
        {
          name: 'Cyclical',
          consumption: 3.2,
          type: 'cyclical',
          duration: 600,
          cycles: 6,
          priority: 1,
        },
      ],
      name: 'Satellite 3',
      id: '96e638d6-c041-4366-96e4-62438e93f5cb',
    },
  ],
  powerSats: 3,
  inclinationOffset: 20,
};

function App() {
  const [view, setView] = useState(simulationView);
  // const [simData, setSimData] = useState();
  const [loaded, setLoaded] = useState(false);
  const simData = useRef();

  const updateMission = (mission) => {
    setLoaded(() => false);
    simData.current = mission;
    setLoaded(() => true);
  };

  useEffect(() => {
    // setSimData(() => handleMissionRequest(defaultRequest));
    updateMission(handleMissionRequest(defaultRequest));
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
                />
                {view.name === 'simulation'
                  ? (
                    <HUD satellites={simData.current.satellites} frame={currentFrame} />
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
