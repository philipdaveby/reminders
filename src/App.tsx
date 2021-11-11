import React, { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SignUp from './components/SignUp/SignUp';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import { AuthProvider } from './provider/AuthProvider';
import Profile from './components/Profile/Profile';
import { Socket, io } from 'socket.io-client';
import config from './utils/config';
import { CookiesProvider } from 'react-cookie';

const App = () => {
  const [socket, setSocket] = useState<Socket>(io);

  useEffect(() => {
    console.log('socket')
    const newSocket = io(config.backend_url, {
      transports: ['websocket', 'flashsocket', 'htmlpage', 'xhr-polling', 'jsonp-polling']
    });
    setSocket(newSocket);
    return () => {
      console.log('disconnecting socket')
      socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div id="app" className="flex w-full flex-col h-screen">
      <CookiesProvider>
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => (<Home socket={socket}/>)} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </AuthProvider>
        </CookiesProvider>
    </div>
  );
}

export default App;
