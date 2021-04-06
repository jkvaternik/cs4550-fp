import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ch_ready, ch_genres, ch_join, ch_login } from '../socket';

const WaitingRoom = ({ session }) => {

    const [playlist, setPlaylist] = useState("");

    const [ready, setReady] = useState(false);

    const [genres, setGenres] = useState([])

    const [state, setState] = useState({
      playlist_name: null,
      //players_ready: {},
      game_started: false,
      genres: [],
    });

    let history = useHistory();

    if (game_started) {
        history.push("/playlist/" + playlist_name);
    }

    useEffect(() => {
      ch_join(setState);
    }, [state]);

    function userReady() {
      setReady(!ready);
      ch_genres(genres);
      ch_ready();
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
      }
    }

    function onClick() {
        if (!(playlist === "")) {
            ch_login(session.id, playlist);
            setState({
                playlist_name: playlist,
                game_started: false,
                genres: [],
              });
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

      let body = null; 
  
      if (state.playlist_name) {
          body = (
            <div className="setup">
            <h2 style={{ margin: "2.0rem 0" }}>Create Your Playlist!</h2>
            <h6>The playlist that is generated will be a specially crafted assortment of songs for you and your friends based on your collective favorite artists, songs, and genres.</h6>
            <h6>As a group, you can select up to 3 genres for your playlist. Create your selection below, then click "Ready!" when you are done making changes.</h6>

            {toggle}

            <h4>Pick your genres:</h4>
            <ul class="list-group">
            <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="acoustic" onClick={updateGenres} disabled={disabledCheck }/>
                    Acoustic
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="alternative" onClick={updateGenres} disabled={disabledCheck}/>
                    Alternative
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="ambient" onClick={updateGenres} disabled={disabledCheck}/>
                    Ambient
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="blues" onClick={updateGenres} disabled={disabledCheck}/>
                    Blues
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="chill" onClick={updateGenres} disabled={disabledCheck}/>
                    Chill
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="classical" onClick={updateGenres} disabled={disabledCheck}/>
                    Classical
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="country" onClick={updateGenres} disabled={disabledCheck}/>
                    Country
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="dance" onClick={updateGenres} disabled={disabledCheck}/>
                    Dance
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="detroit-techno" onClick={updateGenres} disabled={disabledCheck}/>
                    Detroit Techno
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="disney" onClick={updateGenres} disabled={disabledCheck}/>
                    Disney
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="electronic" onClick={updateGenres} disabled={disabledCheck}/>
                    Electronic
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="edm" onClick={updateGenres} disabled={disabledCheck}/>
                    EDM
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="folk" onClick={updateGenres} disabled={disabledCheck}/>
                    Folk
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="funk" onClick={updateGenres} disabled={disabledCheck}/>
                    Funk
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="gospel" onClick={updateGenres} disabled={disabledCheck}/>
                    Gospel
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="guitar" onClick={updateGenres} disabled={disabledCheck}/>
                    Guitar
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="happy" onClick={updateGenres} disabled={disabledCheck}/>
                    Happy
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="heavy-metal" onClick={updateGenres} disabled={disabledCheck}/>
                    Heavy Metal
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="hip-hop" onClick={updateGenres} disabled={disabledCheck}/>
                    Hip Hop
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="holidays" onClick={updateGenres} disabled={disabledCheck}/>
                    Holidays
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="indie" onClick={updateGenres} disabled={disabledCheck}/>
                    Indie
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="indie-pop" onClick={updateGenres} disabled={disabledCheck}/>
                    Indie Pop
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="jazz" onClick={updateGenres} disabled={disabledCheck}/>
                    Jazz
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="k-pop" onClick={updateGenres} disabled={disabledCheck}/>
                    K-Pop
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="latin" onClick={updateGenres} disabled={disabledCheck}/>
                    Latin
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="metal" onClick={updateGenres} disabled={disabledCheck}/>
                    Metal
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="new-release" onClick={updateGenres} disabled={disabledCheck}/>
                    New Releases
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="party" onClick={updateGenres} disabled={disabledCheck}/>
                    Party
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="piano" onClick={updateGenres} disabled={disabledCheck}/>
                    Piano
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="pop" onClick={updateGenres} disabled={disabledCheck}/>
                    Pop
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="punk-rock" onClick={updateGenres} disabled={disabledCheck}/>
                    Punk Rock
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="rainy-day" onClick={updateGenres} disabled={disabledCheck}/>
                    Rainy Day
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="r-n-b" onClick={updateGenres} disabled={disabledCheck}/>
                    RNB
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="reggae" onClick={updateGenres} disabled={disabledCheck}/>
                    Reggae
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="rock" onClick={updateGenres} disabled={disabledCheck}/>
                    Rock
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="romance" onClick={updateGenres} disabled={disabledCheck}/>
                    Romance
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="show-tunes" onClick={updateGenres} disabled={disabledCheck}/>
                    Showtunes
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="sad" onClick={updateGenres} disabled={disabledCheck}/>
                    Sad
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="singer-songwriter" onClick={updateGenres} disabled={disabledCheck}/>
                    Singer-Songwriter
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="sleep" onClick={updateGenres} disabled={disabledCheck}/>
                    Sleep
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="soul" onClick={updateGenres} disabled={disabledCheck}/>
                    Soul
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="soundtracks" onClick={updateGenres} disabled={disabledCheck}/>
                    Soundtracks
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="spanish" onClick={updateGenres} disabled={disabledCheck}/>
                    Spanish
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="study" onClick={updateGenres} disabled={disabledCheck}/>
                    Study
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="summer" onClick={updateGenres} disabled={disabledCheck}/>
                    Summer
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="techno" onClick={updateGenres} disabled={disabledCheck}/>
                    Techno
                </li>
                <li class="list-group-item">
                    <input class="form-check-input me-1" type="checkbox" value="work-out" onClick={updateGenres} disabled={disabledCheck}/>
                    Workout
                </li>
            </ul>
            </div>
        ) 
    } else {
      body = (
          <>
            <h2 style={{ margin: "2.0rem 0" }}>Create Your Playlist!</h2>
            <h6>Enter the name of your playlist below.</h6>
            <h6>You will then be given a link to share with your friends!</h6>
            <input
                type="text"
                value={playlist}
                className="form-control"
                onChange={(ev) => setPlaylist(ev.target.value)}
                placeholder="Playlist Name" />
            <button className="btn btn-primary" onClick={onClick}>
                Create Playlist
            </button>
        </>
      )
  }

  return body; 
}


function state2props({session}) {
    return { session };
  }

  export default connect(state2props)(WaitingRoom);