/* eslint-disable react/jsx-props-no-spreading */
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
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useFormContext } from 'react-hook-form';

function CustomNumberInput({
  min, max, label, name, units, step, sideEffect = () => null,
}) {
  const { control, formState: { errors } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange, onBlur, value, ref,
        },
      }) => (
        <FormControl
          p={5}
          as={Flex}
          direction="column"
          maxWidth="30ch"
        >
          <FormLabel
            htmlFor={name}
          >
            {label}
          </FormLabel>
          <Flex
            gap={1}
            align="center"
            justify="center"
          >
            <NumberInput
              id={name}
              step={step}
              min={min}
              max={max}
              flex={3}
              ref={ref}
              onChange={(v) => {
                onChange(parseFloat(v));
                sideEffect(v);
              }}
              onBlur={onBlur}
              value={value}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {units ? <Text flex={1} align="left">{units}</Text> : ''}
          </Flex>
          <ErrorMessage
            errors={errors}
            name={`${name}`}
            render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
          />
        </FormControl>
      )}
    />

  );
}

export default CustomNumberInput;
