/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Editable, EditableInput, EditablePreview, FormControl, Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
// import EditableControls from '../MissionPlanner/EditableControls';

function CustomEditableInput({
  value, name, onSubmit = () => null, isDisabled = false,
}) {
  const { setValue, register } = useFormContext();
  return (
    <FormControl maxWidth="20ch">
      <Editable
        submitOnBlur
        defaultValue={value}
        textAlign="left"
        isDisabled={isDisabled}
        p={3}
        px={5}
        onSubmit={(v) => {
          setValue(name, v);
          onSubmit(v);
        }}
        onCancel={(v) => {
          setValue(name, v);
        }}
        onClick={(e) => { e.stopPropagation(); }}
      >
        <EditablePreview />
        <Input
          textAlign="left"
          as={EditableInput}
          id="name"
          {...register(name)}
          type="text"
          variant="filled"
        />
        {/* <EditableControls /> */}
      </Editable>
    </FormControl>
  );
}

export default CustomEditableInput;
