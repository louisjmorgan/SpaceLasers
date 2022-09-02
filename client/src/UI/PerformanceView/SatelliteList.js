/* eslint-disable react/prop-types */
import {
  Center, List, ListItem, VStack,
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
      <List width="100%">
        {customers.map((customer) => (
          <Center key={customer.id}>
            <ListItem
              onClick={handleSelect}
              cursor="pointer"
              id={customer.id}
              disabled
              p={3}
              my={1}
              justify="space-around"
              align="center"
              borderRadius={5}
              layerStyle={selected.includes(customer) ? 'selected' : ''}
              width="80%"
            >
              {customer.name}
            </ListItem>
          </Center>
        ))}
      </List>
    </VStack>
  );
}

export default SatelliteList;
