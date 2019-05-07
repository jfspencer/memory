import { validChar, CardState } from "../util/utils";
import { genGameBoard } from "../util/utils";
import {flatMap, partition, map } from "lodash/fp";

//** ACTIONS */
export const CardTap = (char: validChar) => ({type: '[Card] TAP', payload: char})
export const ResetGame = () => ({type: '[GameBoard] RESET'})

//** SELECTORS */
export const getGameLayout = (state: any) => state.sessionState.boardConfig

//** REDUCER */
const initialState = {
    boardConfig: genGameBoard(),
    playerTurn: [] as CardState[]
}

export function SessionStateReducer(state = initialState, action: {type: string, payload: CardState}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        return {...state, boardConfig: genGameBoard(), playerTurn: []}
      case '[Card] TAP':
        if(state.playerTurn.length  < 2) return {...state, playerTurn:[...state.playerTurn, action.payload]}
        else if(state.playerTurn.length === 2) {
          const [c1, c2] = state.playerTurn
          if(c1.char === c2.char) {
            const flat = flatMap((v: CardState) => v, state.boardConfig)
            const parts = partition((v: CardState) => v.id === c1.id || v.id === c2.id, flat)
            const [[match1, match2]] = map(([v1, v2]: any) => [{...v1, found:true}, {...v2, found:true}], parts)
            const updatedBoard = map(row => row.map(updateRowMatch(match1, match2)), {...state.boardConfig})
            return {...state, boardConfig: updatedBoard, playerTurn:[action.payload]}  
          }
          return {...state, playerTurn:[action.payload]}
        }
        return state
      default:
        return state
    }
  }

  const updateRowMatch = (m1: CardState, m2:CardState) => (card: CardState) =>  {
    if(card.id === m1.id) return  m1;
    else if(card.id === m2.id) return m2;
    else return card;
  }