import React from 'react';
import './ChatStyles';
import { ChatBox, ChatroomPageContainer, ChatRoomContainer, PageHeading, Rooms } from './ChatStyles';

const DisplayRooms = () => {
    return (
        <ChatroomPageContainer>
            <PageHeading>All Chatrooms</PageHeading>
            <Rooms>
                <ChatRoomContainer>1</ChatRoomContainer>
                <ChatRoomContainer>2</ChatRoomContainer>
                <ChatRoomContainer>3</ChatRoomContainer>
            </Rooms>
        </ChatroomPageContainer>
    )
}

export default DisplayRooms; 