import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  return (
    <Col className="col-sm-4" style={{ display: 'inline', marginBottom: '30px' }}>
      <Card>
        <Card.Body>
          <Card.Title style={{color: '#52498C'}}>{decodeURI(playlist.name)}</Card.Title>
          <div style={{float: 'right'}}>
            <Link to={`/playlist/${playlist.id}`}>View</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default PlaylistCard;