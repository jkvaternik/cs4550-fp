import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

const Playlist = () => {

    const { name } = useParams();
    const [playlist, setPlaylist] = useState({
        id: 1,
        name: name,
        description: "",
        songs: [
            {name: "The poop song", artist: "Learning Resource Center", album: "The poop song"},
            {name: "Don't Worry", artist: "Madcon", album: "IDK"},
            {name: "Big Time Rush", artist: "Big Time Rush", album: "Big Time Rush"}
        ],
        comments: [
            {}

        ],
        users: ["olivia", "jaime", "jim", "jamie"]
    })

    const songRows = playlist.songs.map(s =>
            (<tr>
                <td>{s.name}</td>
                <td>{s.album}</td>
                <td>{s.artist}</td>
            </tr>)
        )

    

    // useEffect(() => {
    //     // TODO: api get request
    // }, [name])

    return (
        <>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <Row>
                <Col sm={8}>
                    <Table>
                        <tr>
                            <th>Song Name</th>
                            <th>Album</th>
                            <th>Artist</th>
                        </tr>
                        {songRows}
                    </Table>
                </Col>
                <Col>
                    <h6>Creators:</h6>
                    {playlist.users.join(", ")}
                    <p>Comments</p>
                </Col>
            </Row>

        </>
    );
}
export default Playlist;