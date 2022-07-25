import React, { useState } from "react";

const MainContext = React.createContext();

const MainProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");

  return <MainContext.Provider value={{ name, room, roomId, setName, setRoom, setRoomId }}>{children}</MainContext.Provider>;
};

export { MainContext, MainProvider };
