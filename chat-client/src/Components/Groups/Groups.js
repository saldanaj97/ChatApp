import React, { useState, useEffect } from "react";
import { Flex, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { BiMessageAdd } from "react-icons/bi";

import GroupMessage from "./GroupMessage";
import NewGroupPopup from "../Groups/NewGroupPopup.js";
import { fetchUserGroups } from "./GroupServices";
import "./Groups.scss";

const Groups = (props) => {
  const [userChatrooms, setUserChatrooms] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Fetch the groups the user is a part of
    getUserChatrooms();
  }, [setUserChatrooms]);

  /* Call the fetch user groups function from the services to retrieve all the groups the user is a part of */
  const getUserChatrooms = async () => {
    const rooms = await fetchUserGroups();
    setUserChatrooms(rooms);
  };

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
