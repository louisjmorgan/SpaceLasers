import {
  Button, Center, Flex, Modal, ModalBody, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useUIStore } from '../Model/store';
import SPButton from './Elements/SPButton';
import Summary from './PerformanceView/Summary';

function LoopDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isFinished, setFinished, setLoop,
  } = useUIStore((state) => ({
    isFinished: state.isFinished,
    setFinished: state.setFinished,
    setLoop: state.setLoop,
  }), shallow);

  // const setPaused = useSimStore((state) => state.setPaused, shallow);

  useEffect(() => {
    if (isFinished) onOpen();
  }, [isFinished]);

  const handleReplay = () => {
    setLoop(true);
    setFinished(false);
    onClose();
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="lg">
      <ModalOverlay />
      <ModalContent bg="background.300">

        <ModalHeader align="center" fontSize="1.5rem">Simulation Complete!</ModalHeader>
        {/* <ModalCloseButton /> */}
        <Center>
          <ModalBody>
            <Summary />
          </ModalBody>
        </Center>
        <ModalFooter as={Flex} justify="center" width="100%" mb={5}>
          <Center width="100%">
            <SPButton onClick={handleReplay}>
              Restart
            </SPButton>
          </Center>
        </ModalFooter>

      </ModalContent>
    </Modal>
  );
}

export default LoopDialog;
