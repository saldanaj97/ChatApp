import React from 'react';
import './ChatStyles';
import { ChatBox, ChatroomPageContainer, ChatRoomContainer, PageHeading, Rooms } from './ChatStyles';

const DisplayRooms = () => {
    return (
        <ChatroomPageContainer>
            <PageHeading>All Chatrooms</PageHeading>
            <Rooms>
                <ChatRoomContainer to='/roomone'>1</ChatRoomContainer>
                <ChatRoomContainer to='/roomtwo'>2</ChatRoomContainer>
                <ChatRoomContainer to='/roomthree'>3</ChatRoomContainer>
            </Rooms>
        </ChatroomPageContainer>
    )
}

export default DisplayRooms; 