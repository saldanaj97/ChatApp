import React, { useContext } from 'react'

import { Box, Button, Center, Divider, Flex, FormControl, Input, Text } from "@chakra-ui/react"

import { SignupContext } from './SignupContext'

import './Signup.scss'

const Signup = () => {
    const { showSignUp, setShowSignUp } = useContext(SignupContext)

    const handleLoginClick = () => {
        setShowSignUp(false)
    }

    return (
        <Flex className='signup-container' direction='column' width={{ base: '100%', sm: '450px' }} height={{ base: '100%', sm: '500px' }} >
            <Flex className='reg-title-and-desc' direction='column' m='15px'>
                <Box className='title-container' textAlign='center'>
                    <Text className='reg-info-title'>Create an account</Text>
                </Box>
                <Center className='description-container' m='5px 20px' textAlign='center'>
                    <Text className='reg-info-description'>
                        An account is required to add friends, be included in groups, and participate in chatrooms.
                    </Text>
                </Center>
            </Flex>

            {/* Sign up forms */}
            <Flex className='signup-forms' m='15px auto'>
                <Text className='signup-title' textAlign='left'>Sign up</Text>
                <Box width='100%' margin='0px auto'>
                    <FormControl>
                        <Input variant='flushed' id='firstname' focusBorderColor=' #FA2849' placeholder='Username' />
                        <Input variant='flushed' id='password' focusBorderColor=' #FA2849' type='password' placeholder='Password' />
                        <Input variant='flushed' id='confirm-pass' focusBorderColor=' #FA2849' type='password' placeholder='Confirm Password' />
                    </FormControl>
                </Box>
                <Flex width='100%' justifyContent='center' m='5px auto'><Button bg='#FA2849'>Sign up</Button></Flex>
            </Flex>

            {/* Divider */}
            <Flex margin='auto' width='95%'><Divider borderColor='#FA2849' orientation='horizontal' /></Flex>

            {/* Login option for existing users */}
            <Flex className='existing-user' direction='column' m='10px'>
                <Box className='title-container' textAlign='center'>
                    <Text className='existing-user-title'>Already have an account?</Text>
                </Box>
                <Flex className='existing-user-button' justify='center' m='10px 0 10px 0'>
                    <Button backgroundColor='#FA2849' isRound='true' width='25%' onClick={handleLoginClick}>Login</Button>
                </Flex>
            </Flex >
        </Flex >
    )
}

export default Signup;