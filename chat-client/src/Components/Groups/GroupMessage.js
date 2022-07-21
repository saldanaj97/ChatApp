import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";

import { MainContext } from "../../MainContext";
import "./GroupMessage.scss";
import { useNavigate } from "react-router-dom";

const GroupMessage = ({ group }) => {
  const { room, roomId, setRoom, setRoomId } = useContext(MainContext);
  const navigate = useNavigate();

  // Function to set the new room and room id and navigate to that room
  const handleGroupClick = () => {
    setRoomId(group.id);
    setRoom(group.groupName);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div onClick={() => handleGroupClick()}>
      <Flex className='group-message' direction='row' width={{ base: "100%", sm: "250px" }} height={{ base: "25%", sm: "auto" }}>
        <Flex className='group-avatar' alignItems='center' m='5px 10px'>
          <CgProfile size='30px' />
        </Flex>
        <Flex className='group-msg-info-box' direction='column' m='10px'>
          <Box className='group-name'>{group.groupName}</Box>
          <Box className='last-sent-message'>
            {group.lastMessageReceived.user} {group.lastMessageReceived.contents}
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default GroupMessage;
