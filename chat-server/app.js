const express = require('express')
const http = require('http')
const cors = require('cors')
const { addUser, getUser, deleteUser, getUsers } = require('./routes/users')

// App will listen on port 3000 unless otherwise specified in the .env file
const PORT = process.env.PORT || 3000

// Initialize the express app
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

app.use(cors())


io.on('connection', (socket) => {
  /* Take in the name and room and pass them to the addUser method along with the 
   socket id (socket id will be unique for every user that logs in ) */
  socket.on('login', ({ name, room }, callback) => {
    const { user, error } = addUser(socket.id, name, room)

    /* If there is no error adding the user, add them to the room and broadcast them joining to the others */
    if (error) return callback(error)
    socket.join(user.room)
    socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room. ` })
    io.in(room).emit('users', getUsers(room))
    callback()
  })

  /* Take in a message sent from the client and emit the 'message' event in the room with username and room */
  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    io.in(user.room).emit('message', { user: user.name, text: message })
  })

  /* Delete the user from the and broadcast a message to everyone in the room that a user has left the room.  */
  socket.on('disconnect', () => {
    console.log('User disconnected')
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.name).emit('notification', { title: 'Someone has left', description: `${user.name} just left the room. ` })
      io.in(user.room).emit('users', getUsers(user.room))
    }
  })
})

app.get('/', (req, res) => {
  res.send('Server is up and running. ')
})

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})