import styled from 'styled-components';

/* This will be used as the main container for everything 
    on the page that is not the navbar */
export const ChatroomPageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

/* Used for the page headings on each chat room */
export const PageHeading = styled.div`
    color: white;
    font-size: xx-large;
`;

/* Styling for the container that will hold the rooms */
export const Rooms = styled.div`
    height: 75vh;
    width: 75%;
    background-color: #6453c6; //change to match the background but use a different color to see the ocntainer
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px;
    //padding-bottom: 150px;
`;

export const ChatRoomContainer = styled.div`
    height: 45%;
    width: 25%;
    background-color: white;
    margin-bottom: 15%;
`

/* Styling for the box that will hold the messages from the chat */
export const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    color: #6453c6;
`;
