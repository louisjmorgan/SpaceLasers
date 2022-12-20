/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, List } from '@chakra-ui/layout';
import { v4 as uuidv4 } from 'uuid';
import { useFieldArray, useFormContext } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { defaultSatellite } from '../../../Util/defaultInputs';
import { useUIStore } from '../../../Model/store';
import SatelliteListItem from './SatelliteListItem';

function SatelliteList({
  constellation,
}) {
  const {
    setSatIndex, isEditing, openMenu,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    openMenu: state.openMenu,
  }), shallow);

  const { getValues, control } = useFormContext();

  const {
    fields, append, remove,
  } = useFieldArray({
    control,
    name: `constellations.${constellation}.satellites`,
    keyName: 'key',
  });

  return (

    <Flex direction="column" align="center">
      <List width="100%" maxHeight="30vh" overflow="auto" margin="auto">
        {fields.map((field, i) => (
          <SatelliteListItem
            satellite={field}
            constellation={constellation}
            index={i}
            remove={remove}
            key={field.id}
          />
        ))}
      </List>
      {isEditing ? (
        <Button
          m={5}
          onClick={() => {
            const { length } = getValues(`constellations.${constellation}.satellites`);
            append({
              ...defaultSatellite,
              name: `Satellite ${length + 1}`,
              id: uuidv4(),
            });
            setSatIndex(length);
            openMenu('satelliteConfig');
          }}
        >
          <AddIcon />
        </Button>
      ) : ''}
    </Flex>
  );
}

export default SatelliteList;
