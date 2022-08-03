import React, { useContext } from "react";

import { Collapse, Flex, Heading } from "@chakra-ui/react";

import { SignupContext } from "./SignupContext";

import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const { showSignUp } = useContext(SignupContext);

  return (
    <Flex direction='column' filter='dropShadow(16px 16px 10px black)'>
      {/* Title */}
      <Heading as='h1' size='3xl' textAlign='center' mb='20px' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px' color='#FA2849'>
        Chatroom.io
      </Heading>
      <Collapse startingHeight={450} in={showSignUp}>
        {showSignUp ? <Signup /> : <Login />}
      </Collapse>
    </Flex>
  );
};

export default Home;
