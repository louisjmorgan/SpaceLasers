/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import CustomNumberInput from './CustomNumberInput';

const fields = [
  {
    id: 'pvVoltage',
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
];

function PowerTab({ satIndex, formik }) {
  return (
    <>
      <h3>Photovoltaic</h3>
      <Flex wrap="wrap" justify="space-around" mb={10}>
        {fields.map((param) => (
          <CustomNumberInput
            value={formik.values.satellites[satIndex].power[param.id]}
            step={param.step}
            key={param.id}
            name={`satellites[${satIndex}].power[${param.id}]`}
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
        {[
          {
            id: 'batteryVoltage',
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
          {
            id: 'powerStoringConsumption',
            step: 0.1,
            label: 'Power storing consumption',
            min: 0,
            units: 'W',
          },
        ].map((param) => (
          <CustomNumberInput
            value={formik.values.satellites[satIndex].power[param.id]}
            step={param.step}
            key={param.id}
            name={`satellites[${satIndex}].power[${param.id}]`}
            units={param.units}
            formik={formik}
            label={param.label}
            min={param.min}
            max={param.max}
          />
        ))}
      </Flex>
    </>
  );
}

export default PowerTab;
