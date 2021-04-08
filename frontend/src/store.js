import { createStore, combineReducers } from 'redux';

function error(state = null, action) {
  switch (action.type) {
  case 'error/set':
    return action.data;
  case 'session/set':
    return null;
  default:
    return state;
  }
}

function session(state = restore_session(), action) {
  switch (action.type) {
    case 'session/set':
      save_session(action.data);
      return action.data;
    case 'session/clear':
      return null;
    default:
      return state;
  }
}

function save_session(sess) {
  let sessionItem = Object.assign({}, sess, { time: Date.now() });
  localStorage.setItem('session', JSON.stringify(sessionItem));
}

function restore_session() {
  let sessionItem = localStorage.getItem('session');
  console.log("Session", sessionItem)
  if (!sessionItem) {
    return null;
  }
  sessionItem = JSON.parse(sessionItem);
  let age = Date.now() - sessionItem.time;
  let hours = 60 * 60 * 1000;
  if (age < 24 * hours) {
    return sessionItem;
  }
  else {
    return null;
  }
}

function token(state = restore_token(), action) {
  switch (action.type) {
    case 'token/set':
      save_token(action.data)
      return action.data;
    case 'token/clear':
      localStorage.removeItem("token")
      return null;
    default:
      return state;
  }
}

function save_token(authToken) {
  let tokenItem = Object.assign({}, authToken);
  localStorage.setItem('token', JSON.stringify(tokenItem));
}

function restore_token() {
  let tokenItem = localStorage.getItem('token');
  console.log("Token", tokenItem)
  if (!tokenItem) {
    return null;
  }
  return JSON.parse(tokenItem);
}

function root_reducer(state, action) {
  console.log('root_reducer', state, action);
  let reducer = combineReducers({
    error, session, token, 
  })
  return reducer(state, action)
}

let store = createStore(root_reducer);
export default store;
