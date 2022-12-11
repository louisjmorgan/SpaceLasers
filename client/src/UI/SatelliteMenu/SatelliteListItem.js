import { Flex, ListItem } from '@chakra-ui/layout';
import {
  FaCamera, FaCog, FaEye, FaEyeSlash, FaTag, FaTrash,
} from 'react-icons/fa';
import shallow from 'zustand/shallow';
import { useSimStore, useUIStore } from '../../Model/store';
import CustomEditableInput from '../Elements/CustomEditableInput';
import CustomIconButton from '../Elements/CustomIconButton';

/* eslint-disable react/prop-types */
function SatelliteListItem({
  satellite, index, isPayload = true, form, remove,
}) {
  const {
    satIndex, setSatIndex, openMenu, isOpen, setEditing, isEditing,
  } = useUIStore((state) => ({
    satIndex: state.satIndex,
    setSatIndex: state.setSatIndex,
    openMenu: state.openMenu,
    isOpen: state.isOpen,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
  }), shallow);

  const {
    attachCamera, detachCamera, cameraTarget, toggleVisibility,
    toggleLabel, satelliteOptions, updateName,
  } = useSimStore(
    (state) => ({
      isInitialized: state.isInitialized,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
      toggleLabel: state.toggleLabel,
      toggleVisibility: state.toggleVisibility,
      satelliteOptions: state.satelliteOptions,
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
    if (!isEditing) setEditing(true);
    setSatIndex(index);
    openMenu({ target: { value: 'satelliteConfig' } });
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
    >
      <CustomEditableInput
        value={satellite.name}
        name={`satellites[${index}].name`}
        form={form}
        isDisabled={!isPayload}
        onSubmit={onSubmitName}
      />
      {isEditing ? (isPayload && (
      <CustomIconButton
        className="secondary"
        onClick={onRemove}
        icon={<FaTrash />}
        label="remove"
      />
      )) : (
        <>
          <CustomIconButton
            icon={<FaTag />}
            onClick={onLabel}
            isActive={satelliteOptions.get(satellite.id).showLabel}
            label="toggle label"
          />
          <CustomIconButton
            icon={<FaEyeSlash />}
            onClick={onEye}
            isActive={!satelliteOptions.get(satellite.id).isVisible}
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
      {isPayload && (
      <CustomIconButton
        icon={<FaCog />}
        onClick={onCog}
        isActive={(index === satIndex) && isOpen.satelliteConfig}
        value="satelliteConfig"
      />
      )}
    </ListItem>
  );
}
export default SatelliteListItem;
