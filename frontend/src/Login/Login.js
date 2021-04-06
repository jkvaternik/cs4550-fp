import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { api_post } from '../api';

const Login = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const url = window.location.href;
    
    if (url.includes("?code=")) {
      let code = url.split("?code=")[1];

      api_post("/login", { code: code }).then((resp) => {
        console.log(resp)
      })
    }
  }, []) 

  return (
    <section>
      {/* <Form onSubmit={onSubmit}>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"/>
        </Form.Group>
        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form> */}
      <a
        href="https://accounts.spotify.com/authorize?client_id=006d7532893548a89635c04a92dd1fe6&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-top-read%20user-top-read%20playlist-modify-public"
      >
        Login with Spotify
      </a>
    </section>
  );
}

export default Login;