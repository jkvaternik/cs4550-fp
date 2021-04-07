import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard/PlaylistCard';

const playlists = [
  { name: "Roadtrip" },
  { name: "Shower Playlist" },
  { name: "Lo-Fi Beats" },
  { name: "Disney" },
  { name: "Detroit Techno Thursdays" }
]

const Home = ({session, token}) => { 

  if (!session || !token) {
    return (
      <section>
        <h4>Login!</h4>
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

export default connect(({ session, token }) => ({ session, token }))(Home);