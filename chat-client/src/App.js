import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayRooms from './Components/Rooms/DisplayRooms';
import Navbar from './Components/Navbar';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<DisplayRooms />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );

}

export default App;
