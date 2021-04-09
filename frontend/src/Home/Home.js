import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard/PlaylistCard';
import { load_defaults } from '../api';

const Home = ({session, token, playlists}) => {
  useEffect(() => load_defaults(), [])

  if (!session || !token) {
    return (
      <section>
        <h4>Please login to continue</h4>
      </section>
    )
  }

  console.log(playlists);

  const playlistCards = playlists.map((pl, i) => <PlaylistCard key={i} playlist={pl} />)

  return (
    <section>
      <p>Access Token: {token.access_token}</p>
      <Row>
        { playlistCards }
      </Row>
      <Link to={'/waiting'} className="btn btn-primary">
        Create Playlist
      </Link>
    </section>
  );
}

export default connect(({ session, token, playlists }) => ({ session, token, playlists}))(Home);