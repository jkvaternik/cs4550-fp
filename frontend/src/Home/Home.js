import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard/PlaylistCard';
import { load_defaults } from '../api';
import { ch_login } from '../socket';

const Home = ({session, token, playlists}) => {

  const [playlist, setPlaylist] = useState("");
  const history = useHistory();

  useEffect(() => load_defaults(), [])

  if (!session || !token) {
    return (
      <section>
        <h4>Please login to continue</h4>
      </section>
    )
  }

  function onClick() {
    if (!(playlist === "")) {
        let name = encodeURI(playlist);
        ch_login(token["access_token"], name);
        history.push("/waiting")
    }
  }

  const playlistCards = playlists.map((pl, i) => <PlaylistCard key={i} playlist={pl} />)

  return (
    <section>
      <Row>
        { playlistCards }
      </Row>
      <Link to={'/waiting'} className="btn btn-primary">
        Create Playlist
      </Link>
      <>
            <h6>Joining a friend's playlist? Enter the playlist name below!</h6>
            <input
                type="text"
                value={playlist}
                className="form-control"
                onChange={(ev) => setPlaylist(ev.target.value)}
                placeholder="Playlist Name" />
            <button className="btn btn-primary" onClick={onClick}>
                Join Playlist
            </button>
      </>
    </section>
  );
}

export default connect(({ session, token, playlists }) => ({ session, token, playlists}))(Home);