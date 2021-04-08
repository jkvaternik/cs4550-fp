import React from 'react';
import { Button, Nav } from 'react-bootstrap';
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
    <Nav>
      <Link to="/">My Playlists</Link>
      {/* Add logout conditional rendering */}
      { session ? 
      <Button onClick={(ev) => logout(ev)}>
        Logout
      </Button> :
      <Link to="/login" className="btn btn-primary">Login</Link>}
    </Nav>
  )
}

export default connect(({session}) => ({session}))(NavigationBar);