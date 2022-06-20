import React, { useState, useContext } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { UsersContext } from "../../UsersContext";

import Login from "./Login";
import Signup from "./Signup";


const Home = () => {
  const { loggedIn, setLoggedIn } = useContext(UsersContext)

  return (
    <Box direction='column'>
      {/* Title */}
      <Heading as="h1" size="3xl" textAlign='center' mb='20px' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px' color='#FA2849'>Chatroom.io</Heading>
      {loggedIn ? console.log('logged in ') : <Login />}
    </Box >
  )
}

export default Home