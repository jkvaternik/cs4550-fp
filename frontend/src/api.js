import store from './store';

async function api_get(path) {
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

// AUTH & LOGIN
export function api_auth(code) {
  api_post("/auth", { code }).then((data) => {
    console.log("auth resp", data);
    if (data.access_token) {
      let action = {
        type: 'token/set',
        data: data
      }
      store.dispatch(action)
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export function api_login(email, password) {
  api_post("/sessions", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

// TRACKS (?)
export function fetch_top_tracks() {
  api_get("/tracks").then((data) => {
    return data;
  })
}


// USERS
export function fetch_user(id) {
  return api_get(`/users/${id}`);
}

export function create_user(user) {
  return api_post("/users", {user});
}

// PLAYLISTS
export function fetch_playlists() {
  api_get("/playlists").then((data) => store.dispatch({
    type: 'posts/set',
    data: data,
  }))
}