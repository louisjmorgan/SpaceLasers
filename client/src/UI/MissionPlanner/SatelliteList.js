/* eslint-disable react/prop-types */
import { AddIcon, ChevronRightIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Button, Flex, List, ListItem, VStack,
} from '@chakra-ui/react';
import { FieldArray, FormikProvider } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import CustomEditableInput from './CustomEditableInput';
import { defaultSatellite } from './defaultInputs';

function SatelliteListItem({
  satellite, index, satIndex, setSatIndex, form, remove,
}) {
  return (
    <ListItem
      as={Flex}
      p={1}
      justify="space-around"
      align="center"
      borderRadius={5}
      layerStyle={(index === satIndex) ? 'selected' : ''}
      key={satellite.id}
      onClick={() => setSatIndex(index)}
    >

      {/* <Button
        onClick={() => {
          setSatIndex(index);
        }}
        order={3}
      >
        <ChevronRightIcon />
      </Button> */}

      <CustomEditableInput
        value={satellite.name}
        name={`satellites[${index}].name`}
        form={form}
        onSubmit={() => setSatIndex(index)}
      />
      <Button
        type="button"
        className="secondary"
        onClick={(e) => {
          e.stopPropagation();
          if (index === satIndex) {
            setSatIndex(
              () => (index > 0 ? index - 1 : 0),
            );
          } else if (index < satIndex) {
            setSatIndex((prev) => prev - 1);
          }
          remove(index);
        }}
      >
        <SmallCloseIcon />
      </Button>
    </ListItem>
  );
}

function SatelliteList({ formik, satIndex, setSatIndex }) {
  return (
    <VStack>
      <h2 align="center">Satellites</h2>
      <FormikProvider value={formik}>
        <FieldArray name="satellites">
          {(fieldArrayProps) => {
            const {
              push, remove, form,
            } = fieldArrayProps;
            const { values } = form;
            return (
              <>
                <List width="80%" maxHeight="20rem" overflowY="auto">
                  {values.satellites.length > 0
                  && values.satellites.map((satellite, index) => (
                    <SatelliteListItem
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
                <Button
                  m={5}
                  onClick={() => {
                    push({
                      ...defaultSatellite,
                      name: `Satellite ${values.satellites.length + 1}`,
                      id: uuidv4(),
                    });
                    setSatIndex(values.satellites.length);
                  }}
                >
                  <AddIcon />
                </Button>
              </>
            );
          }}
        </FieldArray>
      </FormikProvider>
    </VStack>
  );
}

export default SatelliteList;
