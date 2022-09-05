/* eslint-disable react/prop-types */
import {
  Center, Checkbox, CheckboxGroup, List, ListItem, VStack,
} from '@chakra-ui/react';
import { useStore } from 'Model/store';
import shallow from 'zustand/shallow';
import './Charts.css';

function SatelliteList({ toggleSelected, selected }) {
  const {
    customers,
  } = useStore(
    (state) => ({
      customers: state.mission.satellites.customers,
    }),
    shallow,
  );

  const handleSelect = (e) => {
    const { id } = e.target;
    toggleSelected(id);
  };

  return (
    <VStack width="50%">
      <h4>Show data for</h4>
      <CheckboxGroup width="100%">
        {customers.map((customer) => (
          <Checkbox
            onChange={handleSelect}
            isChecked={selected.includes(customer)}
            id={customer.id}
            key={customer.id}
            align="start"
          >
            {customer.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </VStack>
  );
}

export default SatelliteList;
