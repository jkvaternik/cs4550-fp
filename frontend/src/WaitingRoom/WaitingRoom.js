import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { ch_ready, ch_genres, ch_join, ch_login, ch_leave, ch_addUser } from '../socket';
import { Col, Row } from 'react-bootstrap';

const SPOTIFY_GENRES = [
  // Fill this with Genres
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music"
]


const WaitingRoom = ({ session, token }) => {

    const [playlist, setPlaylist] = useState("");

    const [ready, setReady] = useState(false);

    const [genres, setGenres] = useState([])

    const [state, setState] = useState({
      playlist_name: null,
      players_ready: new Map(),
      game_started: false,
      genres: [],
    });

    let history = useHistory();

    useEffect(() => {
        if (state.game_started) {
            history.push("/");
            ch_leave()
        }
    }, [state]);

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
            let name = encodeURI(playlist);
            console.log(token);
            ch_login(token["access_token"], name);
            ch_addUser(session.user_id)
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
            <h6>As a group, you can choose up to 3 genres for your playlist. Cast your votes below, then click "Ready!" when you are done making changes.</h6>

            {toggle}

            <h4>Pick your genres:</h4>
            <Row>
            <Col>
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="acoustic" onClick={updateGenres} disabled={disabledCheck }/>
                    Acoustic
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="alternative" onClick={updateGenres} disabled={disabledCheck}/>
                    Alternative
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="ambient" onClick={updateGenres} disabled={disabledCheck}/>
                    Ambient
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="blues" onClick={updateGenres} disabled={disabledCheck}/>
                    Blues
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="chill" onClick={updateGenres} disabled={disabledCheck}/>
                    Chill
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="classical" onClick={updateGenres} disabled={disabledCheck}/>
                    Classical
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="country" onClick={updateGenres} disabled={disabledCheck}/>
                    Country
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="dance" onClick={updateGenres} disabled={disabledCheck}/>
                    Dance
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="detroit-techno" onClick={updateGenres} disabled={disabledCheck}/>
                    Detroit Techno
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="disney" onClick={updateGenres} disabled={disabledCheck}/>
                    Disney
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="electronic" onClick={updateGenres} disabled={disabledCheck}/>
                    Electronic
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="edm" onClick={updateGenres} disabled={disabledCheck}/>
                    EDM
                </li>
            </ul>
            </Col>
            <Col>
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="french" onClick={updateGenres} disabled={disabledCheck}/>
                    French
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="folk" onClick={updateGenres} disabled={disabledCheck}/>
                    Folk
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="funk" onClick={updateGenres} disabled={disabledCheck}/>
                    Funk
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="gospel" onClick={updateGenres} disabled={disabledCheck}/>
                    Gospel
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="guitar" onClick={updateGenres} disabled={disabledCheck}/>
                    Guitar
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="happy" onClick={updateGenres} disabled={disabledCheck}/>
                    Happy
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="heavy-metal" onClick={updateGenres} disabled={disabledCheck}/>
                    Heavy Metal
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="hip-hop" onClick={updateGenres} disabled={disabledCheck}/>
                    Hip Hop
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="holidays" onClick={updateGenres} disabled={disabledCheck}/>
                    Holidays
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="indie" onClick={updateGenres} disabled={disabledCheck}/>
                    Indie
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="indie-pop" onClick={updateGenres} disabled={disabledCheck}/>
                    Indie Pop
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="jazz" onClick={updateGenres} disabled={disabledCheck}/>
                    Jazz
                </li>
            </ul>
            </Col>
            <Col>
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="k-pop" onClick={updateGenres} disabled={disabledCheck}/>
                    K-Pop
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="latin" onClick={updateGenres} disabled={disabledCheck}/>
                    Latin
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="metal" onClick={updateGenres} disabled={disabledCheck}/>
                    Metal
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="new-release" onClick={updateGenres} disabled={disabledCheck}/>
                    New Releases
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="party" onClick={updateGenres} disabled={disabledCheck}/>
                    Party
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="piano" onClick={updateGenres} disabled={disabledCheck}/>
                    Piano
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="pop" onClick={updateGenres} disabled={disabledCheck}/>
                    Pop
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="punk-rock" onClick={updateGenres} disabled={disabledCheck}/>
                    Punk Rock
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="rainy-day" onClick={updateGenres} disabled={disabledCheck}/>
                    Rainy Day
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="r-n-b" onClick={updateGenres} disabled={disabledCheck}/>
                    RNB
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="reggae" onClick={updateGenres} disabled={disabledCheck}/>
                    Reggae
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="rock" onClick={updateGenres} disabled={disabledCheck}/>
                    Rock
                </li>
            </ul>
            </Col>
            <Col>
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="romance" onClick={updateGenres} disabled={disabledCheck}/>
                    Romance
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="show-tunes" onClick={updateGenres} disabled={disabledCheck}/>
                    Showtunes
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="sad" onClick={updateGenres} disabled={disabledCheck}/>
                    Sad
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="singer-songwriter" onClick={updateGenres} disabled={disabledCheck}/>
                    Singer-Songwriter
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="sleep" onClick={updateGenres} disabled={disabledCheck}/>
                    Sleep
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="soul" onClick={updateGenres} disabled={disabledCheck}/>
                    Soul
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="soundtracks" onClick={updateGenres} disabled={disabledCheck}/>
                    Soundtracks
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="spanish" onClick={updateGenres} disabled={disabledCheck}/>
                    Spanish
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="study" onClick={updateGenres} disabled={disabledCheck}/>
                    Study
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="summer" onClick={updateGenres} disabled={disabledCheck}/>
                    Summer
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="techno" onClick={updateGenres} disabled={disabledCheck}/>
                    Techno
                </li>
                <li className="list-group-item">
                    <input className="form-check-input" type="checkbox" value="work-out" onClick={updateGenres} disabled={disabledCheck}/>
                    Workout
                </li>
            </ul>
            </Col>
            </Row>
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


function state2props({session, token}) {
    return { session, token };
  }

  export default connect(state2props)(WaitingRoom);