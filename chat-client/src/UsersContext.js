import React, { useState } from "react";

const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return <UsersContext.Provider value={{ users, setUsers, loggedIn, setLoggedIn }}>{children}</UsersContext.Provider>;
};

export { UsersContext, UsersProvider };
