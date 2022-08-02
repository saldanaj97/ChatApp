import React, { useState } from "react";

const MainContext = React.createContext();

const MainProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");

  return <MainContext.Provider value={{ name, userId, room, roomId, setName, setUserId, setRoom, setRoomId }}>{children}</MainContext.Provider>;
};

export { MainContext, MainProvider };
