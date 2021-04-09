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
        comments: [
            {}
        ],
        users: ["olivia", "jaime", "jim", "jamie"]
    })

    const songRows = playlist.tracks.map(s =>
            (<tr>
                <td>{s.name}</td>
                {/* <td>{s.album}</td> */}
                <td>{s.artist}</td>
            </tr>)
        )

    useEffect(() => {
        fetch_playlist(id).then(res => {
            console.log(res);
            setPlaylist({...res, name: decodeURI(res.name)});
        });
        console.log(playlist)
    }, [id])

    return (
        <>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <Row>
                <Col sm={8}>
                    <Table>
                        <tr>
                            <th>Song Name</th>
                            {/* <th>Album</th> */}
                            <th>Artist</th>
                        </tr>
                        {songRows}
                    </Table>
                </Col>
                <Col>
                    <h6>Creators:</h6>
                    {/* {playlist.users.join(", ")} */}
                    <CommentsForm playlist_id={playlist.id} />
                    {/* <Comments comments={playlist.comments} /> */}
                </Col>
            </Row>

        </>
    );
}
export default Playlist;