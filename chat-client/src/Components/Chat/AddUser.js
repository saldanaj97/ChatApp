import React, { useContext, useState } from "react";
import { Input, Text, Button, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

const AddUser = (props) => {
  const [userToAdd, setUserToAdd] = useState("");

  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  return (
    <Modal isCentered onClose={props.onClose} isOpen={props.isOpen} motionPreset='scale'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='10px' textAlign='center'>
            What's the username of the person you want to add to the chat?
          </Text>
          <Input variant='flushed' width='100%' borderColor='#FA2849' color='#FA2849' focusBorderColor=' #FA2849' type='text' placeholder='Username' value={userToAdd} onChange={(e) => setUserToAdd(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button bg='#FA2849' mr={3} color='white' onClick={handleAddUser}>
            Add User
          </Button>
          <Button onClick={props.onClose} color='#FA2849'>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUser;