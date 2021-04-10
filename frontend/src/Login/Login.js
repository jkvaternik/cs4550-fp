import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { api_login } from '../api';

const Login = ({ error, session }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginHandler = (ev) => {
    ev.preventDefault();
    api_login(email, password);
  }

  if (session && !error) {
    return <Redirect to={'/auth'} />;
  }

  return (
    <section style={{ marginTop: '200px', height: '100vh'}}>
      { error ? 
        <Alert variant="warning">Login unsuccessful. Please try again.</Alert> :
        null}
      <h4 style={{ textAlign: 'center' }}>good to see you again</h4>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <Form onSubmit={loginHandler}>
          <Form.Group controlId="formLoginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={(ev) => setEmail(ev.target.value)}
              value={email}
              placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formLoginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
              value={password}
              placeholder="Password" />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit" style={{marginRight: '20px'}}>
              Login
        </Button>
            <Link to={'/register'}>
              Register
          </Link>
          </Form.Group>

        </Form>
      </div>
    </section>
  );
}

export default connect(({ error, session }) => ({ error, session }))(Login);