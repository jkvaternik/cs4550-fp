import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard/PlaylistCard';

const Home = ({session, token, playlists}) => {
  if (!session || !token) {
    return (
      <section>
        <h4>Please login to continue</h4>
      </section>
    )
  }

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