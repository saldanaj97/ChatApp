import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Center, Divider, Flex, FormControl, Input, Text } from "@chakra-ui/react";

import { MainContext } from "../../MainContext";
import { SignupContext } from "./SignupContext";

import { logUserIn, signUserUp } from "./LoginServices";
import "./Signup.scss";

const Signup = () => {
  const { setShowSignUp } = useContext(SignupContext);
  const { setUserId } = useContext(MainContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowSignUp(false);
  };

  const handleSignUpClick = async () => {
    // Notify the user that the signup has been clicked and the next page is loading
    setLoading(true);

    // This will turn all the user entered data into a json to make the post request
    const newUserInfo = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      type: "consumer",
    };

    // Make the API call with the new user info
    const { success, user } = await signUserUp(newUserInfo).then((response) => response);

    // If teh sign user up call returns success then we navigate to the login page
    if (success === true) {
      // Make the loading circle go away
      setLoading(false);

      // Make a call to the login API
      const { userId } = await logUserIn(username, password);

      // Set the global user variable
      setUserId(userId);
      setShowSignUp(false);
      navigate("/");
    }

    if (success === false) {
      // Otherwise notify the user that they could not be signed up
      setLoading(false);
    }
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
          <Button bg='#FA2849' isLoading={loading} onClick={handleSignUpClick}>
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
