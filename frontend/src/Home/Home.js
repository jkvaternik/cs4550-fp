import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard/PlaylistCard';
import { fetch_user } from '../api';
import { ch_login, ch_addUser } from '../socket';

import styles from './Home.module.css';

const Home = ({ session, token }) => {

  const [playlist, setPlaylist] = useState("");
  const [playlists, setPlaylists] = useState([]);
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
      <section style={{ marginTop: '200px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2>playlists catered to you</h2>
          <h5>Want to try it out?</h5>
          <Link to={'/login'} className="btn btn-primary">
            Login
        </Link>
        </div>
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
    <section style={{ height: '100vh' }}>
      <br />
      <h6>Joining a friend's playlist? Enter the playlist name below!</h6>
      <Form>
        <Form.Group>
          <Form.Row>
            <Col className="sm=8">
              <input
                type="text"
                value={playlist}
                className="form-control"
                onChange={(ev) => setPlaylist(ev.target.value)}
                placeholder="Playlist Name" />
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={onClick}>
                Join Playlist
              </button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>

      <br />
      <Row>
        <Col>
          <h2>my playlists</h2>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Link to={'/waiting'} className="btn btn-primary">
              Create Playlist
          </Link>
          </div>

        </Col>
      </Row>
      <Row>
        {playlistCards}
      </Row>
    </section>
  );
}

export default connect(({ session, token }) => ({ session, token }))(Home);