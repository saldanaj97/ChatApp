import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";

import { SocketProvider } from "./SocketContext";
import { MainProvider } from "./MainContext";
import { UsersProvider } from "./UsersContext";
import { SignupProvider } from "./Components/Login/SignupContext";

import Home from "./Components/Login/Home";
import Chat from "./Components/Chat/Chat.js";
import DefaultPage from "./Components/DefaultPage";

import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <SignupProvider>
              <Flex className='App' align='center' justifyContent='center'>
                <Router>
                  <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/chat/:_id' element={<Chat />} />
                    <Route element={<DefaultPage />} />
                  </Routes>
                </Router>
              </Flex>
            </SignupProvider>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App;
