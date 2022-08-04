import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

import { MainContext } from "../../MainContext";
import { SocketContext } from "../../SocketContext";
import { UsersContext } from "../../UsersContext";
import { SignupContext } from "./SignupContext";

import "./Login.scss";
import { getRecentConvo, logUserIn } from "./LoginServices";

const Login = () => {
  const socket = useContext(SocketContext);
  const { name, setName, setUserId, setRoomId } = useContext(MainContext);
  const { setUsers } = useContext(UsersContext);
  const { setShowSignUp } = useContext(SignupContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validLoginInfo, setValidLoginInfo] = useState(true);
  const navigate = useNavigate();

  //Checks to see if there's a user already present

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });

  //Send a login request which returns a jsonwebtoken for authentication
  const handleLoginClick = async () => {
    // Notify the UI that the user has clicked the login and the chat is now loading
    setLoading(true);

    // Post request to log the user in
    const { success, userId } = await logUserIn(name, password);

    // Request to get the ID of the last conversation the user was active in
    const conversationId = await getRecentConvo();

    // User has logged in successfully
    if (success === true) {
      // Set the global user ID and the roomId
      setUserId(userId);
      setRoomId(conversationId);
      setValidLoginInfo(true);

      // Subscribe and navigate to the last group chat he was part of
      socket.emit("subscribe", conversationId);
      navigate(`/chat/${conversationId}`);
    }

    // If sucess was false, then inform the user the login did go through
    if (success === false) {
      // Set the loading indicator to false since we are not waiting on the login req anymore
      setLoading(false);

      // Set the valid login info var to false so the error message is shown
      setValidLoginInfo(false);
    }
  };

  /* Function to handle when a user clicks on the sign up button */
  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <Flex direction='column'>
      {/* Container that will hold the forms and buttons  */}
      <Flex className='login-container' direction='column' width={{ base: "100%", sm: "450px" }} height={{ base: "100%", sm: "375px" }} justifyContent='space-evenly'>
        {/* Login Message */}
        <Flex direction='column'>
          <Box className='login-message'>
            <Text color='#FA2849'>Log in</Text>
          </Box>
          <Text align='center' color='white' m='5px 20px'>
            If you already have an existing account, go ahead and log in. Otherwise, you can sign up by clicking below.{" "}
          </Text>
        </Flex>

        {/* Forms and sign up/login buttons */}
        <Flex className='form' gap='1rem' flexDirection='column' align='center'>
          <Input
            variant='flushed'
            focusBorderColor='#FA2849'
            type='text'
            placeholder='Username'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setValidLoginInfo(true);
            }}
          />
          <Input
            variant='flushed'
            focusBorderColor='#FA2849'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidLoginInfo(true);
            }}
          />
          {!validLoginInfo ? (
            <Box className='invalid-login-msg' color='#FA2849'>
              <Text fontWeight='light'>You've entered the wrong username or password. </Text>
            </Box>
          ) : null}
          <Box className='buttons' width='100%' m='15px 0px 15px 0px' align='center'>
            <Button onClick={handleSignUpClick}>Sign up</Button>
            <Button isLoading={loading} onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
