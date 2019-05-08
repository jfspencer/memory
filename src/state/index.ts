import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { SessionStateReducer as sessionState, baseState } from './SessionState';

const reducers = {
  sessionState
}

const stateReducers = combineReducers(reducers)

export type State = {sessionState: typeof baseState}

export const store = createStore(stateReducers)

store.subscribe(() => console.log(store.getState()))