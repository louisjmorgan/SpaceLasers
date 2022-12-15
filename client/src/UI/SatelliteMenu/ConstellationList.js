/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { FieldArray, FormikProvider } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';
import { Accordion } from '@chakra-ui/react';
import { useUIStore } from '../../Model/store';
import ConstellationListItem from './ConstellationListItem';
import { defaultConstellation } from '../../Util/defaultInputs';

function ConstellationList({
  formik,
}) {
  const {
    isEditing, setConstellationIndex, openMenu,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    setConstellationIndex: state.setConstellationIndex,
    openMenu: state.openMenu,
  }), shallow);
  return (
    <FormikProvider value={formik}>
      <FieldArray name="constellations">
        {(fieldArrayProps) => {
          const {
            push, remove, form,
          } = fieldArrayProps;
          const { values } = form;
          return (
            <Flex direction="column" align="center" mt={3}>
              <Accordion
                width="100%"
                margin="auto"
                defaultIndex={0}
                allowToggle
              >
                {values.constellations.length > 0
                  && values.constellations.map((constellation, i) => (
                    <ConstellationListItem
                      constellation={constellation}
                      index={i}
                      formik={form}
                      remove={remove}
                      key={constellation.id}
                    />
                  ))}
              </Accordion>
              {isEditing ? (
                <Button
                  m={5}
                  onClick={() => {
                    const { length } = values.constellations;
                    push({
                      name: `Constellation ${length + 1}`,
                      ...defaultConstellation,
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
        }}
      </FieldArray>
    </FormikProvider>
  );
}

export default ConstellationList;
