import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Messages from './Components/Messaging/Messages';
import MessageInput from './Components/Messaging/MessageInput';
import DisplayRooms from './Components/Rooms/DisplayRooms';
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/User/Profile';
import Signup from './Components/User/Signup';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  // Establish the connection
  /*   useEffect(() => {
      const newSocket = io(`http://${window.location.hostname}:3000`);
      setSocket(newSocket);
      return () => newSocket.close();
    }, [setSocket]); */


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={DisplayRooms} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/signup' exact component={Signup} />
      </Routes>
    </Router>
  )
  /*   // If the connection has been established, display the messages 
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
}

export default App;
