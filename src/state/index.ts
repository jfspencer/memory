import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { SessionStateReducer as sessionState } from './SessionState';

const stateReducers = combineReducers({
  sessionState
})

  export const store = createStore(stateReducers)

  store.subscribe(() => console.log(store.getState()))