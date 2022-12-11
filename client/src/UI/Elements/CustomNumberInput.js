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

function CustomNumberInput({
  value, min, max, label, name, units, step, formik, sideEffect = () => null,
}) {
  const errors = getIn(formik.errors, name);

  return (
    <FormControl
      p={5}
      isInvalid={errors}
      minWidth="30ch"
      maxWidth={`${label.length + 5}ch`}
      as={Flex}
      direction="column"
      align="start"
    >
      <FormLabel
        htmlFor={`${name}`}
        width={`${label.length + 5}ch`}
      >
        {label}
      </FormLabel>
      <Flex
        width="30ch"
        gap={1}
        align="center"
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
          value={value}
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
        <Text flex={1} align="left">{units}</Text>
      </Flex>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  );
}

export default CustomNumberInput;
