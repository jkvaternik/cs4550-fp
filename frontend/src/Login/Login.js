import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { api_login } from '../api'; 

const Login = ({ error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginHandler = (ev) => {
    ev.preventDefault();
    api_login(email, password);

    // Check for error from backend — going to have to pull code to 
    if (!error) {
      history.push('/auth')
    }
  }

  return (
    <section>
      <Form onSubmit={loginHandler}>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            placeholder="Enter email"/>
        </Form.Group>
        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
            placeholder="Password"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to={'/register'}>
        Register
      </Link>
    </section>
  );
}

export default connect(({ error }) => ({ error }))(Login);