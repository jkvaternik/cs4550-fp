import React, { useState } from 'react';
import { ch_ready, ch_genres } from './socket';

const WaitingRoom = (props) => {

    const [ready, setReady] = useState(false);

    const [genres, setGenres] = useState([])

  function userReady() {
    setReady(!ready);
    //ch_ready();
  }

    function updateGenres(ev) {
    if (!ready) {
        let genre = ev.target.value
        console.log(genre);
        let newGenres;
        if (!genres.includes(genre)) {
            newGenres = genres.concat([genre]);
        } else {
            newGenres = genres.filter(g => g !== genre)
        }
        
        setGenres(newGenres);
        //ch_genres();
      }
    }

    let disabledCheck = ready || genres.length >= 3; 

  let toggle = ready ? (
      <>
        <h6>Waiting for your friends to make their selections. If you want to make more changes, click the button below.</h6>
        <button className="btn btn-primary" onClick={userReady}>Back to Edit Mode</button>
      </>)
      :
      (
        <>
          <button className="btn btn-primary" onClick={userReady}>Ready!</button>
        </>
      )

  return (
    <div className="setup">
      <h2 style={{ margin: "2.0rem 0" }}>Create Your Playlist!</h2>
      <h6>The playlist that is generated will be a specially crafted assortment of songs for you and your friends based on your collective favorite artists, songs, and genres.</h6>
      <h6>As a group, you can select up to 3 genres for your playlist. Create your selection below, then click "Ready!" when you are done making changes.</h6>

      {toggle}

      <h4>Pick your genres:</h4>
      <ul class="list-group">
        <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="pop" onClick={updateGenres} disabled={disabledCheck}/>
            Pop
        </li>
        <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="rock" onClick={updateGenres} disabled={disabledCheck}/>
            Rock
        </li>
        <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="classical" onClick={updateGenres} disabled={disabledCheck}/>
            Classical
        </li>
        <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="detroit-techno" onClick={updateGenres} disabled={disabledCheck}/>
            Detroit Techno
        </li>
        <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="edm" onClick={updateGenres} disabled={disabledCheck}/>
            EDM
        </li>
      </ul>

   

    </div>

  )
}

export default WaitingRoom;