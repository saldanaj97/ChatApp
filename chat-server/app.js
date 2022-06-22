const express = require('express')
const http = require('http')
const cors = require('cors')
const logger = require('morgan')

// App will listen on port 3000 unless otherwise specified in the .env file
const PORT = process.env.PORT || 3000

// Initialize the express app
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
const { addUser, getUser, deleteUser, getUsers } = require('./routes/user')

/* Catch a 404 and forward to error handlerr */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist'
  })
})



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
    io.in(user.room).emit('message', { user: user.name, text: message });
  })

  /* Delete the user from the and broadcast a message to everyone in the room that a user has left the room.  */
  socket.on('disconnect', () => {
    const user = deleteUser(socket.id)
    if (user) {
      console.log(user.name + 'has disconnected from ' + user.room)
      io.in(user.name).emit('notification', { title: 'Someone has left', description: `${user.name} just left the room. ` })
      io.in(user.room).emit('users', getUsers(user.room))
    }
    socket.removeAllListeners()
  })
})

app.get('/', (req, res) => {
  res.send('Server is up and running. ')
})

/* Event listener for HTTP server 'listening' event */
server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})