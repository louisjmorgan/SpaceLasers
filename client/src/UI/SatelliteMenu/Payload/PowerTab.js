/* eslint-disable react/prop-types */
import {
  Box, Flex, FormControl, FormLabel, Select, VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { getIn } from 'formik';
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
  { id: 'preset' },
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
  { id: 'preset' },
];

const batteryPresets = [{
  name: 'Small (6Ah)',
  values: {
    voltage: 3.6,
    capacity: 6,
  },
},
{
  name: 'Medium (30Ah)',
  values: {
    voltage: 3.6,
    capacity: 30,
  },
},
{
  name: 'Large (60Ah)',
  values: {
    voltage: 3.6,
    capacity: 60,
  },
},
];

const pvPresets = [{
  name: 'Small (5W)',
  values: {
    voltage: 4.7,
    currentDensity: 170.5,
    area: 0.0064,
    powerStoringConsumption: 1.2,
  },
},
{
  name: 'Medium (10W)',
  values: {
    currentDensity: 170.5,
    area: 0.0128,
    powerStoringConsumption: 2.4,
    voltage: 4.7,
  },
},
{
  name: 'Large (20W)',
  values: {
    currentDensity: 170.5,
    area: 0.0256,
    powerStoringConsumption: 3.6,
    voltage: 4.7,
  },
},
];

function PowerTab({ formik, address, isConstellation = false }) {
  const { isAdvanced, constellationIndex, satIndex } = useUIStore((state) => ({
    satIndex: state.satIndex,
    constellationIndex: state.constellationIndex,
    isAdvanced: state.isAdvanced,
  }), shallow);

  const handleCopyToSiblings = () => {
    pvFields.forEach((param) => {
      formik.values.constellations[constellationIndex].satellites.forEach((satellite, index) => {
        console.log(getIn(formik.values, `${address}.power.pv[${param.id}`));
        if (index === satIndex) return;
        formik.setFieldValue(
          `constellations[${constellationIndex}]satellites[${index}].power.pv[${param.id}]`,
          getIn(formik.values, `${address}.power.pv[${param.id}`),
        );
      });
    });
    batteryFields.forEach((param) => {
      formik.values.constellations[constellationIndex].satellites.forEach((satellite, index) => {
        if (index === satIndex) return;
        formik.setFieldValue(
          `constellations[${constellationIndex}]satellites[${index}].power.battery[${param.id}]`,
          getIn(formik.values, `${address}.power.battery[${param.id}`),
        );
      });
    });
  };

  const onChooseBattery = (e) => {
    if (e.target.value === 'Custom (Advanced)') return;
    formik.setFieldValue(`${address}.power.battery.preset`, e.target.value);
    const { values } = batteryPresets.find((v) => v.name === e.target.value);

    batteryFields.forEach((param) => {
      formik.setFieldValue(`${address}.power.battery[${param.id}]`, values[param.id]);
    });
  };

  const onChoosePv = (e) => {
    formik.setFieldValue(`${address}.power.pv.preset`, e.target.value);
    if (e.target.value === 'Custom (Advanced)') return;
    const { values } = pvPresets.find((v) => v.name === e.target.value);
    pvFields.forEach((param) => {
      formik.setFieldValue(`${address}.power.pv[${param.id}]`, values[param.id]);
    });
  };

  useEffect(() => {
    if (!formik.touched.satellites) return;
    if (!getIn(formik.touched, `${address}.power`)) return;
    if (!getIn(formik.touched, `${address}.power.battery`)) {
      formik.setFieldValue(`constellations[${constellationIndex}].${address}.power.battery.preset`, 'Custom (Advanced)');
    }
    if (!getIn(formik.touched, `${address}.power.pv`)) {
      formik.setFieldValue(`constellations[${constellationIndex}].${address}.power.pv.preset`, 'Custom (Advanced)');
    }
  }, [formik.touched]);

  return (
    <>
      {isAdvanced ? (
        <>
          <h3>Photovoltaic</h3>
          <Flex wrap="wrap" justify="start" mb={5}>
            {pvFields.map((param) => (
              <CustomNumberInput
                step={param.step}
                key={param.id}
                name={`${address}.power.pv[${param.id}]`}
                units={param.units}
                formik={formik}
                label={param.label}
                min={param.min}
                max={param.max}
              />
            ))}
          </Flex>
          <h3>Battery</h3>
          <Flex wrap="wrap" justify="start">
            {batteryFields.map((param) => (
              <CustomNumberInput
                step={param.step}
                key={param.id}
                name={`${address}.power.battery[${param.id}]`}
                units={param.units}
                formik={formik}
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
              value={getIn(formik.values, `${address}.power.battery.preset`)}
            >
              {batteryPresets.map((preset) => (
                <option value={preset.name} key={preset.name}>{preset.name}</option>
              ))}
              <option value="Custom (Advanced)" key="custom">Custom (Advanced)</option>

            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Choose photovoltaic:</FormLabel>
            <Select
              onChange={onChoosePv}
              value={getIn(formik.values, `${address}.power.pv.preset`)}
            >
              {pvPresets.map((preset) => (
                <option value={preset.name} key={preset.name}>{preset.name}</option>
              ))}
              <option value="Custom (Advanced)" key="custom">Custom (Advanced)</option>
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
