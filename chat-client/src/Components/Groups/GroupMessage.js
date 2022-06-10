import React from "react";
import { Box, Flex } from "@chakra-ui/react"
import { CgProfile } from 'react-icons/cg'

import './GroupMessage.scss'

const GroupMessage = () => {
  return (
    <Flex className='user-group-messages'>
      <Flex className='group-message' direction='row' width={{ base: "100%" }} height={{ base: "25%", sm: "auto" }}>
        <Flex className='group-avatar' alignItems='center' m='5px 15px'><CgProfile size='30px' /></Flex>
        <Flex className='group-msg-info-box' width={{ base: "100%" }} direction='column' m='10px'>
          <Box className='group-name'>Group Message 1</Box>
          <Box className='last-sent-message'>Test User: This is the last message that was sent in this group. </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GroupMessage