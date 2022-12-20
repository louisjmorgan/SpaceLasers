/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button,
  Flex, FormControl, FormLabel, Select,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import CustomNumberInput from '../../Elements/CustomNumberInput';
import { defaultDuty } from '../../../Util/defaultInputs';
import SPButton from '../../Elements/SPButton';
import { useUIStore } from '../../../Model/store';
import CustomEditableInput from '../../Elements/CustomEditableInput';

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

function DutyTab({ address, isConstellation = false }) {
  const { constellationIndex, satIndex } = useUIStore((state) => ({
    constellationIndex: state.constellationIndex,
    satIndex: state.satIndex,
  }));

  const {
    getValues, setValue, register,
  } = useFormContext();
  const {
    fields, append, remove,
  } = useFieldArray({
    name: `${address}.duties`,
  });
  const handleCopyToSiblings = () => {
    const sats = getValues(`constellations.${constellationIndex}.satellites`);
    sats.forEach((s, index) => {
      if (index === satIndex) return;
      setValue(
        `constellations.${constellationIndex}.satellites.${index}.duties`,
        getValues(`${address}.duties`),
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
        {fields.map((field, index) => (
          <AccordionItem key={field.id}>
            <AccordionButton>
              <Flex align="center" justify="space-between" width="100%" px={5}>
                <CustomEditableInput
                  value={getValues(`${address}.duties.${index}.name`)}
                  name={`${address}.duties.${index}.name`}
                  // onSubmit={onSubmitName}
                />
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Flex wrap="wrap" justify="space-around">
                <FormControl width="65%">
                  <FormLabel htmlFor={`${address}.duties.${index}.type`}>Type</FormLabel>
                  <Select
                    {...register(`${address}.duties${index}.type`)}
                  >
                    <option value="cyclical">Cyclical</option>
                  </Select>
                </FormControl>
                <>
                  {defaultFields.map((param) => (
                    <CustomNumberInput
                      step={param.step}
                      key={param.id}
                      name={`${address}.duties.${index}.${param.id}`}
                      units={param.units}
                      label={param.label}
                    />
                  ))}
                  {field.type === 'cyclical' ? (
                    cyclicalFields.map((param) => (
                      <CustomNumberInput
                        step={param.step}
                        key={param.id}
                        name={`${address}.duties.${index}.${param.id}`}
                        units={param.units}
                        label={param.label}
                      />
                    ))) : ''}
                </>
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
        ))}
        <Button
          m={5}
          onClick={(e) => {
            e.preventDefault();
            const { length } = getValues(`${address}.duties`);
            append({
              ...defaultDuty,
              name: `Duty ${length + 1}`,
              priority: length + 1,
            });
          }}
        >
          <AddIcon />
        </Button>
      </Accordion>
      {isConstellation || (
      <Box m={10}>
        <SPButton onClick={handleCopyToSiblings}>
          Copy to constellation
        </SPButton>
      </Box>
      )}
    </>
  );
}

export default DutyTab;
