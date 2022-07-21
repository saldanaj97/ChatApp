class WebSocket {
  // This will hold all the users using the app
  users = [];
  // Events for a connection from client(server instance)
  connection(client) {
    // Event for a disconnect
    client.on("disconnect", () => {
      if (typeof users !== "undefined") {
        this.users = users.filter((user) => user.socketId !== client.id);
      }
    });

    // Event for attaching a user to a socket id when logged in
    client.on("identity", (user) => {
      this.users.push({
        socketId: client.id,
        userId: user.userId,
      });
      console.log(users);
    });

    // Event for user joining a chatroom
    client.on("subscribe", (room, otherUserId = "") => {
      client.join(room);
    });

    // Event for when a user leaves or mutes room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });

    // Event for when a user is trying to send a message to the room
    client.on("sendMessage", (room, message, userId) => {
      global.io.in(room).emit("message", { text: message, author: userId });
    });

    // Event for when a user switches rooms
    client.on("changeRoom", (room) => {
      global.io.in(room).emit("moveRoom");
    });
  }

  subscribeOtherUser(room, userId) {
    const userSockets = this.users.filter((user) => user.userId === otherUserId);
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}

export default new WebSocket();
