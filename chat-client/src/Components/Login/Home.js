import React, { useState, useContext } from "react";

import { Box, Collapse, Flex, Heading } from "@chakra-ui/react";

import { UsersContext } from "../../UsersContext";
import { SignupContext, SignupProvider } from "./SignupContext";

import Login from "./Login";
import Signup from './Signup'

const Home = () => {
  const { showSignUp, setShowSignUp } = useContext(SignupContext)

  return (
    <Flex direction='column'>
      {/* Title */}
      <Heading as="h1" size="3xl" textAlign='center' mb='20px' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px' color='#FA2849'>Chatroom.io</Heading>
      <Collapse startingHeight={400} in={showSignUp}>
        {showSignUp ? <Signup /> : <Login />}
      </Collapse>
    </Flex >
  )
}

export default Home