import { Socket } from "phoenix";

let socket = new Socket(
  "ws://localhost:4000/socket",
  { params: { token: "" } }
);

socket.connect()

// Now that you are connected, you can join channels with a topic:a
let channel = socket.channel(`room:1`, {}); 

let state = {
    playlist_name: "",
    players_ready: new Map(),
    game_started: false,
    genres: [],
};

let callback = null;

function state_update(st) {
  console.log("New State", st)
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) {
  callback = cb;
  callback(state)
}

export function ch_login(username, playlist_name) {
  channel = socket.channel(`room:${playlist_name}`, {});

  channel.join()
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to join", resp)
    })

  channel.push("playlist", playlist_name)
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });

  channel.on("view", state_update);

  channel.push("login", encodeURI(username))
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_genres(genres) {
  console.log(genres)
  channel.push("genres", genres)
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_ready() {
  channel.push("ready", {})
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_notReady() {
  channel.push("not_ready", {})
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_addUser(user_id) {
  channel.push("addUser", user_id)
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to push", resp)
    });
}

export function ch_leave() {
  let channel = socket.channel(`room:1`, {}); 

  let state = {
    playlist_name: "",
    players_ready: new Map(),
    game_started: false,
    genres: [],
  };

  channel.join()
    .receive("ok", state_update)
    .receive("error", resp => {
      console.log("Unable to join", resp)
    })
}

channel.join()
       .receive("ok", state_update)
       .receive("error", resp => {
         console.log("Unable to join", resp)
       });

channel.on("view", state_update);

export default socket