import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard/PlaylistCard';
import { fetch_user } from '../api';
import { ch_login, ch_addUser } from '../socket';

const Home = ({session, token }) => {

  const [playlist, setPlaylist] = useState("");
  const [playlists, setPlaylists]  = useState([]);
  const history = useHistory();


  useEffect(() => {
    if (session) {
      fetch_user(session.user_id).then((res) => {
        setPlaylists(res.contributors);
      })
    }
  }, [])

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

        ch_addUser(session.user_id);
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

export default connect(({ session, token }) => ({ session, token }))(Home);