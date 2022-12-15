import { Flex, ListItem } from '@chakra-ui/layout';
import { useState } from 'react';
import {
  FaCamera, FaCog, FaEyeSlash, FaTag, FaTrash,
} from 'react-icons/fa';
import { IoIosColorPalette } from 'react-icons/io';
import { useDebouncyFn } from 'use-debouncy';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../Model/store';
import ColorPicker from '../Elements/ColorPicker';
import CustomEditableInput from '../Elements/CustomEditableInput';
import CustomIconButton from '../Elements/CustomIconButton';

/* eslint-disable react/prop-types */
function SpacePowerListItem({
  satellite, index, constellation, isPayload = true, formik, remove,
}) {
  const {
    isEditing,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
  }), shallow);

  const {
    attachCamera, detachCamera, cameraTarget, toggleVisibility,
    toggleLabel, satelliteOptions, updateName, changeColor,
  } = useSimStore(
    (state) => ({
      isInitialized: state.isInitialized,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
      changeColor: state.changeColor,
      toggleLabel: state.toggleLabel,
      toggleVisibility: state.toggleVisibility,
      satelliteOptions: state.satelliteOptions.get(satellite.id),
      updateName: state.updateName,
    }),
    shallow,
  );

  const onCamera = () => {
    if (cameraTarget.id === satellite.id) detachCamera();
    else attachCamera(satellite.id);
  };

  const onLabel = () => {
    toggleLabel(satellite.id);
  };

  const onEye = () => {
    toggleVisibility(satellite.id);
  };

  const onSubmitName = (v) => {
    updateName(satellite.id, v);
  };

  const onChangeColor = useDebouncyFn(
    (c) => {
      if (!isEditing) changeColor(satellite.id, c);
    },
    400, // number of milliseconds to delay
  );

  return (
    <ListItem
      as={Flex}
      p={1}
      justify="space-around"
      align="center"
      borderRadius={5}
      bg="background.100"
      // layerStyle={(satIndex === index) ? 'selected' : ''}
      key={satellite.id}
      position="relative"
    >
      <CustomEditableInput
        value={satellite.name}
        name={`satellites[${index}].name`}
        formik={formik}
        isDisabled={!isPayload}
        onSubmit={onSubmitName}
      />

      {isEditing ? '' : (
        <>
          <ColorPicker
            id={satellite.id}
            onChange={onChangeColor}
            color={satelliteOptions.color}
          />
          <CustomIconButton
            icon={<FaTag />}
            onClick={onLabel}
            isActive={satelliteOptions.showLabel}
            label="toggle label"
          />
          <CustomIconButton
            icon={<FaEyeSlash />}
            onClick={onEye}
            isActive={!satelliteOptions.isVisible}
            label="toggle visibility"
          />
          <CustomIconButton
            icon={<FaCamera />}
            label="toggle camera"
            onClick={onCamera}
            isActive={cameraTarget.id === satellite.id}
          />
        </>
      )}

    </ListItem>
  );
}
export default SpacePowerListItem;
