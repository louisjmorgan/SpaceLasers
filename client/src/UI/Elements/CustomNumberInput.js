/* eslint-disable react/prop-types */
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput, NumberInputField, NumberInputStepper, Text,
} from '@chakra-ui/react';
import { getIn } from 'formik';
import { useEffect } from 'react';

function CustomNumberInput({
  min, max, label, name, units, step, formik, sideEffect = () => null,
}) {
  const errors = getIn(formik.errors, name);

  return (
    <FormControl
      p={5}
      isInvalid={errors}
      as={Flex}
      direction="column"
      maxWidth="30ch"
    >
      <FormLabel
        htmlFor={`${name}`}
      >
        {label}
      </FormLabel>
      <Flex
        gap={1}
        align="center"
        justify="centerr"
      >
        <NumberInput
          id={name}
          name={`${name}`}
          onChange={(v) => {
            formik.setFieldValue(
              `${name}`,
              v,
            );
            formik.setFieldTouched(`${name}`, true);
            sideEffect();
          }}
          value={getIn(formik.values, name)}
          step={step}
          min={min}
          max={max}
          flex={3}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {units ? <Text flex={1} align="left">{units}</Text> : ''}
      </Flex>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  );
}

export default CustomNumberInput;
