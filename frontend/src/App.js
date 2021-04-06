import React from 'react';
import './api';
import WaitingRoom from './WaitingRoom/WaitingRoom';
import './App.css';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Auth from './Login/Auth/Auth';
import NavigationBar from './Navigation/NavigationBar';

import './App.css';

function App() {
  return (
    <Container>
      <NavigationBar />
      <h1 style={{marginTop: '50px'}}>Rhapsody</h1>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Route path='/waiting' exact>
          <WaitingRoom />
        </Route>
        {/* <Route path='/playlist/:id' exact>
          <Playlist />
        </Route> */}
      </Switch>
    </Container>
  );
}

export default App;
