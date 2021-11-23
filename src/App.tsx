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

const App = () => {
  const [socket, setSocket] = useState<Socket>(io);
  const [todos, setTodos] = useState<Array<Todo> | null>(null);

  useEffect(() => {
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
        <AuthProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => (<Home socket={socket} todos={todos} setTodos={setTodos} />)} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/profile" render={() => (<Profile setTodos={setTodos} todos={todos} /> )} />
          </Switch>
        </AuthProvider>
    </div>
  );
}

export default App;
