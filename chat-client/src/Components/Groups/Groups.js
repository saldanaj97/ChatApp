import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Flex, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { BiMessageAdd } from "react-icons/bi";

import GroupMessage from "./GroupMessage";
import NewGroupPopup from "../Groups/NewGroupPopup.js";
import "./Groups.scss";

const Groups = (props) => {
  const [userChatrooms, setUserChatrooms] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let roomsFromResponse = [];

  useEffect(() => {
    const config = {
      withCredentials: true,
    };

    // Request to get the groups the user is part of for the groups panel
    axios
      .get("http://localhost:3000/room/user-messages/", config)
      .then((response) => {
        response.data.roomIds.map((room) => {
          const newRoom = { id: room._id, groupName: room.groupName, lastMessageReceived: { user: "", contents: "" } };
          roomsFromResponse = [newRoom, ...roomsFromResponse];
          setUserChatrooms(roomsFromResponse);
        });
      })
      .catch((error) => {
        console.log("Auth error when retreiving users groups", error);
      });
  }, [setUserChatrooms]);

  return (
    <Flex className='group-container' flexDirection='column' height={{ base: "100%", sm: "400" }}>
      <Flex width={{ base: "100%", sm: "235px" }} height='72px' bg='#FFF' alignItems='center' flexDir='row' justifyContent='space-between' position='fixed' borderRadius='15px 0px 0px 0px'>
        <Heading className='groups-heading' as='h4' size='md' p='15px'>
          Groups
        </Heading>
        <Flex padding='0 15px'>
          <IconButton backgroundColor='#FA2849' isRound='true' color='white' icon={<BiMessageAdd />} fontSize='25px' onClick={onOpen}></IconButton>
        </Flex>
      </Flex>

      {/* New Group popup box*/}
      {isOpen && <NewGroupPopup isOpen={isOpen} onClose={onClose} chatrooms={userChatrooms} setRooms={setUserChatrooms} />}

      <Flex direction='column' className='user-group-messages' m='70px 0px 20px'>
        {userChatrooms.length > 0 ? (
          userChatrooms.map((group) => {
            return <GroupMessage key={group.groupName} group={group} />;
          })
        ) : (
          <Flex m='15px'>You are not currently part of any groups.</Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Groups;
