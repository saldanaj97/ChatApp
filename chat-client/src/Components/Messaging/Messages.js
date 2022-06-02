import React, { useEffect, useState } from 'react';
import './Messages.css';

function Messages({ socket }) {
    const [messages, setMessages] = useState({})

    /* Grab all the messages that were present before joining the room, if there is 
    a new message coming through the socket, render the message component again to display the new message */
    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        /* Use the spread operator to save the previous messages in the chat and then delete  
        the message from the list of messages based on the message ID being passed into the function. */
        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages
            });
        };

        /* When the socket sees 'message' run the message listener function */
        socket.on('message', messageListener);

        /* When the socket sees 'delete message' run the delete message listener function which will 
        delete the message that has surpassed the expiration time */
        socket.on('deleteMessage', deleteMessageListener);

        /* Get the messages that have not expired from the chat */
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    /* Check if there were any messages that have not timed out in the chat room prior to user joining, 
    if there are not any, let the user know. Otherwise, display all the messages prior to the user joining the chat. */
    return (
        <div className='message-list'>
            {[...Object.values(messages)].length === 0 &&
                <div>
                    <h2>There are currently no messages in the chat. </h2>
                </div>
            }
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <div key={message.id} className='message-container' title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}>
                        <span className="user">{message.user.name}:</span>
                        <span className="message">{message.value}</span>
                        <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
                    </div>
                ))
            }
        </div >
    );
}

export default Messages;