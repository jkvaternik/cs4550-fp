import { createStore, combineReducers } from 'redux';

function session(action, state = restore_session()) {
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
  let sessionItem = localStorage.getItem("session");
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

function root_reducer(state, action) {
  let reducer = combineReducers({
    session
  })
  return reducer(state, action)
}

let store = createStore(root_reducer);
export default store;
