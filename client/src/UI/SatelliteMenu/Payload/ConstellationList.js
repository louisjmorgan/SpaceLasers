/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';
import { Accordion } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useUIStore } from '../../../Model/store';
import ConstellationListItem from './ConstellationListItem';
import { defaultConstellation } from '../../../Util/defaultInputs';

function ConstellationList() {
  const {
    isEditing, constellationIndex, setConstellationIndex, openMenu,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
    setSatIndex: state.setSatIndex,
    setConstellationIndex: state.setConstellationIndex,
    constellationIndex: state.constellationIndex,
    openMenu: state.openMenu,
  }), shallow);

  const { getValues, control } = useFormContext();

  const {
    fields, append, remove,
  } = useFieldArray({
    control,
    name: 'constellations',
    keyName: 'key',
  });
  return (
    <Flex direction="column" align="center" mt={3}>
      <Accordion
        width="100%"
        margin="auto"
        defaultIndex={0}
        index={constellationIndex}
        onChange={setConstellationIndex}
      >
        {fields.map((field, index) => (
          <ConstellationListItem
            constellation={field}
            index={index}
            remove={remove}
            key={field.id}
          />
        ))}
      </Accordion>
      {isEditing ? (
        <Button
          m={5}
          onClick={() => {
            const { length } = getValues('constellations');
            append({
              ...defaultConstellation,
              name: `Constellation ${length + 1}`,
              id: uuidv4(),
            });
            setConstellationIndex(length);
            openMenu('constellationConfig');
          }}
        >
          <AddIcon />
        </Button>
      ) : ''}
    </Flex>

  );
}

export default ConstellationList;
