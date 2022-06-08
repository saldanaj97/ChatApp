import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../MainContext'
import { SocketContext } from '../../SocketContext'
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react"
import { RiArrowRightLine } from "react-icons/ri"
import { useToast } from "@chakra-ui/react"
import { UsersContext } from '../../UsersContext'

const Login = () => {
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom } = useContext(MainContext)
    const navigate = useNavigate()
    const toast = useToast()
    const { setUsers } = useContext(UsersContext)

    //Checks to see if there's a user already present

    useEffect(() => {
        socket.on("users", users => {
            setUsers(users)
        })
    })

    //Emits the login event and if successful redirects to chat and saves user data
    const handleClick = () => {
        socket.emit('login', { name, room }, error => {
            if (error) {
                console.log(error)
                return toast({
                    position: "top",
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
            navigate('/chat')
            return toast({
                position: "top",
                title: "Hey there",
                description: `Welcome to ${room}`,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        })
    }

    return (
        <Flex className='login' flexDirection='column' mb='8'>
            <Heading as="h1" size="4xl" textAlign='center' mb='8' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px' color={'#282331'}>Chatroom.io</Heading>
            <Flex className="form" gap='1rem' flexDirection={{ base: "column", md: "row" }}>
                <Input variant='flushed' borderColor='#FA2849' color='#FA2849' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} focusBorderColor=' #FA2849' type="text" placeholder='User Name' value={name} onChange={e => setName(e.target.value)} />
                <Input variant='flushed' borderColor='#FA2849' color='#FA2849' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} focusBorderColor=' #FA2849' type="text" placeholder='Room Name' value={room} onChange={e => setRoom(e.target.value)} />
                <IconButton backgroundColor='#FA2849' isRound='true' icon={<RiArrowRightLine />} onClick={handleClick}></IconButton>
            </Flex>
        </Flex>
    )
}

export default Login