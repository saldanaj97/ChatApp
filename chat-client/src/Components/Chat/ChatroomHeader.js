import { UsersMenu } from "./UsersMenu";
import React, { useContext } from "react";
import { UsersContext } from "../../UsersContext";
import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import AddUser from "./AddUser";

/* This function is responsible for rendering the header of the chatroom containing username, roomname, add user button, and logout button  */
export function ChatroomHeader({ onOpen, isOpen, onClose, roomId, room, name, logout }) {
  const { users } = useContext(UsersContext);

  return (
    <Heading className='heading' as='h4' p='1rem 1.5rem' borderRadius='0px 10px 0 0'>
      <Flex alignItems='center'>
        <IconButton backgroundColor='#FA2849' isRound='true' color='white' icon={<FiUserPlus />} fontSize='25px' onClick={onOpen}></IconButton>
        {isOpen && <AddUser isOpen={isOpen} onClose={onClose} roomId={roomId} />}

        <Flex alignItems='center' flexDirection='column' ml='15%' flex={{ base: "1", sm: "auto" }}>
          <Heading fontSize='lg'> {room.slice(0, 1).toUpperCase() + room.slice(1)}</Heading>
          <Flex alignItems='center'>
            <Text mr='1' fontWeight='400' fontSize='md' opacity='.7' letterSpacing='0'>
              {name}
            </Text>
            <Box h={2} w={2} borderRadius='100px' bg='green.300'></Box>
          </Flex>
        </Flex>

        <Flex flexDirection='row'>
          <UsersMenu users={users} />
          <Button color='gray.500' fontSize='sm' onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Heading>
  );
}
