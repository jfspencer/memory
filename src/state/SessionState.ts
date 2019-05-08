import { CardState } from "../util/utils";
import { initGameBoard } from "../util/utils";
import {flatMap, partition, map } from "lodash/fp";

//** ACTIONS */
export const CardTap = (char: string) => ({type: '[Card] TAP', payload: char})
export const ResetGame = (columns:number, symbols:string) => ({type: '[GameBoard] RESET', payload: {columns, symbols}})

//** SELECTORS */
export const getGameLayout = (state: any) => state.sessionState.boardConfig
export const getPrefs = (state: any) => state.sessionState.prefs

//** REDUCER */
const initialState = {
    boardConfig: initGameBoard(),
    playerTurn: [] as CardState[],
    prefs: {columns: 4, symbols: 'A,B,C,D,E,F,G,H'}
}

export function SessionStateReducer(state = initialState, action: {type: string, payload: any}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        const {columns, symbols} = action.payload;
        return {...state, boardConfig: initGameBoard(columns, symbols), playerTurn: [], prefs: {columns, symbols }}
      case '[Card] TAP':
        if(state.playerTurn.length  < 2) return {...state, playerTurn:[...state.playerTurn, action.payload]}
        else if(state.playerTurn.length === 2) {
          const [c1, c2] = state.playerTurn
          if(c1.char === c2.char) {
            const flat = flatMap((v: CardState) => v, state.boardConfig)
            const [matchedCards] = partition((v: CardState) => v.id === c1.id || v.id === c2.id, flat)
            const [foundMatch1, foundMatch2] = map((v: any) => ({...v, found:true}), matchedCards)
            const updatedBoard = map(row => row.map(updateRowMatch(foundMatch1, foundMatch2)), {...state.boardConfig})
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