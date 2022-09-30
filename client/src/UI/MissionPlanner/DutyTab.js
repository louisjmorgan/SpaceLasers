/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button,
  Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, Input, Select,
} from '@chakra-ui/react';
import { FieldArray, FormikProvider } from 'formik';
import CustomNumberInput from './CustomNumberInput';
import { defaultDuty } from './defaultInputs';
import EditableControls from './EditableControls';

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

function DutyTab({ satIndex, formik }) {
  const handleCopyToSiblings = () => {
    formik.values.satellites.forEach((satellite, index) => {
      console.log(formik.values);
      if (index === satIndex) return;
      formik.setFieldValue(
        `satellites[${index}].duties`,
        formik.values.satellites[satIndex].duties,
      );
    });
  };

  return (
    <>
      <Accordion
        maxHeight="75vh"
        overflowY="auto"
        width="100%"
      >
        <FormikProvider value={formik}>
          <FieldArray name={`satellites[${satIndex}].duties`}>
            {(fieldArrayProps) => {
              const {
                push, remove, form,
              } = fieldArrayProps;
              const { values } = form;
              const satellite = values.satellites[satIndex];
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
                              `satellites[${satIndex}].duties[${index}].name`,
                              v,
                            );
                          }}
                          value={duty.name}
                        >
                          <EditablePreview />
                          <Input
                            as={EditableInput}
                            id="name"
                            name={`satellites[${satIndex}].duties[${index}].name`}
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
                          <FormLabel htmlFor={`satellites[${satIndex}].duties[${index}].type`}>Type</FormLabel>
                          <Select
                            name={`satellites[${satIndex}].duties[${index}].type`}
                            onChange={form.handleChange}
                            value={duty.type}
                          >
                            <option value="cyclical">Cyclical</option>
                          </Select>
                        </FormControl>
                        {fields.map((param) => (
                          <CustomNumberInput
                            value={duty[param.id]}
                            step={param.step}
                            key={param.id}
                            name={`satellites[${satIndex}].duties[${index}][${param.id}]`}
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
      <Button onClick={handleCopyToSiblings}>
        Copy to all
      </Button>
    </>
  );
}

export default DutyTab;
