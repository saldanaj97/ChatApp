import React from 'react'
import { Box, Button, Divider, Flex, FormControl, FormLabel, FormHelperText, Input, Text } from "@chakra-ui/react"
import './Signup.scss'

const Signup = () => {
    return (
        <Flex className='signup-container' direction='row' width={{ base: '100%', sm: '950px' }} height={{ base: '100%', sm: '450px' }} bg='white'>
            {/* Small bio about what the user is registering for */}
            <Flex className='registration-info' direction='column' width='50%' height='40%' margin='auto auto'>
                <Flex className='title-container' margin='auto auto'>
                    <Text className='reg-info-title' fontWeight='semibold'>Create a chatroom.io account</Text>
                </Flex>
                <Flex className='description-container' width='80%' margin='auto auto'>
                    <Text className='reg-info-description' fontWeight='thin' textAlign='center'>
                        An account is needed to add friends, be included in groups, and participate in chatrooms.
                        Don’t worry, your email and DOB will not be shared with anyone.
                        These will just be used to verify you are real and of age to participate in the chatroom.
                    </Text>
                </Flex>
            </Flex>

            {/* Center Divider */}
            <Flex height='90%' margin='auto'><Divider orientation='vertical' borderColor='red' /></Flex>

            {/* Sign up forms */}
            <Flex direction='column' className='signup-forms' width='70%' height='100%' margin='5% 0%'>
                <Text width='50%' m='0 auto 15px auto'>Sign up</Text>
                <Flex width='50%' margin='0px auto'>
                    <FormControl>
                        <Input id='firstname' width='100%' mb='15px' placeholder='First name' />
                        <Input id='lastname' width='100%' mb='15px' placeholder='Last name' />
                        <Input id='email' type='email' width='100%' mb='15px' placeholder='Email' />
                        <Input id='password' type='password' width='100%' mb='15px' placeholder='Password' />
                        <Input id='confirm-pass' width='100%' mb='15px' placeholder='Confirm Password' />
                    </FormControl>
                </Flex>
                <Flex width='50%' justifyContent='flex-end' m='5px auto'><Button>Submit</Button></Flex>
            </Flex>
        </Flex>
    )
}

export default Signup;