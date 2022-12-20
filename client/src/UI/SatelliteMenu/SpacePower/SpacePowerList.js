/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { Flex, List, Text } from '@chakra-ui/layout';
import { AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { useUIStore } from '../../../Model/store';
import SpacePowerConfig from './SpacePowerConfig';
import SpacePowerListItem from './SpacePowerListItem';

function SpacePowerList({ formik, index, constellation }) {
  const { isEditing } = useUIStore((state) => ({
    isEditing: state.isEditing,
  }), shallow);
  const { getValues } = useFormContext();
  return (
    <AccordionItem position="relative" m={0}>
      <Flex
        justify="space-between"
        width="100%"
        gap={5}
        align="center"
        p={1}
        m={0}
      >
        <AccordionButton
          variant="ghost"
          textTransform="uppercase"
          fontSize="1.25rem"
          fontWeight="bold"
          flexBasis="100%"
        >
          <Flex justify="space-between" align="space-between" width="100%">
            <Text mr={5}>
              {getValues(`constellations.${index}.name`)}
            </Text>
            <Text>
              {getValues(`constellations.${index}.spacePowersCount`)}
            </Text>
          </Flex>
        </AccordionButton>
        {/* <Flex flexBasis="auto"> */}
        {/* <ColorPicker
            id={constellation.id}
            onChange={onChangeColor}
            color={formik.values.constellations[index].color}
          /> */}
        {isEditing ? (
          ''
        ) : (''
        // <CustomIconButton
        //   icon={<FaTag />}
        //   onClick={onLabel}
        //   isActive={constellationOptions.showLabel}
        //   label="toggle label"
        // />
        )}
        {/* </Flex> */}
      </Flex>
      <AccordionPanel p={0}>
        {isEditing ? <SpacePowerConfig formik={formik} index={index} />
          : (
            <List width="100%" maxHeight="60vh" overflowY="auto" margin="auto">
              {constellation.spacePowers.map((id, i) => (
                <SpacePowerListItem
                  satellite={id}
                  index={i}
                  isPayload={false}
                  key={id}
                />
              ))}
            </List>
          )}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default SpacePowerList;
