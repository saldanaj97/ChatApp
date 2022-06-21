import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react"

import { MainContext } from '../../MainContext'
import { SocketContext } from '../../SocketContext'
import { UsersContext } from '../../UsersContext'
import { SignupContext } from './SignupContext'

import './Login.scss'

const Login = () => {
  const socket = useContext(SocketContext)
  const { name, setName, room, setRoom } = useContext(MainContext)
  const navigate = useNavigate()
  const { setUsers, loggedIn, setLoggedIn } = useContext(UsersContext)
  const { showSignUp, setShowSignUp } = useContext(SignupContext)

  //Checks to see if there's a user already present

  useEffect(() => {
    socket.on("users", users => {
      setUsers(users)
    })
  })

  //Emits the login event and if successful redirects to chat and saves user data
  const handleClick = () => {
    socket.emit('login', { name, room }, () => {
      navigate('/chat')
    })
  }

  const handleSignUpClick = () => {
    setShowSignUp(true);
  }

  return (
    <Flex direction='column'>

      {/* Container that will hold the forms and buttons  */}
      <Flex className='login-container' direction='column' width={{ base: '100%', sm: '450px' }} height={{ base: '100%', sm: '350px' }} justifyContent='space-evenly'>

        {/* Login Message */}
        <Box className='login-message'><Text color='white'>Log in to chatroom.io</Text></Box>

        {/* Forms and sign up/login buttons */}
        <Flex className='form' gap='1rem' flexDirection='column' align='center'>
          <Input variant='flushed' width='85%' borderColor='#FA2849' color='#FA2849' focusBorderColor=' #FA2849' type="text" placeholder='Username' value={name} onChange={e => setName(e.target.value)} />
          <Input variant='flushed' width='85%' borderColor='#FA2849' color='#FA2849' focusBorderColor=' #FA2849' type='password' placeholder='Password' value={room} onChange={e => console.log(e.target.value)} />
          <Box className='buttons' width='100%' m='30px 0px 0px 0px' align='center'>
            <Button backgroundColor='#FA2849' isRound='true' width='25%' m='0px 10px' onClick={handleSignUpClick}>Sign up</Button>
            <Button backgroundColor='#FA2849' isRound='true' width='25%' m='0px 10px' onClick={handleClick}>Login</Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login