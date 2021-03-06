import React, { useContext, useState } from "react";
import axios from "axios";

import { Box, Button, Center, Divider, Flex, FormControl, Input, Text } from "@chakra-ui/react";

import { SignupContext } from "./SignupContext";

import "./Signup.scss";

const Signup = () => {
  const { setShowSignUp } = useContext(SignupContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    // This will turn all the user entered data into a json to make the post request
    const newUserInfo = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      type: "consumer",
    });

    axios.post(`http://localhost:3000/users/`, newUserInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Flex className='signup-container' direction='column' width={{ base: "100%", sm: "450px" }} height={{ base: "100%", sm: "600px" }}>
      {/* Heading and description */}
      <Flex className='reg-title-and-desc' direction='column' m='15px'>
        <Box className='title-container' textAlign='center'>
          <Text className='reg-info-title'>Create an account</Text>
        </Box>
        <Center className='description-container' m='0px 20px' textAlign='center'>
          <Text className='reg-info-description'>An account is required to add friends, be included in groups, and participate in chatrooms.</Text>
        </Center>
      </Flex>

      {/* Sign up forms */}
      <Flex className='signup-forms' m='0px auto 15px auto'>
        <Text className='signup-title' textAlign='center'>
          Sign up
        </Text>
        <Box width='100%' margin='0px auto'>
          <FormControl>
            <Input variant='flushed' id='firstname' focusBorderColor=' #FA2849' placeholder='First Name' value={firstName || ""} onChange={(e) => setFirstName(e.target.value)} />
            <Input variant='flushed' id='lastname' focusBorderColor=' #FA2849' placeholder='Last Name' value={lastName || ""} onChange={(e) => setLastName(e.target.value)} />
            <Input variant='flushed' id='username' focusBorderColor=' #FA2849' placeholder='Username' value={username || ""} onChange={(e) => setUsername(e.target.value)} />
            <Input variant='flushed' id='password' focusBorderColor=' #FA2849' type='password' placeholder='Password' value={password || ""} onChange={(e) => setPassword(e.target.value)} />
            <Input variant='flushed' id='confirm-pass' focusBorderColor=' #FA2849' type='password' placeholder='Confirm Password' />
          </FormControl>
        </Box>
        <Flex width='100%' justifyContent='center' m='10px auto'>
          <Button bg='#FA2849' onClick={handleSignUpClick}>
            Sign up
          </Button>
        </Flex>
      </Flex>

      {/* Divider */}
      <Flex margin='auto' width='95%'>
        <Divider borderColor='#FA2849' orientation='horizontal' />
      </Flex>

      {/* Login option for existing users */}
      <Flex className='existing-user' direction='column' m='15px'>
        <Box className='title-container' textAlign='center'>
          <Text className='existing-user-title'>Already have an account?</Text>
        </Box>
        <Flex className='existing-user-button' justify='center' m='10px 0 10px 0'>
          <Button backgroundColor='#FA2849' width='25%' onClick={handleLoginClick}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
