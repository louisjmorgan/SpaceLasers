import {
  Center,
  Flex,
  Select, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
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
    getHelpText: (selected, customers) => {
      const period = selected.params ? selected.params.orbit.period : customers[0].params.orbit.period;
      return `${((SIM_LENGTH) / period).toFixed(2)} orbits`;
    },
  },
  {
    key: 'dischargeSaved',
    name: 'Discharge Saved',
    getValue: (selected) => selected.summary.dischargeSaved,
    format: (value) => `${value.toFixed(2)}Ah`,
    getHelpText: (selected, customers) => {
      if (selected.params) return `${(selected.summary.dischargeSaved / selected.params.battery.capacity).toFixed(1)} full batteries`;
      return `${(selected.summary.dischargeSaved / customers[0].params.battery.capacity).toFixed(1)} full batteries`;
    },
  },
  {
    key: 'timeCharged',
    name: 'Time spent charging',
    getValue: (selected) => selected.summary.timeCharged,
    format: (value) => `${value.toFixed(1)} minutes`,
    getHelpText: (selected) => `${((selected.summary.timeCharged * 100) / (days * 60 * 60)).toFixed(1)}% of ${days.toFixed(1)} days`,
  },
  {
    key: 'lowestChargeState',
    name: 'Lowest Charge State',
    getValue: (selected) => selected.summary.lowestChargeStateNoBeams,
    format: (value) => `${(value * 100).toFixed(1)}%`,
    getHelpText: (selected) => `${(selected.summary.lowestChargeStateBeams * 100).toFixed(1)}% with Space Power`,
  },
];

function Summary() {
  const { customers, fleet } = useSimStore(
    (state) => ({
      customers: state.mission.satellites.customers,
      fleet: state.mission.satellites.fleet,
    }),
    shallow,
  );

  const [selected, setSelected] = useState(customers[0]);
  const handleSelectSatellite = (e) => {
    if (e.target.value === 'fleet') setSelected(() => fleet);
    else {
      setSelected(() => customers.find((v) => v.id === e.target.value));
    }
  };
  return (
    <VStack width="100%">
      <h3>Summary</h3>
      <Center minWidth="50%">
        <Select onChange={handleSelectSatellite}>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
          <option value="fleet">Fleet</option>
        </Select>
      </Center>
      <StatGroup as={Flex} wrap="wrap" width="100%" justify="center" align="center">
        {statProps.map((stat) => (
          <Stat key={stat.key} m={5} minWidth="20ch" align="center">
            <StatLabel>{stat.name}</StatLabel>
            <StatNumber>{stat.format(stat.getValue(selected))}</StatNumber>
            <StatHelpText>{stat.getHelpText(selected, customers)}</StatHelpText>
          </Stat>

        ))}
      </StatGroup>
    </VStack>
  );
}

export default Summary;
