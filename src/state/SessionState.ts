import { CardState } from "../util/utils";
import { initGameBoard } from "../util/utils";
import {flatMap, partition, map } from "lodash/fp";
import { Either, left, right } from 'fp-ts/lib/Either'

//** ACTIONS */
export const CardTap = (char: string) => ({type: '[Card] TAP', payload: char})
export const ResetGame = (columns:number, symbols:string) => ({type: '[GameBoard] RESET', payload: {columns, symbols}})

//** SELECTORS */
export const getGameLayout = (state: any) => state.sessionState.boardConfig
export const getPrefs = (state: any) => state.sessionState.prefs

//** REDUCER */
const initialState = {
    boardConfig: initGameBoard(),
    turn: [] as CardState[],
    prefs: {columns: 4, symbols: 'A,B,C,D,E,F,G,H'}
}

type State = any

const resetHandler = (state:any, action:any) => {
  const {columns, symbols} = action.payload;
  return {...state, boardConfig: initGameBoard(columns, symbols), turn: [], prefs: {columns, symbols }}
}

const tapHandler = (state:any, action:any) => right([state, action.payload])
.chain(([state, turn]:any) => onePlayed(state.turn) ? appendTurn(state, turn) : right([state, turn]))
.chain(([state, turn]:any) => twoPlayed(state.turn) ? determineMatch(state, turn): left(state))
.fold(v => v, ([state, turn]:any) => state)

//functional implementation
export function SessionStateReducer(state = initialState, action: {type: string, payload: any}) {
  switch (action.type) {
    case '[GameBoard] RESET': return resetHandler(state, action)
    case '[Card] TAP': return tapHandler(state, action)
    default: return state
  }
}

const onePlayed = (turn:any) => turn.length < 2
const twoPlayed = (turn:any) => turn.length === 2
const appendTurn = (state: any, turn: any) =>left({...state, turn:[...state.turn, turn]}) 

const determineMatch = (state: any, turn: CardState) => {
  const [c1, c2] = state.turn
  if(c1.char === c2.char) {
    const flat = flatMap((v: CardState) => v, state.boardConfig)
    const [matchedCards] = partition((v: CardState) => v.id === c1.id || v.id === c2.id, flat)
    const [foundMatch1, foundMatch2] = map((v: any) => ({...v, found:true}), matchedCards)
    const updatedBoard = map(row => row.map(updateRowMatch(foundMatch1, foundMatch2)), {...state.boardConfig})
    return left({...state, boardConfig: updatedBoard, turn:[turn]}  )
  }
  return left({...state, turn:[turn]})
}

const updateRowMatch = (m1: CardState, m2:CardState) => (card: CardState) =>  {
  if(card.id === m1.id) return  m1;
  else if(card.id === m2.id) return m2;
  else return card;
}



export function SessionStateReducerImperative(state = initialState, action: {type: string, payload: any}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        const {columns, symbols} = action.payload;
        return {...state, boardConfig: initGameBoard(columns, symbols), turn: [], prefs: {columns, symbols }}
      case '[Card] TAP':
        if(state.turn.length  < 2) return {...state, turn:[...state.turn, action.payload]}
        else if(state.turn.length === 2) {
          const [c1, c2] = state.turn
          if(c1.char === c2.char) {
            const flat = flatMap((v: CardState) => v, state.boardConfig)
            const [matchedCards] = partition((v: CardState) => v.id === c1.id || v.id === c2.id, flat)
            const [foundMatch1, foundMatch2] = map((v: any) => ({...v, found:true}), matchedCards)
            const updatedBoard = map(row => row.map(updateRowMatch(foundMatch1, foundMatch2)), {...state.boardConfig})
            return {...state, boardConfig: updatedBoard, turn:[action.payload]}  
          }
          return {...state, turn:[action.payload]}
        }
        return state
      default:
        return state
    }
  }