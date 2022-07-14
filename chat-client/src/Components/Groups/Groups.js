import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";

import { BiRightArrowAlt, BiMessageAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import GroupMessage from "./GroupMessage";
import NewGroupPopup from "./NewGroupPopup";

import "./Groups.scss";

const Groups = (props) => {
  /* Use this to populate the group messages list for UI dev purposes. This will
  later not be used as the data will be filled in dynamically based on a users groups. */
  const testGroups = [
    {
      groupName: "Group 1",
      lastMessageReceived: { user: "Test User 1", contents: "This was the last message sent in group 1. " },
    },
    {
      groupName: "Group 2",
      lastMessageReceived: { user: "Test User 2", contents: "This was the last message sent in group 2. " },
    },
    {
      groupName: "Group 3",
      lastMessageReceived: { user: "Test User 3", contents: "This was the last message sent in group 3. " },
    },
    {
      groupName: "Group 4",
      lastMessageReceived: { user: "Test User 4", contents: "This was the last message sent in group 4. " },
    },
    {
      groupName: "Group 5",
      lastMessageReceived: { user: "Test User 5", contents: "This was the last message sent in group 5. " },
    },
  ];

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
        {testGroups.map((group) => {
          return <GroupMessage group={group} />;
        })}
      </Flex>
    </Flex>
  );
};

export default Groups;
