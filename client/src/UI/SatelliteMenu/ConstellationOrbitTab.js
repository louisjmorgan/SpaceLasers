/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useState } from 'react';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../Model/store';
import CustomNumberInput from '../Elements/CustomNumberInput';

function ConstellationOrbitTab({ formik }) {
  const {
    constellationIndex, orbitLists,
  } = useUIStore((state) => ({
    constellationIndex: state.constellationIndex,
    orbitLists: state.orbitLists,
  }), shallow);

  const [maxSatellites, setMaxSatellites] = useState(orbitLists[0].length);

  const handleChooseOrbitList = (e) => {
    formik.setFieldValue(`constellations[${constellationIndex}].list`, e.target.value)
      .then(() => {
        const list = orbitLists.find(
          (v) => v.name === e.target.value,
        );
        setMaxSatellites(list.length);
      });
  };

  return (
    <VStack gap={10} p={5}>
      <CustomNumberInput
        value={formik.values.constellations[constellationIndex].satelliteCount}
        step={1}
        name={`constellations[${constellationIndex}].satelliteCount`}
        formik={formik}
        label="Number of Satellites"
        min={1}
        max={maxSatellites}
      />
      <FormControl
        maxWidth="30ch"
        p={5}
      >
        <FormLabel htmlFor={`constellations[${constellationIndex}].list`}>Orbit List</FormLabel>
        <Select
          name={`constellations[${constellationIndex}].list`}
          value={formik.values.constellations[constellationIndex].list}
          onChange={handleChooseOrbitList}
        >
          {orbitLists.map((c) => (
            <option value={c.name} key={c.name}>
              {c.name}
            </option>
          ))}
        </Select>
      </FormControl>
      {/* {orbitLists && (
      <FormControl width="60%">
        <FormLabel htmlFor={`constellations[${constellationIndex}].satellites[${satIndex}].orbit.tle`}>Satellite</FormLabel>
        <Select
          name={`constellations[${constellationIndex}].satellites[${satIndex}].orbit.tle`}
          value={formik.values.constellations[constellationIndex].satellites[satIndex].orbit.tle}
          onChange={handleChooseTle}
        >
          {orbitLists.find(
            (v) => v.name === formik.values.constellations[constellationIndex].satellites[satIndex].orbit.constellation,
          ).tles
            .map((tle, i) => (
              <option
                key={`${i}${tle.name}`}
                value={`${tle.name}\n${tle.tles.tle1}\n${tle.tles.tle2}`}
              >
                {tle.name}
              </option>
            ))}
        </Select>
      </FormControl>
      )} */}
    </VStack>
  );
}

export default ConstellationOrbitTab;
