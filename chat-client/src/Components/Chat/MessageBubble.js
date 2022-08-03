import React from "react";
import { Box, Text } from "@chakra-ui/react";

export function MessageBubble({ message, i, name }) {
  const { authorInfo, messageText } = message;

  return (
    <Box display='flex' key={i} className={`message ${authorInfo === name ? "my-message" : ""}`} m='.2rem .2rem'>
      <Box display='flex' m='.2rem .2rem'>
        <Box display='flex' flexDirection='column' className='name-msg-block' justifyContent='center'>
          <Text fontSize='sm' className='msg' p='.4rem .8rem' bg='white' borderRadius='15px' color='black'>
            {messageText}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
