import React from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const ENDPOINT = "https://chatapp-production-7d82.up.railway.app";
  const socket = io(ENDPOINT, { transports: ["websocket", "polling"] });

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
