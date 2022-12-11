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

function SatelliteList({ formik, satIndex, setSatIndex }) {
  const isEditing = useUIStore((state) => state.isEditing);
  return (
    <FormikProvider value={formik}>
      <FieldArray name="satellites">
        {(fieldArrayProps) => {
          const {
            push, remove, form,
          } = fieldArrayProps;
          const { values } = form;
          return (
            <Flex direction="column" align="center">
              <List width="80%" maxHeight="60vh" overflowY="auto" margin="auto">
                {values.satellites.length > 0
                  && values.satellites.map((satellite, index) => (
                    <SatelliteListItem
                      isEditing={isEditing}
                      satellite={satellite}
                      index={index}
                      satIndex={satIndex}
                      setSatIndex={setSatIndex}
                      form={form}
                      remove={remove}
                      key={satellite.id}
                    />
                  ))}
              </List>
              {isEditing ? (
                <Button
                  m={5}
                  onClick={() => {
                    push({
                      ...defaultSatellite,
                      name: `Satellite ${values.satellites.length + 1}`,
                      id: uuidv4(),
                    });
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
