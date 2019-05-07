import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { playerTapsReducer as playerTaps  } from './PlayerTaps';
import { SessionStateReducer as sessionState } from './SessionState';
import { GameConfigReducer as gameConfig } from './GameConfig';

const stateReducers = combineReducers({
  playerTaps,
  sessionState,
  gameConfig
})

  export const store = createStore(stateReducers)

  store.subscribe(() => console.log(store.getState()))