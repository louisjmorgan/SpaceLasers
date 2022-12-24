import {
  Center,
  Flex,
  Select, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useSimStore } from '../../Model/store';
import { SIM_LENGTH } from '../../Util/constants';

const days = SIM_LENGTH / (1000 * 60 * 60 * 24);

const statProps = [
  {
    key: 'duration',
    name: 'Total Duration',
    getValue: () => days,
    format: (value) => `${value.toFixed(1)} days`,
    getHelpText: ({ satellite }) => {
      const { period } = satellite.params.orbit;
      return `${((SIM_LENGTH) / period).toFixed(2)} orbits`;
    },
  },
  {
    key: 'dischargeSaved',
    name: 'Discharge Saved',
    getValue: ({ isConstellation, satellite, constellation }) => (
      isConstellation
        ? constellation.summary.dischargeSaved : satellite.summary.dischargeSaved),
    format: (value) => `${value.toFixed(2)}Ah`,
    getHelpText: ({ isConstellation, satellite, constellation }) => (
      isConstellation
        ? `${(constellation.summary.dischargeSaved / satellite.params.battery.capacity).toFixed(1)} full batteries`
        : `${(satellite.summary.dischargeSaved / satellite.params.battery.capacity).toFixed(1)} full batteries`
    ),
  },
  {
    key: 'timeCharged',
    name: 'Time spent charging',
    getValue: ({ isConstellation, satellite, constellation }) => (
      isConstellation
        ? constellation.summary.timeCharged : satellite.summary.timeCharged),
    format: (value) => `${value.toFixed(0)} minutes`,
    getHelpText: ({ isConstellation, satellite, constellation }) => `${(
      ((isConstellation ? constellation.summary.timeCharged : satellite.summary.timeCharged) * 100)
      / (days * 60 * 60)).toFixed(1)}% of ${days.toFixed(1)} days`,
  },
  {
    key: 'lowestChargeState',
    name: 'Lowest Charge State',
    getValue: ({ isConstellation, satellite, constellation }) => (
      isConstellation
        ? constellation.summary.lowestChargeStateBeams : satellite.summary.lowestChargeStateBeams),
    format: (value) => `${(value * 100).toFixed(1)}%`,
    getHelpText: ({ isConstellation, satellite, constellation }) => `${
      ((isConstellation ? constellation.summary.lowestChargeStateNoBeams : satellite.summary.lowestChargeStateNoBeams) * 100).toFixed(1)}% without Space Power`,
  },
];

function Summary() {
  const {
    satellites, constellations, satelliteOptions, constellationOptions,
  } = useSimStore(
    (state) => ({
      satellites: state.mission.satellites,
      constellations: state.mission.constellations,
      constellationOptions: state.constellationOptions,
      satelliteOptions: state.satelliteOptions,
    }),
    shallow,
  );

  const [selected, setSelected] = useState({
    isConstellation: false,
    constellation: constellations[0],
    satellite: satellites.customers[0],
  });

  useEffect(() => {
    setSelected(() => ({
      constellation: constellations[0],
      satellite: satellites.customers[0],
    }));
  }, [satellites, constellations]);

  const handleSelectSatellite = (e) => {
    const selection = e.target.value;
    if (selection === selected.constellation.id) {
      setSelected(() => ({
        ...selected,
        satellite: satellites.customers.find((c) => c.constellation === selection),
        isConstellation: true,
      }));
    } else {
      setSelected(() => ({
        ...selected,
        isConstellation: false,
        satellite: satelliteOptions.get(selection).isCustomer
          ? satellites.customers.find((customer) => (customer.id === selection))
          : satellites.spacePowers.find((spacePower) => (spacePower.id === selection)),
      }));
    }
  };

  const handleSelectConstellation = (e) => {
    const selection = e.target.value;
    setSelected(() => ({
      constellation: constellationOptions.get(selection),
      satellite: satellites.customers.find((customer) => (
        customer.id === constellationOptions.get(selection).satellites[0]
      )),
    }));
  };
  return (
    <VStack width="100%">
      <h3>Summary</h3>
      <Center minWidth="50%">
        <Flex gap={5} direction="row" p={5}>
          <Select value={selected.constellation.id} onChange={handleSelectConstellation}>
            {[...constellationOptions.entries()].map(([id, constellation]) => (
              <option
                key={id}
                value={id}
              >
                {constellation.name}
              </option>
            ))}
          </Select>
          <Select
            value={selected.isConstellation ? selected.constellation.id : selected.satellite.id}
            onChange={handleSelectSatellite}
          >
            {constellationOptions.get(selected.constellation.id).satellites.map((id) => (
              <option key={id} value={id}>{satelliteOptions.get(id).name}</option>
            ))}
            <option value={selected.constellation.id}>All</option>
          </Select>
        </Flex>
      </Center>
      <StatGroup as={Flex} wrap="wrap" width="100%" justify="center" align="center">
        {statProps.map((stat) => (
          <Stat key={stat.key} m={5} minWidth="20ch" align="center">
            <StatLabel>{stat.name}</StatLabel>
            <StatNumber>{stat.format(stat.getValue(selected))}</StatNumber>
            <StatHelpText>{stat.getHelpText(selected, satellites)}</StatHelpText>
          </Stat>

        ))}
      </StatGroup>
    </VStack>
  );
}

export default Summary;
