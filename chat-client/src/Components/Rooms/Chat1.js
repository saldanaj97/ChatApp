import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import Messages from '../Messaging/Messages';
import MessageInput from '../Messaging/MessageInput';
import './ChatStyles';
import { ChatBox, ChatroomPageContainer, PageHeading } from './ChatStyles';

const ChatRoomOne = () => {
  // Establish the connection
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // If the connection has been established, display the messages 
  return (
    <ChatroomPageContainer>
      <PageHeading>Room One</PageHeading>
      {socket ? (
        <ChatBox>
          <Messages socket={socket} />
        </ChatBox>
      ) : (
        <div>Not Connected To Server</div>
      )}
      <MessageInput socket={socket} />
    </ChatroomPageContainer>
  )
}

export default ChatRoomOne;