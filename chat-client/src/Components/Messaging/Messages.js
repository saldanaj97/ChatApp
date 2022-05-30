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

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages
            });
        };

        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    /* If there messages in the room prior to entry, display the messages. 
    Otherwise, display a message to the user that there have been no messages sent yet in the chatroom. */
    return (
        <div className='message-list'>
            {[...Object.values(messages)] !== 0 ? (
                [...Object.values(messages)]
                    .sort((a, b) => a.time - b.time)
                    .map((message) => (
                        <div key={message.id} className='message-container' title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}>
                            <span className="user">{message.user.name}:</span>
                            <span className="message">{message.value}</span>
                            <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
                        </div>
                    ))
            ) : (
                <div>
                    <h2>There are currently no messages in the chat. </h2>
                </div>
            )}
        </div>
    );
}

export default Messages;