import express from "express"
import http from 'http'
import cors from 'cors'
import logger from 'morgan'
import './config/mongo.js'

/* Routes */
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/room.js";
import deleteRouter from "./routes/delete.js";

/* Middlewares */
import { decode } from './middlewares/jwt.js'

// App will listen on port 3000 unless otherwise specified in the .env file
const PORT = process.env.PORT || 3000

// Initialize the express app
var app = express()
var server = http.createServer(app)
//var io = require('socket.io')(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/* Catch a 404 and forward to error handlerr */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist'
  })
})

app.get('/', (req, res) => {
  res.send('Server is up and running. ')
})

/* Event listener for HTTP server 'listening' event */
server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})