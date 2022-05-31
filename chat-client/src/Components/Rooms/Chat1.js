import React, { useEffect } from 'react'
import io from 'socket.io-client';
import Messages from './Components/Messaging/Messages';
import MessageInput from './Components/Messaging/MessageInput';

const ChatRoomOne = () => {
  return (
    <div>
      <h1>Chat room 1</h1>
    </div>
  )
}

// Establish the connection
/*     
    const [socket, setSocket] = useState(null);
    useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);  // If the connection has been established, display the messages 
  return (
    <div className='App'>
      {socket ? (
        <div className='chat-container'>
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected To Server</div>
      )}
    </div>
  ) */

export default ChatRoomOne;