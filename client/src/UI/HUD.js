/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Flex, Select, Stat, StatLabel, StatNumber,
  Box, Center, StatGroup, GridItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ParentSize } from '@visx/responsive';
import Gauge from './Gauge';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function HUD({ satellites, frame }) {
  const [selected, setSelected] = useState(satellites.averages);

  const handleSelectSatellite = (selection) => {
    if (selection === 'all') setSelected(() => satellites.averages);
    else {
      setSelected(() => (
        satellites.customers.find((customer) => (
          customer.id === selection))));
    }
  };

  if (!satellites) return;
  return (
    <GridItem area={'2 / 1 / 3 / 3'} zIndex={99}>
      <Flex height="100%" justify="space-around" align-items="center">
        <Center flex={1}>
          <Box>
            <Select onChange={(e) => handleSelectSatellite(e.target.value)}>
              <option value="all">All</option>
              {satellites.customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </Select>
          </Box>
        </Center>
        <Box height="100%">

          <ParentSize>
            {({ height }) => (

              <Gauge
                height={height}
                beams={selected.performance.chargeState[frame] * 100}
                noBeams={selected.performance.chargeStateNoBeams[frame] * 100}
              />

            )}
          </ParentSize>

        </Box>
        <Center flex={1}>
          <Box>
            {selected.params ? (
              <StatGroup>
                {/* <Stat>
                <StatLabel>Net Current</StatLabel>
                <StatNumber>
                  {`${capitalize(selected.params.load.powerProfiles[
                    selected.performance.currentDuties[frame]
                  ])}`}
                </StatNumber>
              </Stat> */}

                <Stat width="30ch">
                  <StatLabel>Duty</StatLabel>
                  <StatNumber>{`${capitalize(selected.params.load.duties[selected.performance.currentDuties[frame]].name)}`}</StatNumber>
                </Stat>
              </StatGroup>
            ) : '' }
          </Box>
        </Center>
      </Flex>
    </GridItem>
  );
}

export default HUD;
