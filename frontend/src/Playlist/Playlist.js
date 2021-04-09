import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import CommentsForm from './Comments/CommentsForm';
import Comments from './Comments/Comments';
import { fetch_playlist } from '../api';

const Playlist = () => {

    const { id } = useParams();

    const [playlist, setPlaylist] = useState({
        id: 1,
        name: "",
        description: "",
        tracks: [],
        comments: [],
        users: ["olivia", "jaime", "jim", "jamie"]
    })

    const songRows = playlist.tracks.map(s =>
            (<tr key={s.id}>
                <td><img src={s.track_picture}></img></td>
                <td>{s.name}</td>
                {/* <td>{s.album}</td> */}
                <td>{s.artist}</td>
            </tr>)
    );

    const updatePlaylist = () => {
            fetch_playlist(playlist.id).then((res) => {
                setPlaylist({...res, name: decodeURI(res.name)});
            });
          }

    useEffect(() => {
        fetch_playlist(id).then(res => {
            setPlaylist({...res, name: decodeURI(res.name)});
        });
    }, [id])

    return (
        <>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <Row>
                <Col sm={8}>
                    <Table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Song Name</th>
                            {/* <th>Album</th> */}
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
                    {/* {playlist.users.join(", ")} */}
                    <CommentsForm playlist_id={playlist.id} updatePlaylist={updatePlaylist}/>
                    <Comments comments={playlist.comments} updatePlaylist={updatePlaylist}/>
                </Col>
            </Row>

        </>
    );
}
export default Playlist;