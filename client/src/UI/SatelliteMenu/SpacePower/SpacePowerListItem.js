import { Flex, ListItem, Text } from '@chakra-ui/layout';
import {
  FaCamera, FaEyeSlash, FaTag,
} from 'react-icons/fa';
import { useDebouncyFn } from 'use-debouncy';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../../Model/store';
import ColorPicker from '../../Elements/ColorPicker';
import CustomIconButton from '../../Elements/CustomIconButton';

/* eslint-disable react/prop-types */
function SpacePowerListItem({
  satellite,
}) {
  const {
    isEditing,
  } = useUIStore((state) => ({
    isEditing: state.isEditing,
  }), shallow);

  const {
    attachCamera, detachCamera, cameraTarget, toggleVisibility,
    toggleLabel, satelliteOptions, changeColor,
  } = useSimStore(
    (state) => ({
      isInitialized: state.isInitialized,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
      changeColor: state.changeColor,
      toggleLabel: state.toggleLabel,
      toggleVisibility: state.toggleVisibility,
      satelliteOptions: state.satelliteOptions.get(satellite),
      updateName: state.updateName,
    }),
    shallow,
  );

  const onCamera = () => {
    if (cameraTarget.id === satellite) detachCamera();
    else attachCamera(satellite);
  };

  const onLabel = () => {
    toggleLabel(satellite);
  };

  const onEye = () => {
    toggleVisibility(satellite);
  };

  const onChangeColor = useDebouncyFn(
    (c) => {
      if (!isEditing) changeColor(satellite, c);
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
      key={satellite.id}
      position="relative"
    >
      <Text
        flexBasis="100%"
        textAlign="left"
        p={4}
        px={5}
      >
        {(satelliteOptions.name)}
      </Text>
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
            isActive={cameraTarget.id === satellite}
          />
        </>
      )}

    </ListItem>
  );
}
export default SpacePowerListItem;
