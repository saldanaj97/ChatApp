import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayRooms from './Components/Rooms/DisplayRooms';
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/User/Profile';
import Signup from './Components/User/Signup';
import './App.css';

function App() {
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

}

export default App;
