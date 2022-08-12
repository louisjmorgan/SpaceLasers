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
import MissionPlanner from './UI/MissionPlanner';
import theme from './theme';
import HUD from './UI/HUD';
import ViewButtons from './UI/ViewButtons';
import Simulation from './Simulation/Simulation';
import handleMissionRequest from './Model/mission';

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
  customers: [
    {
      name: 'ONEWEB-0017',
      size: 1,
      tle1: '1 44059C 19010C   22214.40398561 -.00002389  00000-0 -62577-2 0  2143',
      tle2: '2 44059  87.9155 150.4251 0001575  83.4744 333.6540 13.16594779    12',
      pvVoltage: 4.7,
      currentDensity: 170.5,
      area: 0.0064,
      batteryVoltage: 3.6,
      capacity: 1.125,
      duties: [
        {
          id: 0,
          name: 'power storing',
          type: 'power storing',
          consumption: 1.2,
        },
        {
          id: 1,
          name: 'over power',
          type: 'cyclical',
          consumption: 3.2,
          duration: 600,
          cycles: 6,
        },
      ],

    },
  ],
  powerSats: 3,
  inclinationOffset: 0.2,
};

function App() {
  const [view, setView] = useState(simulationView);
  const [simData, setSimData] = useState();

  useEffect(() => {
    setSimData(() => handleMissionRequest(defaultRequest));
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
        <GridItem area={view.simulationArea}>
          { simData ? (
            <Grid
              h={'100%'}
              templateColumns={'1fr 0.125fr'}
              templateRows={'2fr 0.5fr 0.125fr'}
            >
              <Simulation
                simData={simData}
                currentFrame={currentFrame}
                setCurrentFrame={setCurrentFrame}
              />
              {view.name === 'simulation'
                ? (
                  <HUD satellites={simData.satellites} frame={currentFrame} />
                ) : '' }
              {((view.name === 'mission') || (view.name === 'performance'))
                ? (
                  <GridItem area={'3 / 2 / 4 / 3'}>
                    <Button value={'simulation'} onClick={(e) => handleView(e.target.value)}>
                      Return
                    </Button>
                  </GridItem>
                ) : ''}
            </Grid>
          ) : <Spinner />}
        </GridItem>

        <MissionPlanner display={view.name === 'mission' ? '' : 'none'} />

        <GridItem area={view.footerArea}>
          Footer
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
