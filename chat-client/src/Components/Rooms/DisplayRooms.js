import React from 'react';
import './ChatStyles';
import { ChatBox, ChatroomPageContainer, PageHeading, RoomsContainer } from './ChatStyles';

const DisplayRooms = () => {
    return (
        <ChatroomPageContainer>
            <PageHeading>All Chatrooms</PageHeading>
            <RoomsContainer></RoomsContainer>
        </ChatroomPageContainer>
    )
}

export default DisplayRooms; 