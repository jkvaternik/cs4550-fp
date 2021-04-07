import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { create_user } from '../../api';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    pass1: "",
    pass2: ""
  });

  const history = useHistory();

  const submitHandler = (ev) => {
    ev.preventDefault();
    let data = {
      name: user.name,
      email: user.email,
      password: user.pass1
    }
    create_user(data).then(() => {
      history.push('/')
    });
  }

  const update = (field, ev) => {
    let tempUser = { ...user };
    tempUser[field] = ev.target.value;
    setUser(tempUser);
  }

  const updatePassword = (pass, ev) => {
    let tempUser = { ...user };
    tempUser[pass] = ev.target.value;
    tempUser.password = tempUser.pass1;
    tempUser.passwordMessage = checkPass(tempUser.pass1, tempUser.pass2);
    setUser(tempUser);
  }

  const checkPass = (p1, p2) => {
    if (p1 !== p2) {
      return "Passwords don't match.";
    }
    if (p1.length < 8) {
      return "Password is too short";
    }
    return null;
  }

  return (
    <section>
      <Form onSubmit={(ev) => submitHandler(ev)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={user.name}
            onChange={(ev) => update("name", ev)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            onChange={(ev) => update("email", ev)} />
        </Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={user.pass1}
              onChange={(ev) => updatePassword("pass1", ev)} />
          </Col>
          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={user.pass2}
              onChange={(ev) => updatePassword("pass2", ev)} />
          </Col>
        </Form.Row>

        <p>{user.passwordMessage}</p>
        <Button variant="primary" type="submit"
          disabled={user.passwordMessage !== null}>
          Register
          </Button>
      </Form>
    </section>
  )
}

export default Register;