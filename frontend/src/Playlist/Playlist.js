import React from 'react';

const Playlist = (props) => { 

    const { name } = useParams();

    return (
        <>
        
        </>
    );
}

function state2props({event}) {
    return { event };
  }
  
  export default connect(state2props)(Playlist);