/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Portal,
  Button,
  Box,
} from '@chakra-ui/react';
import { HexColorPicker } from 'react-colorful';
import { useSimStore } from '../../Model/store';

function ColorPicker({
  color, onChange,
}) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      placement="bottom-start"
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button p={2}>
          <Box
            width="100%"
            height="100%"
            backgroundColor={color}
            borderRadius={2}
          />
        </Button>
      </PopoverTrigger>
      <Portal
        appendToParentPortal={false}
      >
        <PopoverContent
          width="auto"
          backgroundColor="transparent"
          border="0px"
        >
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p={0}>
            <HexColorPicker color={color} onChange={onChange} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default ColorPicker;
