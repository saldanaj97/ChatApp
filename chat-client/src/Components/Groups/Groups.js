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
