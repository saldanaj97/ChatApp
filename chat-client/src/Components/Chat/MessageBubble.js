import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { BiMessageDetail } from "react-icons/bi";

/* Component to render a chat message bubble */
export function MessageBubble({ message, i, name }) {
  const { authorInfo, messageText } = message;

  return (
    <Box key={i} className={`message ${authorInfo === name ? "my-message" : ""}`} m='.2rem .2rem'>
      <Text opacity='.5' fontSize='sm' className='user'>
        {authorInfo}
      </Text>
      <Text fontSize='sm' className='msg' p='.4rem .8rem' bg='white' borderRadius='15px' color='black'>
        {messageText}
      </Text>
    </Box>
  );
}

/* Component that will display no messages text if there are no messages in the room */
export function NoMessages() {
  return (
    <Flex alignItems='center' justifyContent='center' mt='.5rem' bg='#EAEAEA' opacity='.2' w='100%'>
      <Box mr='2'>-----</Box>
      <BiMessageDetail fontSize='1rem' />
      <Text ml='1' fontWeight='400'>
        No messages
      </Text>
      <Box ml='2'>-----</Box>
    </Flex>
  );
}
