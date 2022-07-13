import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";

import { MainContext } from "../../MainContext";
import { SocketContext } from "../../SocketContext";
import { UsersContext } from "../../UsersContext";
import { SignupContext } from "./SignupContext";

import "./Login.scss";

const Login = () => {
  const socket = useContext(SocketContext);
  const { name, setName, room, setRoom } = useContext(MainContext);
  const { setUsers, loggedIn, setLoggedIn } = useContext(UsersContext);
  const { showSignUp, setShowSignUp } = useContext(SignupContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Checks to see if there's a user already present

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });
  });

  //Emits the login event and if successful redirects to chat and saves user data
  const handleLoginClick = () => {
    /*     socket.emit("identity", { name, room }, () => {
    }); */
    axios.post(`http://localhost:3000/login/${name}/${password}`).then((response) => {
      if (response.data.success !== false) {
        navigate("/chat");
      }
    });
  };

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
          <Input variant='flushed' width='85%' borderColor='#FA2849' color='#FA2849' focusBorderColor=' #FA2849' type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} />
          <Input variant='flushed' width='85%' borderColor='#FA2849' color='#FA2849' focusBorderColor=' #FA2849' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Box className='buttons' width='100%' m='30px 0px 0px 0px' align='center'>
            <Button backgroundColor='#FA2849' width='25%' m='0px 10px' onClick={handleSignUpClick}>
              Sign up
            </Button>
            <Button backgroundColor='#FA2849' width='25%' m='0px 10px' onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
