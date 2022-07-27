import React, { useContext, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { MainContext } from "../../MainContext";
import { SocketContext } from "../../SocketContext";
import { useNavigate } from "react-router-dom";
import "./GroupMessage.scss";

const GroupMessage = ({ group }) => {
  const { room, roomId, setRoom, setRoomId } = useContext(MainContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // Function to set the new room and room id and navigate to that room
  const handleGroupClick = () => {
    // Set new room to the id that was passed in props
    const newRoom = group.id;
    
    // Send the change room event
    socket.emit("changeRoom", roomId, newRoom);

    // First leave the room we are currently listening to
    socket.emit("unsubscribe", roomId);

    // Set the global variables to the new room we are going to
    setRoomId(group.id);
    setRoom(group.groupName);

    // Join the new room we will be listening to
    socket.emit("subscribe", group.id);

    // Navigate to the group that was clicked
    return navigate(`/chat/${group.id}`);
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
