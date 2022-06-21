import React, { useContext } from 'react'

import { Box, Button, Divider, Flex, FormControl, Input, Text } from "@chakra-ui/react"

import { SignupContext } from './SignupContext'

import './Signup.scss'

const Signup = () => {
    const { showSignUp, setShowSignUp } = useContext(SignupContext)

    const handleLoginClick = () => {
        setShowSignUp(false)
    }

    return (
        <Flex className='signup-container' direction='row' width={{ base: '100%', sm: '950px' }} height={{ base: '100%', sm: '450px' }}>

            {/* Small bio about what the user is registering for */}
            <Flex className='registration-info'>
                <Flex className='title-container' margin='auto auto'>
                    <Text className='reg-info-title'>Create a chatroom.io account</Text>
                </Flex>
                <Flex className='description-container' width='80%' margin='auto auto'>
                    <Text className='reg-info-description'>
                        An account is needed to add friends, be included in groups, and participate in chatrooms.
                        Don’t worry, your email will not be shared with anyone, it will only be used for account creation.
                    </Text>
                </Flex>
                <Flex className='title-container'>
                    <Text className='existing-user-title'>Already have an account?</Text>\
                </Flex>
                <Flex className='existing-user-button'>
                    <Button backgroundColor='#FA2849' isRound='true' width='25%' m='0px 10px' onClick={handleLoginClick}>Login</Button>
                </Flex>
            </Flex>

            {/* Center Divider */}
            <Flex height='90%' margin='auto'><Divider orientation='vertical' borderColor='#FA2849' /></Flex>

            {/* Sign up forms */}
            <Flex className='signup-forms' justify='center'>
                <Text className='signup-title' width='50%' margin='0 auto' >Sign up</Text>
                <Box width='50%' margin='0px auto'>
                    <FormControl>
                        <Input variant='flushed' id='firstname' focusBorderColor=' #FA2849' placeholder='Username' />
                        <Input variant='flushed' id='password' focusBorderColor=' #FA2849' type='password' placeholder='Password' />
                        <Input variant='flushed' id='confirm-pass' focusBorderColor=' #FA2849' type='password' placeholder='Confirm Password' />
                    </FormControl>
                </Box>
                <Flex width='50%' justifyContent='flex-end' m='5px auto'><Button bg='#FA2849'>Submit</Button></Flex>
            </Flex>
        </Flex>
    )
}

export default Signup;