import React from 'react';
import { Nav } from 'react-bootstrap';

import Link from './Link/Link';

const NavigationBar = () => {
  return (
    <Nav>
      <Link to="/">My Playlists</Link>
      <Link to="/login">Login</Link>
    </Nav>
  )
}

export default NavigationBar;