/* eslint-disable react/prop-types */
import {
  Editable, EditableInput, EditablePreview, Flex, FormControl, Input,
} from '@chakra-ui/react';
import EditableControls from '../MissionPlanner/EditableControls';

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
        justify="space-between"
        p={3}
        px={5}
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
          textAlign="left"
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
