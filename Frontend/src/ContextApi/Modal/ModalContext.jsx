
import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const ModalContext = createContext();

const ModalProvider=({ children })=> {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState({
    heading: "",
    body: null,
    onSave: () => {},
  });

  const showModal = ({ heading, body, onSave }) => {
    setModalContent({ heading, body, onSave });
    onOpen();
  };

  return (
    <ModalContext.Provider value={{ isOpen, onClose, showModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

export default ModalProvider;
