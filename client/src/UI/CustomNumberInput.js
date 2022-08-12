/* eslint-disable react/prop-types */
import {
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput, NumberInputField, NumberInputStepper, Text,
} from '@chakra-ui/react';

function CustomNumberInput({
  value, id, label, name, units, step, setFieldValue,
}) {
  return (
    <FormControl maxWidth="40%" minWidth="20rem" p={5}>
      <FormLabel htmlFor={`${name}`}>{label}</FormLabel>
      <Flex gap={1} align="center">
        <NumberInput
          id={id}
          name={`${name}`}
          onChange={(v) => {
            setFieldValue(
              `${name}`,
              Number(v),
            );
          }}
          value={value}
          step={step}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text>{units}</Text>
      </Flex>
    </FormControl>
  );
}

export default CustomNumberInput;
