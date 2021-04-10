import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';
import CommentsForm from './Comments/CommentsForm';
import Comments from './Comments/Comments';
import { add_playlist_to_spotify, fetch_playlist } from '../api';

const Playlist = () => {

  const { id } = useParams();

  const [playlist, setPlaylist] = useState({
    id: 1,
    name: "",
    description: "",
    tracks: [],
    comments: [],
    contributors: []
  })

  const [spotify, setSpotify] = useState(null);

  const songRows = playlist.tracks.map(s =>
  (<tr key={s.id}>
    <td><img src={s.track_picture}></img></td>
    <td>{s.name}</td>
    <td>{s.artist}</td>
  </tr>)
  );

  const updatePlaylist = () => {
    fetch_playlist(playlist.id).then((res) => {
      setPlaylist({ ...res, name: decodeURI(res.name) });
    });
  }

  useEffect(() => {
    fetch_playlist(id).then(res => {
      setPlaylist({ ...res, name: decodeURI(res.name) });
    });
  }, [id])

  function onClick() {
    add_playlist_to_spotify(playlist.id).then(res => {
      setSpotify("Added to your spotify. Go check it out!")
    });
  }

  return (
    <>
      <br />
      <Row>
        <Col>
          <h3>{playlist.name}</h3>
          <p>{playlist.description}</p>
        </Col>
        <Col>
          <Button onClick={onClick} className="btn btn-primary">
            Add to Spotify
                    </Button>
        </Col>
      </Row>

      <Row>
        <Col sm={8}>

          {spotify && <p>{spotify}</p>}
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Song Name</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody>
              {songRows}
            </tbody>

          </Table>
        </Col>
        <Col>
          <h6>Creators:</h6>
          {playlist.contributors.map(c => c.name.slice(0, 1).toUpperCase() + c.name.slice(1)).join(", ")}
          <br />
          <br />
          <CommentsForm playlist_id={playlist.id} updatePlaylist={updatePlaylist} />
          <Comments comments={playlist.comments} updatePlaylist={updatePlaylist} />
        </Col>
      </Row>

    </>
  );
}
export default Playlist;