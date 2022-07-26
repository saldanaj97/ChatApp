import React, { useContext, useState } from "react";
import axios from "axios";
import { Input, Text, Button, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { MainContext } from "../../MainContext";

const NewGroupPopup = (props) => {
  const [groupName, setGroupName] = useState("");
  const { userId } = useContext(MainContext);

  //Post request to make a new room
  const handleNewGroup = () => {
    console.log(userId);
    const config = {
      withCredentials: true,
    };
    axios
      .post(
        `http://localhost:3000/room/initiate`,
        {
          groupName: groupName,
          userIds: [userId],
          type: "consumer_to_consumer",
        },
        config
      )
      .then((response) => {
        console.log(response);
        props.onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal isCentered onClose={props.onClose} isOpen={props.isOpen} motionPreset='scale'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
