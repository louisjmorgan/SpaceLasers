/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Checkbox, CheckboxGroup, FormControl, FormLabel, VStack,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useSimStore } from '../../Model/store';
import './Charts.css';
import { Select, useChakraSelectProps } from 'chakra-react-select';

function SatelliteList({ onSelectSatellite, selected }) {
  const {
    options, satelliteOptions, customers,
  } = useSimStore(
    (state) => ({
      options: state.mission.satellites.customers.map((c) => ({ label: c.name, value: c.id })),
      customers: state.mission.satellites.customers,
      // satelliteOptions: state.satelliteOptions,
    }),
    shallow,
  );

  const handleSelect = (v) => {
    onSelectSatellite(v);
  };

  const selectProps = useChakraSelectProps({
    value: options.filter((o) => selected.includes(o.value)),
    onChange: handleSelect,
    isMulti: true,
  });

  return (
    <FormControl as={VStack} align="stretch" maxWidth={['90%', '90%', '60%']}>
      <FormLabel
        textAlign="left"
      >
        Satellites
      </FormLabel>
      <Select
        {...selectProps}
        options={options}
        width="100%"
        menuPlacement="top"
      />
    </FormControl>
  );
}

export default SatelliteList;
