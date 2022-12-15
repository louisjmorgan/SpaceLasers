/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, List } from '@chakra-ui/layout';
import { FieldArray, FormikProvider } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { defaultSatellite } from '../../Util/defaultInputs';
import { useUIStore } from '../../Model/store';
import SatelliteListItem from './SatelliteListItem';

function SatelliteList({
  formik, constellation,
}) {
  const {
    satIndex, setSatIndex, isEditing, openMenu,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    openMenu: state.openMenu,
  }));
  return (
    <FormikProvider value={formik}>
      <FieldArray name={`constellations[${constellation}].satellites`}>
        {(fieldArrayProps) => {
          const {
            push, remove, form,
          } = fieldArrayProps;
          const { values } = form;
          return (
            <Flex direction="column" align="center">
              <List width="100%" maxHeight="40vh" overflow="auto" margin="auto">
                {values.constellations[constellation].satellites.length > 0
                  && values.constellations[constellation].satellites.map((satellite, i) => (
                    <SatelliteListItem
                      isEditing={isEditing}
                      satellite={satellite}
                      constellation={constellation}
                      index={i}
                      satIndex={satIndex}
                      setSatIndex={setSatIndex}
                      formik={form}
                      remove={remove}
                      key={satellite.id}
                    />
                  ))}
              </List>
              {isEditing ? (
                <Button
                  m={5}
                  onClick={() => {
                    const { length } = values.constellations[constellation].satellites;
                    push({
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
        }}
      </FieldArray>
    </FormikProvider>
  );
}

export default SatelliteList;
