import React from 'react';
import { Card } from 'react-bootstrap';

const PlaylistCard = ({ playlist }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{playlist.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default PlaylistCard;