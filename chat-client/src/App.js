import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayRooms from './Components/Rooms/DisplayRooms';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import ChatRoomOne from './Components/Rooms/Chat1';
import ChatRoomTwo from './Components/Rooms/Chat2';
import ChatRoomThree from './Components/Rooms/Chat3';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<DisplayRooms />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/roomone' element={<ChatRoomOne />} />
        <Route path='/roomtwo' element={<ChatRoomTwo />} />
        <Route path='/roomthree' element={<ChatRoomThree />} />
      </Routes>
    </Router>
  );

}

export default App;
