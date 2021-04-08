import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  return (
    <Col className="col-sm-4" style={{ display: 'inline', marginBottom: '30px' }}>
      <Card>
        <Card.Body>
          <Card.Title style={{color: '#ffffff'}}>{playlist.name}</Card.Title>
          <Link></Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default PlaylistCard;