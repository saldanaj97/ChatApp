const uuidv4 = require('uuid').v4

// These will be used to hold the messages and the users
const messages = new Set()
const users = new Map()

const defaultUser = {
    id: 'testUser',
    name: 'Anonymous'
}

const messageExpirationTimeMS = 5 * 60 * 1000;

// Setup callbacks for events coming from the sockets
class Connection {
    constructor(io, socket) {
        this.socket = socket
        this.io = io

        socket.on('getMessages', () => this.getMessages())
        socket.on('message', (value) => this.handleMessage(value))
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`)
        })
    }

    //  Send the message to all connected sockets
    sendMessage(message) {
        this.io.sockets.emit('message', message)
    }

    // Get the messages from the room 
    getMessages() {
        messages.forEach((message) => this.sendMessage(message))
    }

    // Adds metadata to the message
    handleMessage(value) {
        const message = {
            id: uuidv4(),
            user: users.get(this.socket) || defaultUser,
            value,
            time: Date.now()
        }

        // Add the message to the global messages set
        messages.add(message)
        this.sendMessage(message)

        // Times a message out after a certain amount of time
        setTimeout(() => {
            messages.delete(message)
            this.io.sockets.emit('deleteMessage', message.id)
        },
            messageExpirationTimeMS
        )
    }

    disconnect() {
        users.delete(this.socket)
    }
}

function chat(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket)
    })
}

module.exports = chat