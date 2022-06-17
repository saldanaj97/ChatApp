import React from 'react'
import { Box, Button, Divider, Flex, FormControl, FormLabel, FormHelperText, Input, Text } from "@chakra-ui/react"
import './Signup.scss'

const Signup = () => {
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
                        Don’t worry, your email will not be shared with anyone. They will only be used for account creation.
                    </Text>
                </Flex>
            </Flex>

            {/* Center Divider */}
            <Flex height='90%' margin='auto'><Divider orientation='vertical' borderColor='#FA2849' /></Flex>

            {/* Sign up forms */}
            <Flex className='signup-forms' margin='5% 0%'>
                <Text className='signup-title' width='50%' margin='0 auto 15px auto' >Sign up</Text>
                <Box width='50%' margin='0px auto'>
                    <FormControl>
                        <Input variant='flushed' id='firstname' focusBorderColor=' #FA2849' placeholder='First name' />
                        <Input variant='flushed' id='lastname' focusBorderColor=' #FA2849' placeholder='Last name' />
                        <Input variant='flushed' id='email' focusBorderColor=' #FA2849' type='email' placeholder='Email' />
                        <Input variant='flushed' id='password' focusBorderColor=' #FA2849' type='password' placeholder='Password' />
                        <Input variant='flushed' id='confirm-pass' focusBorderColor=' #FA2849' placeholder='Confirm Password' />
                    </FormControl>
                </Box>
                <Flex width='50%' justifyContent='flex-end' m='5px auto'><Button bg='#FA2849'>Submit</Button></Flex>
            </Flex>
        </Flex>
    )
}

export default Signup;