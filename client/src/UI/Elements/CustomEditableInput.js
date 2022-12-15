/* eslint-disable react/prop-types */
import {
  Editable, EditableInput, EditablePreview, Flex, FormControl, Input,
} from '@chakra-ui/react';
// import EditableControls from '../MissionPlanner/EditableControls';

function CustomEditableInput({
  value, name, formik, onSubmit, isDisabled = false,
}) {
  return (
    <FormControl>
      <Editable
        as={Flex}
        submitOnBlur
        defaultValue={value}
        align="center"
        width="auto"
        justify="space-between"
        isDisabled={isDisabled}
        p={3}
        px={5}
        onSubmit={(v) => {
          formik.setFieldValue(
            `${name}`,
            v,
          );
          onSubmit(v);
        }}
        onCancel={(v) => {
          formik.setFieldValue(
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
        {/* <EditableControls /> */}
      </Editable>
    </FormControl>
  );
}

export default CustomEditableInput;
