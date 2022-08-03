import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { RiSendPlaneFill } from "react-icons/ri";

/* This component will render the message input box in a chatroom */
export function MessageInputBox({ message, setMessage, handleSendMessage }) {
  return (
    <Flex className='form'>
      <input type='text' placeholder='Enter Message' value={message} onChange={(e) => setMessage(e.target.value)} />
      <IconButton background='#FA2849' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMessage} disabled={message === "" ? true : false}>
        Send
      </IconButton>
    </Flex>
  );
}
