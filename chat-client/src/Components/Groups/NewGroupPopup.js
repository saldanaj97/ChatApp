import React, { useContext, useState } from "react";
import axios from "axios";
import { Input, Text, Button, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { MainContext } from "../../MainContext";
import { createNewGroup } from "./GroupServices";

const NewGroupPopup = (props) => {
  const [groupName, setGroupName] = useState("");
  const { userId } = useContext(MainContext);

  //Handle post request to make a new room
  const handleNewGroup = () => {
    createNewGroup(props, groupName, userId);
  };

  return (
    <Modal isCentered onClose={props.onClose} isOpen={props.isOpen} motionPreset='scale'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>New Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='10px' textAlign='center'>
            What would you like to name the new group?
          </Text>
          <Input variant='flushed' width='100%' borderColor='#FA2849' color='#FA2849' focusBorderColor=' #FA2849' type='text' placeholder='Group Name' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button bg='#FA2849' mr={3} color='white' onClick={handleNewGroup}>
            Create Group
          </Button>
          <Button onClick={props.onClose} color='#FA2849'>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewGroupPopup;
