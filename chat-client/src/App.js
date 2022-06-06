import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react"

import { SocketProvider } from './SocketContext'
import { MainProvider } from './MainContext'
import { UsersProvider } from './UsersContext'

import Login from './Components/Login/Login'
import Chat from './Components/Chat/Chat.js'
import DefaultPage from './Components/DefaultPage'

import './App.scss'

const colors = {
  brand: {
    900: '#110F15',
    800: '#FA2849'
  }
}

const theme = extendTheme({ colors })
function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Flex className="App" align='center' justifyContent='center'>
              <Router>
                <Routes>
                  <Route path='/' exact element={<Login />} />
                  <Route path='/chat' element={<Chat />} />
                  <Route element={<DefaultPage />} />
                </Routes>
              </Router>
            </Flex>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App;
