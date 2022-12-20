import { Flex, ListItem } from '@chakra-ui/layout';
import { useFormContext } from 'react-hook-form';
import {
  FaCamera, FaCog, FaEyeSlash, FaTag, FaTrash,
} from 'react-icons/fa';
import { useDebouncyFn } from 'use-debouncy';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../../Model/store';
import ColorPicker from '../../Elements/ColorPicker';
import CustomEditableInput from '../../Elements/CustomEditableInput';
import CustomIconButton from '../../Elements/CustomIconButton';

/* eslint-disable react/prop-types */
function SatelliteListItem({
  satellite, index, constellation, isPayload = true, remove,
}) {
  const {
    satIndex, setSatIndex, setConstellationIndex,
    openMenu, isOpen, isEditing,
  } = useUIStore((state) => ({
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    setConstellationIndex: state.setConstellationIndex,
    openMenu: state.openMenu,
    isOpen: state.isOpen,
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

  const onRemove = () => {
    if (!isPayload) return;
    if (index === satIndex) {
      setSatIndex(
        () => (index > 0 ? index - 1 : 0),
      );
    } else if (index < satIndex) {
      setSatIndex((prev) => prev - 1);
    }
    remove(index);
  };

  const onCog = () => {
    setSatIndex(index);
    setConstellationIndex(constellation);
    openMenu('satelliteConfig');
  };

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

  const { getValues, setValue } = useFormContext();

  const onChangeColor = useDebouncyFn(
    (c) => {
      setValue(`constellations.${constellation}.satellites.${index}.color`, c);
      if (satelliteOptions) changeColor(satellite.id, c);
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
      <CustomEditableInput
        value={satellite.name}
        name={`constellations.${constellation}.satellites.${index}.name`}
        isDisabled={!isPayload}
        onSubmit={onSubmitName}
      />
      <ColorPicker
        id={satellite.id}
        onChange={onChangeColor}
        color={getValues(`constellations.${constellation}.satellites.${index}.color`)}
      />
      {isEditing ? (
        <>
          <CustomIconButton
            className="secondary"
            onClick={onRemove}
            icon={<FaTrash />}
            label="remove"
          />
          <CustomIconButton
            icon={<FaCog />}
            onClick={onCog}
            isActive={(index === satIndex) && isOpen.satelliteConfig}
            value="satelliteConfig"
          />
        </>
      ) : (
        <>
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
export default SatelliteListItem;
