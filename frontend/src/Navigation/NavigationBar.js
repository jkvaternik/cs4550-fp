import React from 'react';
import { Nav } from 'react';

import Link from './Link/Link';

const NavigationBar = () => {
  return (
    <Nav>
      <Link to="/">My Playlists</Link>
      <Link to="/playlist">My Playlists</Link>
    </Nav>
  )
}

export default NavigationBar;