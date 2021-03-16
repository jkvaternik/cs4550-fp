import { useEffect, useState } from 'react';

import './App.css';

const authEndPoint = "https://accounts.spotify.com/authorize";
const clientId = "006d7532893548a89635c04a92dd1fe6";
const redirectUri = "http://localhost:3000/";
const scopes = ["playlist-modify-public", "user-top-read"];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

function App() {
  const [token, setToken] = useState(null);

  useEffect(
    () => {
      let _token = hash.access_token;

      if (_token) {
        setToken(_token)
      }
    }, [])

  console.log(token);
  return (
    <div className="App">
      {token ?
        <p>Logged In</p>
        :
        <a href={`${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
          Login
      </a>}
    </div>
  );
}

export default App;
