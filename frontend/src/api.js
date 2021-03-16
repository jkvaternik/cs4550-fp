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

export function api_login(name, password) {
  api_post("/sessions", {name, password}).then((data) => {
    console.log("login resp", data);
  });
}

export function fetch_top_tracks() {
  api_get("/tracks").then((data) => {
    return data;
  })
}