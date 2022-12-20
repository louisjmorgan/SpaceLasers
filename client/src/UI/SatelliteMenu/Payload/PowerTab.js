/* eslint-disable react/prop-types */
import {
  Box, Flex, FormControl, FormLabel, Select, VStack,
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';
import { useFormContext, useWatch } from 'react-hook-form';
import { useUIStore } from '../../../Model/store';
import CustomNumberInput from '../../Elements/CustomNumberInput';
import SPButton from '../../Elements/SPButton';

const pvFields = [
  {
    id: 'voltage',
    step: 0.1,
    label: 'Voltage',
    min: 0,
    units: 'V',
  },
  {
    id: 'currentDensity',
    step: 0.1,
    label: 'Current Density',
    min: 0,
    units: (
      <span>
        Am
        <sup>-2</sup>
      </span>
    ),
  },
  {
    id: 'area',
    step: 0.001,
    label: 'Area',
    min: 0,
    units: (
      <span>
        m
        <sup>2</sup>
      </span>
    ),
  },
  {
    id: 'powerStoringConsumption',
    step: 0.1,
    label: 'Power storing consumption',
    min: 0,
    units: 'W',
  },
];

const batteryFields = [
  {
    id: 'voltage',
    step: 0.1,
    label: 'Voltage',
    min: 0,
    units: 'V',
  },
  {
    id: 'capacity',
    step: 0.01,
    label: 'Capacity',
    min: 0,
    units: 'Ah',
  },
];

const batteryPresets = [{
  name: 'Small (6Ah)',
  id: 'small',
  values: {
    voltage: 3.6,
    capacity: 6,
  },
},
{
  name: 'Medium (30Ah)',
  id: 'medium',
  values: {
    voltage: 3.6,
    capacity: 30,
  },
},
{
  name: 'Large (60Ah)',
  id: 'large',
  values: {
    voltage: 3.6,
    capacity: 60,
  },
},
{
  name: 'Custom (Advanced)',
  id: 'custom',
},
];

const pvPresets = [{
  name: 'Small (5W)',
  id: 'small',
  values: {
    voltage: 4.7,
    currentDensity: 170.5,
    area: 0.0064,
    powerStoringConsumption: 1.2,
  },
},
{
  name: 'Medium (10W)',
  id: 'medium',
  values: {
    currentDensity: 170.5,
    area: 0.0128,
    powerStoringConsumption: 2.4,
    voltage: 4.7,
  },
},
{
  name: 'Large (20W)',
  id: 'large',
  values: {
    currentDensity: 170.5,
    area: 0.0256,
    powerStoringConsumption: 3.6,
    voltage: 4.7,
  },
},
{
  name: 'Custom (Advanced)',
  id: 'custom',
},
];

function PowerTab({ address, isConstellation = false }) {
  const { isAdvanced, constellationIndex, satIndex } = useUIStore((state) => ({
    satIndex: state.satIndex,
    constellationIndex: state.constellationIndex,
    isAdvanced: state.isAdvanced,
  }), shallow);

  const { getValues, setValue } = useFormContext();

  const powerValues = useWatch({ name: `${address}.power` });

  const handleCopyToSiblings = () => {
    const sats = getValues(`constellations.${constellationIndex}.satellites`);
    [...pvFields, { id: 'preset' }].forEach((param) => {
      sats.forEach((satellite, index) => {
        if (index === satIndex) return;
        setValue(
          `constellations.${constellationIndex}.satellites.${index}.power.pv.${param.id}.`,
          getValues(`${address}.power.pv.${param.id}`),
        );
      });
    });
    [...batteryFields, { id: 'preset' }].forEach((param) => {
      sats.forEach((satellite, index) => {
        if (index === satIndex) return;
        setValue(
          `constellations.${constellationIndex}.satellites.${index}.power.battery.${param.id}.`,
          getValues(`${address}.power.battery.${param.id}`),
        );
      });
    });
  };

  const onChooseBattery = (e) => {
    setValue(`${address}.power.battery.preset`, e.target.value);
    if (e.target.value === 'custom') return;
    const { values } = batteryPresets.find((v) => v.id === e.target.value);
    batteryFields.forEach((param) => {
      setValue(`${address}.power.battery.${param.id}`, values[param.id]);
    });
  };

  const onChoosePv = (e) => {
    setValue(`${address}.power.pv.preset`, e.target.value);
    if (e.target.value === 'custom') return;
    const { values } = pvPresets.find((v) => v.id === e.target.value);
    pvFields.forEach((param) => {
      setValue(`${address}.power.pv.${param.id}.`, values[param.id]);
    });
  };

  return (
    <>
      {isAdvanced ? (
        <>
          <h3>Battery</h3>
          <Flex wrap="wrap" justify="start">
            {batteryFields.map((param) => (
              <CustomNumberInput
                step={param.step}
                key={param.id}
                name={`${address}.power.battery.${param.id}`}
                units={param.units}
                sideEffect={() => {
                  if (getValues(`${address}.power.battery.preset`) !== 'custom') setValue(`${address}.power.battery.preset`, 'custom');
                }}
                label={param.label}
                min={param.min}
                max={param.max}
              />
            ))}
          </Flex>
          <h3>Photovoltaic</h3>
          <Flex wrap="wrap" justify="start" mb={5}>
            {pvFields.map((param) => (
              <CustomNumberInput
                step={param.step}
                key={param.id}
                name={`${address}.power.pv.${param.id}`}
                sideEffect={() => setValue(`${address}.power.pv.preset`, 'custom')}
                units={param.units}
                label={param.label}
                min={param.min}
                max={param.max}
              />
            ))}
          </Flex>

        </>
      ) : (
        <VStack maxWidth="60ch" gap={10} p={5}>
          <FormControl>
            <FormLabel>Choose battery:</FormLabel>
            <Select
              onChange={onChooseBattery}
              value={powerValues.battery.preset}
            >
              {batteryPresets.map((preset) => (
                <option value={preset.id} key={preset.id}>{preset.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Choose photovoltaic:</FormLabel>
            <Select
              onChange={onChoosePv}
              value={powerValues.pv.preset}
            >
              {pvPresets.map((preset) => (
                <option value={preset.id} key={preset.id}>{preset.name}</option>
              ))}
            </Select>
          </FormControl>
        </VStack>
      )}
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

export default PowerTab;
