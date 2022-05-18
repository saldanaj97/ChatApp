const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const chatroom = express();
const httpServer = createServer(chatroom);
const io = new Server(httpServer, { /* options */ });

chatroom.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.send('A user has connected to the room. ')
});

io.on("connection", (socket) => {
    console.log('a user connected')
});

httpServer.listen(3000);