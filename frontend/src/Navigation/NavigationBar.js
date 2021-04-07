import React from 'react';
import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

import Link from './Link/Link';

const NavigationBar = ({ session }) => {
  return (
    <Nav>
      <Link to="/">My Playlists</Link>
      {/* Add logout conditional rendering */}
      <Link to="/login">Login</Link>
    </Nav>
  )
}

export default connect(({session}) => ({session}))(NavigationBar);