import React from "react";
import { Box, Flex } from "@chakra-ui/react"
import { CgProfile } from 'react-icons/cg'

import './GroupMessage.scss'

const GroupMessage = ({ group }) => {
  return (
    <Flex className='group-message' direction='row' width={{ base: "100%" }} height={{ base: "25%", sm: "auto" }}>
      <Flex className='group-avatar' alignItems='center' m='5px 10px'><CgProfile size='30px' /></Flex>
      <Flex className='group-msg-info-box' width={{ base: "100%" }} direction='column' m='10px'>
        <Box className='group-name'>{group.groupName}</Box>
        <Box className='last-sent-message'>{group.lastMessageReceived.user}:  {group.lastMessageReceived.contents}</Box>
      </Flex>
    </Flex>
  )
}

export default GroupMessage