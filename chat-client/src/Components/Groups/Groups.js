import React from "react";
import { Avatar, Box, Flex, Heading, IconButton, Text, Button, background } from "@chakra-ui/react"

import { BiRightArrowAlt } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'

import './Groups.scss'

const Groups = () => {
  return (
    <Flex className='group-container' flexDirection='column' width={{ base: "33%" }} height={{ base: "100%", sm: "auto" }}>
      <Heading className='heading' as='h4' bg='white' p='1rem 1.5rem' borderRadius='10px 10px 0 0'>
        <Flex alignItems='center' flexDir='row' justifyContent='space-between'>
          <Flex alignItems='center' flex={{ base: "1", sm: "auto" }}>
            <Heading fontSize='lg'> Groups </Heading>
          </Flex>
          <IconButton className='close-groups-menu' icon={<BiRightArrowAlt />} variant='ghost' isRound='true' fontSize='xl' />
        </Flex>
      </Heading >

      <Flex className='user-group-messages'>
        <Flex className='group-message' direction='row' width={{ base: "100%" }} height={{ base: "25%", sm: "auto" }}>
          <Flex className='group-avatar' alignItems='center' m='5px 15px'><CgProfile size='30px' /></Flex>
          <Flex className='group-msg-info-box' width={{ base: "100%" }} direction='column' m='10px'>
            <Box className='group-name'>Group Message 1</Box>
            <Box className='last-sent-message'>Test User: This is the last message that was sent in this group. </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex >
  )
}

export default Groups