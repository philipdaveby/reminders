import React from 'react';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SignUp from './components/SignUp/SignUp';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import { AuthProvider } from './provider/AuthProvider';
import Profile from './components/Profile/Profile';
import { io } from 'socket.io-client'
import config from './utils/config';

const App = () => {


  const socket = io(config.backend_url);
  socket.on('connect', () => {
    console.log(`You connected with id: ${socket.id}`)
  });

  socket.emit('custom-event', 19, 'hi', {a: 'ab'});

  return (
    <div className="flex w-full flex-col">
        <AuthProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
