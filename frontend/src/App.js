import React from 'react';
import { useEffect, useState } from 'react';
import './api';
import WaitingRoom from './waitingRoom';
import './App.css';
import Login from './Login/Login';
import { Container } from 'react-bootstrap';

const authEndPoint = "https://accounts.spotify.com/authorize";
const clientId = "006d7532893548a89635c04a92dd1fe6";
const redirectUri = "http://localhost:3000/";
const scopes = ["playlist-modify-public", "user-top-read"];

function App() {
  return (
    <Container>
      {/* Edit styling later */}
      <br />
      <h1>Rhapsody</h1>
      <Login />
    </Container>
  );
}

export default App;
