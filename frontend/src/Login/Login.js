import React from 'react';
import { Form } from 'react-bootstrap';

const Login = () => {
  return (
    <section>
      <Form>
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
      </Form>
    </section>
  );
}

export default Login;