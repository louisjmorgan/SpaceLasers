/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/layout';
import shallow from 'zustand/shallow';
import { Accordion } from '@chakra-ui/react';
import { useSimStore, useUIStore } from '../../../Model/store';
import SpacePowerList from './SpacePowerList';

function SpacePowerConstellations({
  formik,
}) {
  const {
    constellationIndex, setConstellationIndex,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    setConstellationIndex: state.setConstellationIndex,
    constellationIndex: state.constellationIndex,
    openMenu: state.openMenu,
  }), shallow);

  const { constellations } = useSimStore((state) => ({
    constellations: state.mission.constellations,
  }), shallow);
  return (
    <Accordion
      width="100%"
      margin="auto"
      defaultIndex={0}
      allowToggle
      index={constellationIndex}
      onChange={setConstellationIndex}
    >
      {formik.values.constellations.map((constellation, i) => (
        <SpacePowerList
          constellation={constellations.find((c) => c.id === constellation.id)}
          index={i}
          formik={formik}
          key={constellation.id}
        />
      ))}
    </Accordion>
  );
}

export default SpacePowerConstellations;
