import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import store from '../store';

import Link from './Link/Link';

const NavigationBar = ({ session }) => {

  const history = useHistory();

  const logout = (ev) => {
    ev.preventDefault();
    store.dispatch({ type: 'session/clear' });
    store.dispatch({ type: 'token/clear' });
    history.push('/');
  }

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>Rhapsody</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/">My Playlists</Link>
        {session ?
          null:
          <Link to="/login" className="btn btn-primary">Login</Link>}
      </Nav>
      {session ?
        <Nav>
          <Button onClick={(ev) => logout(ev)}>
            Logout
      </Button>
        </Nav>
        :
        null}
    </Navbar>
  )
}

export default connect(({ session }) => ({ session }))(NavigationBar);