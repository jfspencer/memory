import { validChar, CardState } from "../util/utils";
import { genGameBoard } from "../util/utils";
import {flatMap, partition, compose, map, pull } from "lodash/fp";

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
    playerTurn: [] as CardState[]
}

export function SessionStateReducer(state = initialState, action: {type: string, payload: CardState}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        return {...state, boardConfig: genGameBoard(), playerTurn: []}
      case '[Card] CLEAR':
        return {...state, playerTurn: pull(action.payload, state.playerTurn)}
      case '[Card] TAP':
        if(state.playerTurn.length  < 2) return {...state, playerTurn:[...state.playerTurn, action.payload]}
        else if(state.playerTurn.length === 2) {
          console.log(state.playerTurn)
          const [c1, c2] = state.playerTurn

          if(c1.char === c2.char){
            const flat = flatMap((v: CardState) => v, state.boardConfig)
            const parts = partition((v: CardState) => v.id === c1.id || v.id === c2.id, flat)
            const [[match1, match2]] = map(([v1, v2]: any) => [{...v1, found:true}, {...v2, found:true}], parts)
            
            const boardConfig = map(row => row.map(card => {
              if(card.id === match1.id) return  match1;
              else if(card.id === match2.id) return match2;
              else return card;
            }), {...state.boardConfig})
            console.log(boardConfig)
            return {...state, boardConfig, playerTurn:[]}  
          }
          return {...state, playerTurn:[action.payload]}
        }
        
        return state
      default:
        return state
    }
  }