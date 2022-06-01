import { NavLink as Link } from "react-router-dom";
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
`;

/* Styling for the container that will be used as a link to the rooms */
export const ChatRoomContainer = styled(Link)`
    height: 35%;
    width: 25%;
    margin-bottom: 15%;
    margin-left: 10px;
    padding-top: 25px;
    background-color: white;
    text-decoration: none;
    text-align: center;
    font-weight: 400;
    font-size: 45px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #FA2849;
        color: #FFFFFF;
    }
    &.active {
        background: #FA2849;
        color: #FFFFFF;
    }
`

/* Styling for the box that will hold the messages from the chat */
export const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    color: #6453c6;
`;
