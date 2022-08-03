import { MessageInputBox } from "./MessageInputBox";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

import { Flex, useDisclosure } from "@chakra-ui/react";
import "./Chat.scss";

import { MainContext } from "../../MainContext";
import { SocketContext } from "../../SocketContext";

import { fetchCurrentGroupName, retrieveGroupMessages, sendMessageInGroup } from "./ChatServices";
import { ChatroomHeader } from "./ChatroomHeader";
import { MessageBubble, NoMessages } from "./MessageBubble";
import Groups from "../Groups/Groups";

const Chat = () => {
  const { name, room, roomId, setName, setRoom, setRoomId } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let messagesInConvo = [];

  window.onpopstate = (e) => logout();

  //Checks to see if there's a user logged in, if not we redirect to login page
  useEffect(() => {
    if (!name) {
      return navigate("/");
    }
  }, [navigate, name]);

  useEffect(() => {
    /* Get all the messages in the current group */
    getMessagesInGroup(roomId);

    /* Get the name of the chatroom we are in and update the state */
    getGroupName(roomId);

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

  /* Get the groupname using the fetch current group name service defined in the chatservices file */
  const getGroupName = async (roomId) => {
    const groupName = await fetchCurrentGroupName(roomId);
    setRoom(groupName);
  };

  /* Emit the message that was typed into the box when the user hits enter or clicks send*/
  const handleSendMessage = () => {
    socket.emit("sendMessage", roomId, message, name, () => setMessage(""));
    sendMessageInGroup(roomId, message);
    setMessage("");
  };

  /* Function to get all the messages from a particular chatroom/group */
  const getMessagesInGroup = async (newRoomId) => {
    const conversation = await retrieveGroupMessages(newRoomId);
    conversation.map((convo) => {
      return (messagesInConvo = [...messagesInConvo, { messageText: convo.message.messageText, authorInfo: convo.postedByUser.username }]);
    });
    setMessages(messagesInConvo);
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
      <Flex className='groups-pane' width={{ base: "100%", sm: "250px" }} overflowY='auto' overflowX='hidden' scrollBehavior='smooth'>
        <Groups />
      </Flex>
      <Flex className='room' flexDirection='column' width={{ base: "100%", sm: "600px" }} height={{ base: "100%", sm: "auto" }}>
        <ChatroomHeader onOpen={onOpen} isOpen={isOpen} onClose={onClose} roomId={roomId} room={room} name={name} logout={logout} />
        <ScrollToBottom className='messages'>
          {messages.length > 0 ? (
            messages.map((msg, i) => {
              return <MessageBubble message={msg} i={i} name={name} />;
            })
          ) : (
            <NoMessages />
          )}
        </ScrollToBottom>
        <MessageInputBox message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
      </Flex>
    </Flex>
  );
};

export default Chat;
