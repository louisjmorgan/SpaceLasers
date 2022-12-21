/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import shallow from 'zustand/shallow';
import { Accordion } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSimStore, useUIStore } from '../../../Model/store';
import SpacePowerList from './SpacePowerList';

function SpacePowerConstellations() {
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
  // const constellationsForm = useWatch({ name: 'constellations' });
  const { getValues } = useFormContext();
  console.log(getValues('constellations'));
  console.log(constellations);
  return (
    <Accordion
      width="100%"
      margin="0"
      defaultIndex={0}
      allowToggle
      index={constellationIndex}
      onChange={setConstellationIndex}
      mt={3}
    >
      {getValues('constellations').map((constellation, i) => (
        <SpacePowerList
          constellation={constellations.find((c) => c.id === constellation.id)}
          index={i}
          key={`spacepower-${constellation.id}`}
        />
      ))}
    </Accordion>
  );
}

export default SpacePowerConstellations;
