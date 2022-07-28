import React, { useContext, useState } from "react";
import axios from "axios";
import { Input, Text, Button, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { MainContext } from "../../MainContext";

const NewGroupPopup = (props) => {
  const [groupName, setGroupName] = useState("");
  const { userId } = useContext(MainContext);

  //Handle post request to make a new room
  const handleNewGroup = () => {
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
        const newRoom = { id: response.data.chatRoom.chatRoomId, groupName: groupName, lastMessageReceived: { user: "", contents: "" } };
        const updatedRooms = [newRoom, ...props.chatrooms];
        props.setRooms(updatedRooms);
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
