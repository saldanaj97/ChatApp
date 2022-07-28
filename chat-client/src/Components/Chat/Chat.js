import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

import { BiMessageDetail } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";

import { Box, Flex, Heading, IconButton, Text, Button, useDisclosure } from "@chakra-ui/react";
import "./Chat.scss";

import { MainContext } from "../../MainContext";
import { SocketContext } from "../../SocketContext";
import { UsersContext } from "../../UsersContext";

import Groups from "../Groups/Groups";
import AddUser from "./AddUser";

const Chat = () => {
  const { name, room, roomId, setName, setRoom, setRoomId } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const { users } = useContext(UsersContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let messagesInConvo = [];

  window.onpopstate = (e) => logout();

  //Checks to see if there's a user present
  useEffect(() => {
    if (!name) {
      return navigate("/");
    }
  }, [navigate, name]);

  useEffect(() => {
    getMessagesInGroup(roomId);

    /* When the socket gets 'message' we add the new message to the current messages */
    socket.on("message", (msg) => {
      messagesInConvo = [...messagesInConvo, { messageText: msg.text, authorInfo: msg.author }];
      setMessages(messagesInConvo);
    });

    /* When the socket gets 'mvoeroom' we clear the messages convo ref since we do not want to get the messages from the last room */
    socket.on("moveRoom", (newRoomId) => {
      setRoomId(newRoomId);
      messagesInConvo = [];
      getMessagesInGroup(newRoomId);
    });
    setMessages(messagesInConvo);
  }, [setMessages, setRoomId, setRoom]);

  /* Emit the message that was typed into the box when the user hits enter or clicks send*/
  const handleSendMessage = () => {
    socket.emit("sendMessage", roomId, message, name, () => setMessage(""));
    const config = {
      withCredentials: true,
    };
    axios.post(`http://localhost:3000/room/${roomId}/message`, { messageText: message }, config);
    setMessage("");
  };

  /* Function to get all the messages from a particular chatroom/group */
  const getMessagesInGroup = (newRoomId) => {
    const config = {
      withCredentials: true,
    };
    axios.get(`/room/${newRoomId}`, config).then((response) => {
      response.data.conversation.map((convo) => {
        messagesInConvo = [...messagesInConvo, { messageText: convo.message.messageText, authorInfo: convo.postedByUser.username }];
      });
      setMessages(messagesInConvo);
    });
  };

  /* Handle navigation for when a user logs out */
  const logout = () => {
    setName("");
    setRoom("");
    setRoomId("");
    navigate(0);
  };

  return (
    <Flex className='app-container' flexDirection='row' width={{ base: "100%", sm: "900px" }} height={{ base: "100%", sm: "auto" }}>
      {/* Groups section */}
      <Flex className='groups-pane' width={{ base: "100%", sm: "250px" }} overflowY='auto' scrollBehavior='smooth'>
        <Groups />
      </Flex>

      {/* Chatroom section*/}
      <Flex className='room' flexDirection='column' width={{ base: "100%", sm: "600px" }} height={{ base: "100%", sm: "auto" }}>
        <Heading className='heading' as='h4' p='1rem 1.5rem' borderRadius='0px 10px 0 0'>
          <Flex alignItems='center' justifyContent='space-between'>
            {/* Add user to chat*/}
            <Flex>
              <IconButton backgroundColor='#FA2849' isRound='true' color='white' icon={<FiUserPlus />} fontSize='25px' onClick={onOpen}></IconButton>
            </Flex>
            {isOpen && <AddUser isOpen={isOpen} onClose={onClose} />}

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
              <Box display='flex' key={i} className={`message ${msg.authorInfo === name ? "my-message" : ""}`} m='.2rem .2rem'>
                <Box display='flex' key={i} m='.2rem .2rem'>
                  <Box display='flex' flexDirection='column' className='name-msg-block' justifyContent='center'>
                    <Text fontSize='sm' className='msg' p='.4rem .8rem' bg='white' borderRadius='15px' color='black'>
                      {msg.messageText}
                    </Text>
                  </Box>
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
