// ModalContainer.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
} from "@chakra-ui/react";
import { useModal } from "./ModalContext";

function ModalContainer() {
  const { isOpen, onClose, modalContent } = useModal();

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} className=" bg-slate-900">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalContent.heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} className=" text-lg font-extrabold ">{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              modalContent.onSave();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalContainer;
