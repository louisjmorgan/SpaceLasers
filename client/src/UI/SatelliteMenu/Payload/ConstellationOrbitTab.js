/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/layout';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../../Model/store';
import CustomNumberInput from '../../Elements/CustomNumberInput';

function ConstellationOrbitTab() {
  const {
    constellationIndex, orbitLists,
  } = useUIStore((state) => ({
    constellationIndex: state.constellationIndex,
    orbitLists: state.orbitLists,
  }), shallow);

  const [maxSatellites, setMaxSatellites] = useState(orbitLists[0].length);
  const { setValue } = useFormContext();

  const handleChooseOrbitList = (e) => {
    setValue(`constellations.${constellationIndex}.list`, e.target.value);
    const list = orbitLists.find(
      (v) => v.name === e.target.value,
    );
    setMaxSatellites(list.length);
  };

  const constellationValues = useWatch(`constellations.${constellationIndex}`);

  return (
    <Flex direction="column" maxWidth="60ch" align="center" gap={10} p={5}>
      <CustomNumberInput
        step={1}
        name={`constellations.${constellationIndex}.satelliteCount`}
        label="Number of Satellites"
        min={1}
        max={maxSatellites}
      />
      <FormControl
        maxWidth="30ch"
        p={5}
      >
        <FormLabel htmlFor={`constellations.${constellationIndex}.list`}>Orbit List</FormLabel>
        <Select
          name={`constellations.${constellationIndex}.list`}
          value={constellationValues.list}
          onChange={handleChooseOrbitList}
        >
          {orbitLists.map((c) => (
            <option value={c.name} key={c.name}>
              {c.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Flex>
  );
}

export default ConstellationOrbitTab;
