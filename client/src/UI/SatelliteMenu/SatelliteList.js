/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Flex, List, ListItem } from '@chakra-ui/layout';
import { FieldArray, FormikProvider } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import {
  FaCamera, FaCog, FaEye, FaTag, FaTrash,
} from 'react-icons/fa';
import shallow from 'zustand/shallow';
import { defaultSatellite } from '../../Util/defaultInputs';
import CustomEditableInput from '../Elements/CustomEditableInput';
import { useSimStore, useUIStore } from '../../Model/store';
import CustomIconButton from '../Elements/CustomIconButton';

function SatelliteListItem({
  satellite, index, form, remove,
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
    toggleLabel, toggleAllLabels, satelliteOptions, isInitialized,
  } = useSimStore(
    (state) => ({
      isInitialized: state.isInitialized,
      attachCamera: state.attachCamera,
      detachCamera: state.detachCamera,
      cameraTarget: state.cameraTarget,
      toggleLabel: state.toggleLabel,
      toggleAllLabels: state.toggleAllLabels,
      toggleVisibility: state.toggleVisibility,
      satelliteOptions: state.satelliteOptions,
    }),
    shallow,
  );

  const onRemove = () => {
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

  return (
    <ListItem
      as={Flex}
      p={1}
      justify="space-around"
      align="center"
      borderRadius={5}
      bg="background.200"
      // layerStyle={(satIndex === index) ? 'selected' : ''}
      key={satellite.id}
    >
      <CustomEditableInput
        value={satellite.name}
        name={`satellites[${index}].name`}
        form={form}
        onSubmit={() => null}
      />
      {isEditing ? (
        <CustomIconButton
          className="secondary"
          onClick={onRemove}
          icon={<FaTrash />}
          label="remove"
        />
      ) : (
        <>
          <CustomIconButton
            icon={<FaTag />}
            onClick={onLabel}
            isActive={satelliteOptions.get(satellite.id).showLabel}
            label="toggle label"
          />
          <CustomIconButton
            icon={<FaEye />}
            onClick={onEye}
            isActive={satelliteOptions.get(satellite.id).isVisible}
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
      <CustomIconButton
        icon={<FaCog />}
        onClick={onCog}
        isActive={(index === satIndex) && isOpen.satelliteConfig}
        value="satelliteConfig"
      />
    </ListItem>
  );
}

function SatelliteList({ formik, satIndex, setSatIndex }) {
  const isEditing = useUIStore((state) => state.isEditing);
  return (
    <FormikProvider value={formik}>
      <FieldArray name="satellites">
        {(fieldArrayProps) => {
          const {
            push, remove, form,
          } = fieldArrayProps;
          const { values } = form;
          return (
            <Flex direction="column" align="center">
              <List width="80%" maxHeight="60vh" overflowY="auto" margin="auto">
                {values.satellites.length > 0
                  && values.satellites.map((satellite, index) => (
                    <SatelliteListItem
                      isEditing={isEditing}
                      satellite={satellite}
                      index={index}
                      satIndex={satIndex}
                      setSatIndex={setSatIndex}
                      form={form}
                      remove={remove}
                      key={satellite.id}
                    />
                  ))}
              </List>
              {isEditing ? (
                <Button
                  m={5}
                  onClick={() => {
                    push({
                      ...defaultSatellite,
                      name: `Satellite ${values.satellites.length + 1}`,
                      id: uuidv4(),
                    });
                  }}
                >
                  <AddIcon />
                </Button>
              ) : ''}

            </Flex>
          );
        }}
      </FieldArray>
    </FormikProvider>
  );
}

export default SatelliteList;
