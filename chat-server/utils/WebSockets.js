class WebSocket {
  // This will hold all the users using the app
  users = [];

  // Events for a connection from client(server instance)
  connection(client) {
    // Event for a disconnect
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });

    // Event for attaching a user to a socket id when logged in
    client.on("identity", (userId) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
    });

    // Event for user joining a chatroom
    client.on("subscribe", (room, otherUserId = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });

    // Event for when a user leaves or mutes room
    client.on("unsubscribe", (room) => {
      client.leave(room);
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
