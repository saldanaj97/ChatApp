import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";

import { BiRightArrowAlt, BiMessageAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import GroupMessage from "./GroupMessage";

import "./Groups.scss";

const Groups = (props) => {
  const [userChatrooms, setUserChatrooms] = useState([]);
  var usersRooms = [];

  useEffect(() => {
    axios
      .get("http://localhost:3000/room/user-messages/", { withCredentials: true })
      .then((response) => {
        response.data.roomIds.map((room) => {
          let newRoom = { groupName: room, lastMessageReceived: { user: "", contents: "" } };
          usersRooms = [newRoom, ...usersRooms];
          setUserChatrooms(usersRooms);
        });
      })
      .catch((error) => {
        console.log("Auth error when retreiving users groups", error);
      });
  }, [userChatrooms]);

  return (
    <Flex className='group-container' flexDirection='column' width={{ base: "100%" }} height={{ base: "100%", sm: "400" }}>
      <Heading className='heading' as='h4' bg='white' p='1rem 1rem' borderRadius='10px 10px 0 0'>
        <Flex alignItems='center' flexDir='row' justifyContent='space-between'>
          <Flex flex={{ base: "1", sm: "auto" }}>
            <Box fontSize='lg'> Groups </Box>
          </Flex>
          <Flex>
            <IconButton backgroundColor='#FA2849' isRound='true' color='white' icon={<BiMessageAdd />} fontSize='25px' onClick={props.onOpen}></IconButton>
          </Flex>
        </Flex>
      </Heading>

      <Flex direction='column' className='user-group-messages'>
        {userChatrooms.map((group) => {
          return <GroupMessage key={group.groupName} group={group} />;
        })}
      </Flex>
    </Flex>
  );
};

export default Groups;
