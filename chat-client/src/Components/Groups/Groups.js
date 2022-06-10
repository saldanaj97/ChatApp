import React from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react"

import { BiRightArrowAlt } from 'react-icons/bi'

import GroupMessage from "./GroupMessage";

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
      <GroupMessage />
    </Flex >
  )
}

export default Groups