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

export const RoomsContainer = styled.div`
    height: 75vh;
    width: 75%;
    background-color: #6453c6;
`;

/* Styling for the box that will hold the messages from the chat */
export const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    color: #6453c6;
`;
