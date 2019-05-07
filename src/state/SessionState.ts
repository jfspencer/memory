import { validChar, CardState } from "../util/utils";
import { genGameBoard } from "../util/utils";
import {flatMap, partition, flow, map, pull } from "lodash/fp";

//** ACTIONS */
export const CardTap = (char: validChar) => ({type: '[Card] TAP', payload: char})
export const CardClear = (char: validChar) => ({type: '[Card] CLEAR', payload: char})
export const getGameLayout = (state: any) => {
  return state.sessionState.boardConfig
}

export const ResetGame = () => ({type: '[GameBoard] RESET'})

//** SELECTORS */
export const revealedCards = (state: any) => state.sessionState.playerTurn


//** REDUCER */
const initialState = {
    boardConfig: genGameBoard(),
    playerTurn: [] as validChar[]
}

export function SessionStateReducer(state = initialState, action: {type: string, payload: validChar}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        return {...state, boardConfig: genGameBoard(), playerTurn: []}
      case '[Card] CLEAR':
        return {...state, playerTurn: pull(action.payload, state.playerTurn)}
      case '[Card] TAP':
        if(state.playerTurn.length  === 0) return {...state, playerTurn:[...state.playerTurn, action.payload]}
        else if(state.playerTurn.length === 1 && action.payload === state.playerTurn[0]) {
          console.log('card tap', action.payload)
          if(action.payload === state.playerTurn[0]){
            //find the two states that match action.payload
            const [m1, m2] = flow([
              flatMap((v: CardState) => v),
              partition((v: CardState) => v.char === action.payload),
              map(([[m1, m2]]) => [{...m1, found:true}, {...m2, found:true}])
            ])(state.boardConfig)
            const boardConfig = map(row => row.map(card => card.char === m1.char ? m1 : card), {...state.boardConfig})
            console.log(boardConfig)
            return {...state, boardConfig, playerTurn:[]}  
          }
          return {...state, playerTurn:[]}
        }
        return state
      default:
        return state
    }
  }