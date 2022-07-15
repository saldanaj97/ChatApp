import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiList } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
import { Box, Flex, Heading, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import ScrollToBottom from "react-scroll-to-bottom";

import { MainContext } from "../../MainContext";
import { SocketContext } from "../../SocketContext";
import { UsersContext } from "../../UsersContext";

import Groups from "../Groups/Groups";
import Bio from "../Login/Bio";
import NewGroupPopup from "../Groups/NewGroupPopup.js";

import "./Chat.scss";

const Chat = () => {
  const { name, room, setName, setRoom } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const { users } = useContext(UsersContext);

  const [groupName, setGroupName] = useState("");
  const [usersToAddToGroup, setUsersToAddToGroup] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isNewGroupBoxOpen, setIsNewGroupBoxOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  window.onpopstate = (e) => logout();

  //Checks to see if there's a user present
  useEffect(() => {
    if (!name) {
      return navigate("/");
    }
  }, [navigate, name]);

  useEffect(() => {
    /* When the socket gets 'message' we add the new message to the current messages */
    socket.on("message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    /* When the socket gets 'notification' display a notification at the top of the page based on the notification received */
    socket.on("notification", (notif) => {
      toast({
        position: "top",
        title: notif?.title,
        description: notif?.description,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }, [socket, toast]);

  /* Emit the message that was typed into the box when the user hits enter or clicks send*/
  const handleSendMessage = () => {
    socket.emit("sendMessage", message, () => setMessage(""));
    setMessage("");
  };

  /* Handle navigation for when a user logs out */
  const logout = () => {
    setName("");
    setRoom("");
    navigate(0);
  };

  return (
    <Flex className='app-container' flexDirection='row' width={{ base: "100%", sm: "900px" }} height={{ base: "100%", sm: "auto" }}>
      {/* Groups section */}
      <Flex className='groups-pane' width={{ base: "100%", sm: "300px" }} overflowY='auto' scrollBehavior='smooth'>
        <Groups onOpen={onOpen} />
      </Flex>

      {/* New Group popup box*/}
      {isOpen && <NewGroupPopup isOpen={isOpen} onClose={onClose} />}

      {/* Chatroom section*/}
      <Flex className='room' flexDirection='column' width={{ base: "100%", sm: "600px" }} height={{ base: "100%", sm: "auto" }}>
        <Heading className='heading' as='h4' p='1rem 1.5rem' borderRadius='0px 10px 0 0'>
          <Flex alignItems='center' justifyContent='space-between'>
            {/* Menu Button */}
            <Menu>
              <MenuButton as={IconButton} icon={<FiList />} isRound='true' bg='#FA2849' color='white' />
              {
                <MenuList>
                  {users &&
                    users.map((user) => {
                      return (
                        <MenuItem minH='40px' key={user.id}>
                          <Text fontSize='sm'>{user.name}</Text>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              }
            </Menu>
            {/* Logout Button */}
            <Flex alignItems='center' flexDirection='column' flex={{ base: "1", sm: "auto" }}>
              <Heading fontSize='lg'> {room.slice(0, 1).toUpperCase() + room.slice(1)}</Heading>
              <Flex alignItems='center'>
                <Text mr='1' fontWeight='400' fontSize='md' opacity='.7' letterSpacing='0'>
                  {name}
                </Text>
                <Box h={2} w={2} borderRadius='100px' bg='green.300'></Box>
              </Flex>
            </Flex>
            <Button color='gray.500' fontSize='sm' onClick={logout}>
              Logout
            </Button>
          </Flex>
        </Heading>

        {/* Message rendering */}
        <ScrollToBottom className='messages' debug={false}>
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <Box display='flex' key={i} className={`message ${msg.user === name ? "my-message" : ""}`} m='.2rem .2rem'>
                {/*                 <button onClick={() => handleUserBioClick(true)} onMouseLeave={() => handleUserBioClick(false)}>
                  {msg.user !== name && <Avatar size='sm' ml='3px' mr='3px' />}
                </button> */}
                <Box display='flex' flexDirection='column' className='name-msg-block' justifyContent='center'>
                  <Text fontSize='sm' className='msg' p='.4rem .8rem' bg='white' borderRadius='15px' color='white'>
                    {msg.text}
                  </Text>
                </Box>
              </Box>
            ))
          ) : (
            <Flex alignItems='center' justifyContent='center' mt='.5rem' bg='#EAEAEA' opacity='.2' w='100%'>
              <Box mr='2'>-----</Box>
              <BiMessageDetail fontSize='1rem' />
              <Text ml='1' fontWeight='400'>
                No messages
              </Text>
              <Box ml='2'>-----</Box>
            </Flex>
          )}
        </ScrollToBottom>

        {/* Message input box */}
        <div className='form'>
          <input type='text' placeholder='Enter Message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <IconButton background='#FA2849' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMessage} disabled={message === "" ? true : false}>
            Send
          </IconButton>
        </div>
      </Flex>
    </Flex>
  );
};

export default Chat;
