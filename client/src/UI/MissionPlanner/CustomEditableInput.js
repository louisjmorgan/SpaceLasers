/* eslint-disable react/prop-types */
import {
  Editable, EditableInput, EditablePreview, Flex, FormControl, Input,
} from '@chakra-ui/react';
import EditableControls from './EditableControls';

function CustomEditableInput({
  value, name, form, onSubmit,
}) {
  return (
    <FormControl>
      <Editable
        as={Flex}
        submitOnBlur
        defaultValue={value}
        align="center"
        width="auto"
        cursor="pointer"
        justify="center"
        onSubmit={(v) => {
          form.setFieldValue(
            `${name}`,
            v,
          );
          onSubmit();
        }}
        onCancel={(v) => {
          form.setFieldValue(
            `${name}`,
            v,
          );
        }}
      >
        <EditablePreview />
        <Input
          textAlign="center"
          as={EditableInput}
          id="name"
          name={name}
          type="text"
          variant="filled"
        />
        <EditableControls />
      </Editable>
    </FormControl>
  );
}

export default CustomEditableInput;
