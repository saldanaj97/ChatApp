import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { BiMessageAdd } from "react-icons/bi";

import { MainContext } from "../../MainContext";
import GroupMessage from "./GroupMessage";
import "./Groups.scss";

const Groups = (props) => {
  const [userChatrooms, setUserChatrooms] = useState([]);
  const { name, room, roomId, setName, setRoom } = useContext(MainContext);
  let roomsFromResponse = [];

  useEffect(() => {
    // Settings for axios
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

  useEffect(() => {
    // Function that will set the current group name
    const getCurrentChatroomName = () => {
      userChatrooms.find((rooms) => {
        if (rooms.id === roomId) return rooms.groupName;
      });
      return "No room name";
    };
    setRoom(getCurrentChatroomName());
  }, [roomId, userChatrooms, setRoom]);

  return (
    <Flex className='group-container' flexDirection='column' height={{ base: "100%", sm: "400" }}>
      <Flex width={{ base: "100%", sm: "235px" }} height='72px' bg='#FFF' alignItems='center' flexDir='row' justifyContent='space-between' position='fixed' borderRadius='15px 0px 0px 0px'>
        <Heading className='groups-heading' as='h4' size='md' p='15px'>
          Groups
        </Heading>
        <Flex padding='0 15px'>
          <IconButton backgroundColor='#FA2849' isRound='true' color='white' icon={<BiMessageAdd />} fontSize='25px' onClick={props.onOpen}></IconButton>
        </Flex>
      </Flex>

      <Flex direction='column' className='user-group-messages' m='70px 0px 20px'>
        {userChatrooms.map((group) => {
          return <GroupMessage key={group.groupName} group={group} />;
        })}
      </Flex>
    </Flex>
  );
};

export default Groups;
