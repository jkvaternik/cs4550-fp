import React from 'react';
import './api';

import WaitingRoom from './WaitingRoom/WaitingRoom';
import Playlist from './Playlist/Playlist';
import './App.css';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Login/User/Register';
import Auth from './Login/Auth/Auth';
import NavigationBar from './Navigation/NavigationBar';

import './App.css';

function App() {
  return (
    <>
      <NavigationBar />
      <div style={{minHeight: '100vh', minHeight: '100%'}}>
        <Container>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/register' exact>
              <Register />
            </Route>
            <Route path='/auth' exact>
              <Auth />
            </Route>
            <Route path='/waiting' exact>
              <WaitingRoom />
            </Route>
            <Route path='/playlist/:id' exact>
              <Playlist />
            </Route>
          </Switch>
        </Container>
      </div>
    </>
  );
}

export default App;
