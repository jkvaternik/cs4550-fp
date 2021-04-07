import React from 'react';
import { useParams } from 'react-router-dom';

const Playlist = (props) => {

  // const { name } = useParams();

    return (
        <>

        </>
    );
}

function state2props({ event }) {
  return { event };
}

export default connect(state2props)(Playlist);