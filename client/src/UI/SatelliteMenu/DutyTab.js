/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button,
  Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Input, Select,
} from '@chakra-ui/react';
import { FieldArray, FormikProvider, getIn } from 'formik';
import CustomNumberInput from '../Elements/CustomNumberInput';
import { defaultDuty } from '../../Util/defaultInputs';
import EditableControls from '../MissionPlanner/EditableControls';
import SPButton from '../Elements/SPButton';
import { useUIStore } from '../../Model/store';

const defaultFields = [
  {
    id: 'consumption',
    step: 0.1,
    label: 'Consumption',
    min: 0,
    units: 'W',
  },
  {
    id: 'priority',
    step: 1,
    min: 1,
    label: 'Priority',
  }];

const cyclicalFields = [
  {
    id: 'cycles',
    steps: 0.1,
    label: 'Cycles per orbit',
    min: 0,
    units: 'cycles',
  },
  {
    id: 'duration',
    steps: 1,
    label: 'Cycle duration',
    min: 0,
    units: 's',
  },
];

function DutyTab({ address, formik }) {
  const { constellationIndex, satIndex } = useUIStore((state) => ({
    constellationIndex: state.constellationIndex,
    satIndex: state.satIndex,
  }));

  const handleCopyToSiblings = () => {
    formik.values.constellations[constellationIndex].satellites.forEach((satellite, index) => {
      console.log(getIn(formik.values, `${address}.duties`));
      if (index === satIndex) return;
      formik.setFieldValue(
        `constellations[${constellationIndex}]satellites[${index}].duties`,
        getIn(formik.values, `${address}.duties`),
      );
    });
  };
  return (
    <>
      <Accordion
        maxHeight="75vh"
        overflowY="auto"
        width="100%"
        allowToggle
      >
        <FormikProvider value={formik}>
          <FieldArray name={`${address}.duties`}>
            {(fieldArrayProps) => {
              const {
                push, remove, form,
              } = fieldArrayProps;
              const satellite = getIn(formik.values, `${address}`);
              const allFields = satellite.duties.map((duty, index) => {
                const fields = [...defaultFields];
                if (duty.type === 'cyclical') {
                  fields.push(
                    ...cyclicalFields,
                  );
                }
                return (
                  <AccordionItem width="100%" key={`${satellite.id}${index}`}>
                    <AccordionButton>
                      <FormControl as={Flex}>
                        <Editable
                          as={Flex}
                          align="center"
                          justify="center"
                          width="100%"
                          cursor="pointer"
                          onChange={(v) => {
                            form.setFieldValue(
                              `${address}.duties[${index}].name`,
                              v,
                            );
                          }}
                          value={duty.name}
                        >
                          <EditablePreview />
                          <Input
                            as={EditableInput}
                            id="name"
                            name={`${address}.duties[${index}].name`}
                            type="text"
                            variant="filled"
                            maxWidth="80%"
                          />
                          <EditableControls />
                        </Editable>
                        <AccordionIcon />
                      </FormControl>
                    </AccordionButton>
                    <AccordionPanel>
                      <Flex wrap="wrap" justify="space-around">
                        <FormControl width="65%">
                          <FormLabel htmlFor={`${address}.duties[${index}].type`}>Type</FormLabel>
                          <Select
                            name={`${address}.duties[${index}].type`}
                            onChange={form.handleChange}
                            value={duty.type}
                          >
                            <option value="cyclical">Cyclical</option>
                          </Select>
                        </FormControl>
                        {fields.map((param) => (
                          <CustomNumberInput
                            step={param.step}
                            key={param.id}
                            name={`${address}.duties[${index}][${param.id}]`}
                            units={param.units}
                            formik={form}
                            label={param.label}
                          />
                        ))}

                      </Flex>
                      <Button
                        m={5}
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Remove
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                );
              });
              return (
                <>
                  {allFields}
                  <Button
                    m={5}
                    onClick={(e) => {
                      e.preventDefault();
                      push({
                        ...defaultDuty,
                        name: `Duty ${satellite.duties.length + 1}`,
                        priority: satellite.duties.length + 1,
                      });
                    }}
                  >
                    <AddIcon />
                  </Button>
                </>
              );
            }}
          </FieldArray>
        </FormikProvider>
      </Accordion>
      <Box m={10}>
        <SPButton onClick={handleCopyToSiblings}>
          Copy to all
        </SPButton>
      </Box>
    </>
  );
}

export default DutyTab;
