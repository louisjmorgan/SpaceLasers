/* eslint-disable react/prop-types */
import {
  Box,
  Button, Flex, FormControl, FormLabel, Select, VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../Model/store';
import CustomNumberInput from '../Elements/CustomNumberInput';
import SPButton from '../Elements/SPButton';

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

function PowerTab({ formik }) {
  const { satIndex, isAdvanced } = useUIStore((state) => ({
    satIndex: state.satIndex,
    constellations: state.constellations,
    isAdvanced: state.isAdvanced,
  }), shallow);

  const handleCopyToSiblings = () => {
    pvFields.forEach((param) => {
      formik.values.satellites.forEach((satellite, index) => {
        if (index === satIndex) return;
        formik.setFieldValue(
          `satellites[${index}].power[${param.id}]`,
          formik.values.satellites[satIndex].power[param.id],
        );
      });
    });
    batteryFields.forEach((param) => {
      formik.values.satellites.forEach((satellite, index) => {
        if (index === satIndex) return;
        formik.setFieldValue(
          `satellites[${index}].power[${param.id}]`,
          formik.values.satellites[satIndex].power[param.id],
        );
      });
    });
  };

  const onChooseBattery = (e) => {
    if (e.target.value === 'Custom (Advanced)') return;
    formik.setFieldValue(`satellites[${satIndex}].power.battery.preset`, e.target.value);
    const { values } = batteryPresets.find((v) => v.name === e.target.value);

    batteryFields.forEach((param) => {
      formik.setFieldValue(`satellites[${satIndex}].power.battery[${param.id}]`, values[param.id]);
    });
  };

  const onChoosePv = (e) => {
    formik.setFieldValue(`satellites[${satIndex}].power.pv.preset`, e.target.value);
    if (e.target.value === 'Custom (Advanced)') return;
    const { values } = pvPresets.find((v) => v.name === e.target.value);
    pvFields.forEach((param) => {
      formik.setFieldValue(`satellites[${satIndex}].power.pv[${param.id}]`, values[param.id]);
    });
  };

  useEffect(() => {
    if (!formik.touched.satellites) return;
    if (!formik.touched.satellites[satIndex].power) return;
    if (formik.touched.satellites[satIndex].power.battery) {
      formik.setFieldValue(`satellites[${satIndex}].power.battery.preset`, 'Custom (Advanced)');
    }
    if (formik.touched.satellites[satIndex].power.pv) {
      formik.setFieldValue(`satellites[${satIndex}].power.pv.preset`, 'Custom (Advanced)');
    }
  }, [formik.touched]);

  return (
    <>
      {isAdvanced ? (
        <>
          <h3>Photovoltaic</h3>
          <Flex wrap="wrap" justify="space-around" mb={5}>
            {pvFields.map((param) => (
              <CustomNumberInput
                value={formik.values.satellites[satIndex].power.pv[param.id]}
                step={param.step}
                key={param.id}
                name={`satellites[${satIndex}].power.pv[${param.id}]`}
                units={param.units}
                formik={formik}
                label={param.label}
                min={param.min}
                max={param.max}
              />
            ))}
          </Flex>
          <h3>Battery</h3>
          <Flex wrap="wrap" justify="space-around">
            {batteryFields.map((param) => (
              <CustomNumberInput
                value={formik.values.satellites[satIndex].power.battery[param.id]}
                step={param.step}
                key={param.id}
                name={`satellites[${satIndex}].power.battery[${param.id}]`}
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
              value={formik.values.satellites[satIndex].power.battery.preset}
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
              value={formik.values.satellites[satIndex].power.pv.preset}
            >
              {pvPresets.map((preset) => (
                <option value={preset.name} key={preset.name}>{preset.name}</option>
              ))}
              <option value="Custom (Advanced)" key="custom">Custom (Advanced)</option>
            </Select>
          </FormControl>
        </VStack>
      )}
      <Box m={10}>
        <SPButton onClick={handleCopyToSiblings}>
          Copy to all
        </SPButton>
      </Box>
    </>
  );
}

export default PowerTab;
