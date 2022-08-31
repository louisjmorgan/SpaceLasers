/* eslint-disable react/prop-types */
import {
  Center, List, ListItem, VStack,
} from '@chakra-ui/react';
import { useStore } from 'Model/store';
import shallow from 'zustand/shallow';

function SatelliteList({ toggleSelected, selected }) {
  const {
    customers,
  } = useStore(
    (state) => ({
      customers: state.mission.satellites.customers,
    }),
    shallow,
  );

  return (
    <VStack width="50%">
      <h3>Select satellites:</h3>
      <List width="100%">
        {customers.map((customer) => (
          <Center>
            <ListItem
              onClick={() => toggleSelected(customer)}
              key={customer.id}
              cursor="pointer"
              p={3}
              my={2}
              justify="space-around"
              align="center"
              borderRadius={5}
              // layerStyle={selected.includes(customer) ? 'selected' : ''}
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
