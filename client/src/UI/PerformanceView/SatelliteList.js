/* eslint-disable react/prop-types */
import {
  Checkbox, CheckboxGroup, VStack,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useSimStore } from '../../Model/store';
import './Charts.css';

function SatelliteList({ onSelectSatellite, selected }) {
  const {
    customers,
  } = useSimStore(
    (state) => ({
      customers: state.mission.satellites.customers,
    }),
    shallow,
  );
  const handleSelect = (e) => {
    const { id } = e.target;
    onSelectSatellite(id);
  };

  return (
    <VStack width="50%">
      <h4>
        Show data for
        {' '}
        <span>(max 6)</span>
      </h4>

      <CheckboxGroup width="100%">
        {customers.map((customer) => (
          <Checkbox
            onChange={handleSelect}
            id={customer.id}
            key={customer.id}
            align="start"
            isDisabled={(selected.length === 1 && selected.includes(customer.id))}
            isChecked={selected.includes(customer.id)}
          >
            {customer.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </VStack>
  );
}

export default SatelliteList;
