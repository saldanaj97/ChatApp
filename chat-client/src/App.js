import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Components/Messaging/Messages';
import MessageInput from './Components/Messaging/MessageInput';

import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  // Establish the connection
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // If the connection has been established, display the messages 
  return (
    <div className='App'>
      <header className='app-header'>Chat</header>
      {socket ? (
        <div className='chat-container'>
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected To Server</div>
      )}
    </div>
  )
}

export default App;
