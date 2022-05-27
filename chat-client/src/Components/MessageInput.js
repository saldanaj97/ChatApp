import React, { useState } from 'react';
import './MessageInput.css';

// Handle the input from the message input box
const NewMessage = ({ socket }) => {
    const [value, setValue] = useState('');
    const submitForm = (e) => {
        e.preventDefault()
        socket.emit('message', value);
        setValue('');
    };

    return (
        <div className='message-input'>
            <form onSubmit={submitForm}>
                <input autoFocus value={value} placeholder='Type your message' onChange={(e) => { setValue(e.currentTarget.value) }} />
                <button type='submit'> Send </button>
            </form>
        </div>

    );
};

export default NewMessage;