import {
  Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStore } from '../Model/store';
import Summary from './PerformanceView/Summary';

function LoopDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isFinished, setFinished, setLoop, setPaused,
  } = useStore((state) => ({
    isFinished: state.isFinished,
    setFinished: state.setFinished,
    setLoop: state.setLoop,
    setPaused: state.setPaused,
  }));

  useEffect(() => {
    if (isFinished) onOpen();
  }, [isFinished]);

  const handleReplay = (e) => {
    setLoop(true);
    setFinished(false);
    onClose();
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="lg">
      <ModalOverlay />
      <ModalContent bg="background.100">

        <ModalHeader align="center" fontSize="1.5rem">Simulation Complete!</ModalHeader>
        {/* <ModalCloseButton /> */}
        <Center>
          <ModalBody>
            <Summary />
          </ModalBody>
        </Center>
        <ModalFooter>
          <Button onClick={handleReplay}>
            Restart
          </Button>

        </ModalFooter>

      </ModalContent>
    </Modal>
  );
}

export default LoopDialog;
