import { initGameBoard } from "../util/utils";
import { partition, map } from "lodash/fp";
import { left, right, Either } from 'fp-ts/lib/Either'
import { State } from './index' 

export type Card = {char:string, found: boolean, id: number}
export type GameConfig = Card[][]

//** ACTIONS */
export const TapCard = (char: Card) => ({type: '[Card] TAP', payload: char})
export const ResetGame = (columns:number, symbols:string) => ({type: '[GameBoard] RESET', payload: {columns, symbols}})

//** SELECTORS */
export const getGameLayout = (state: State) => state.sessionState.boardConfig

//** REDUCER */
export const baseState = {
    boardConfig: initGameBoard(),
    turn: [] as Card[],
    prefs: {columns: 4, symbols: 'A,B,C,D,E,F,G,H'}
}
type ReducerAction<T> = {type: string, payload: T }
export function SessionStateReducerImperative(state = baseState, action: ReducerAction<ResetPayload & Card>): typeof baseState {
  switch (action.type) {
    case '[GameBoard] RESET':
      const {columns, symbols} = action.payload;
      return {...state, boardConfig: initGameBoard(columns, symbols), turn: [], prefs: {columns, symbols }}
    case '[Card] TAP':
      if(state.turn.length  < 2) return {...state, turn:[...state.turn, action.payload]}
      else if(state.turn.length === 2) {
        const [c1, c2] = state.turn
        if(c1.char === c2.char) {
          const [matchedCards]: Card[][] = partition((v: Card) => v.id === c1.id || v.id === c2.id, state.boardConfig.flat())
          const [foundMatch1, foundMatch2]:Card[] = map((v: Card): Card => ({...v, found:true}), matchedCards)
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

//functional implementation
export function SessionStateReducer(state = baseState, action: ReducerAction<ResetPayload & Card>): typeof baseState {
  switch (action.type) {
    case '[GameBoard] RESET': return resetHandler(state, action)
    case '[Card] TAP': return tapHandler(state, action)
    default: return state
  }
}

type ResetPayload = {columns: number, symbols: string}
const resetHandler = (state: typeof baseState, action:ReducerAction<ResetPayload>) => {
  const {columns, symbols} = action.payload;
  return {...state, boardConfig: initGameBoard(columns, symbols), turn: [], prefs: {columns, symbols }}
}

type L = typeof baseState
type R = {s:typeof baseState, c:Card}
type TapFlow = Either<L, R>
const tapHandler = (state: typeof baseState, action:ReducerAction<Card>) => {
  return right<L, R>({s: state, c: action.payload})
  .chain(({s, c}) => onePlayed(s.turn) ? appendTurn(state, c) : right({s, c}))
  .chain(({s, c}) => twoPlayed(s.turn) ? determineMatch(s, c) : left<L, R>(s))
  .fold(v => v, ({s}) => s);
}

const onePlayed = (turn:Card[]) => turn.length < 2
const twoPlayed = (turn:Card[]) => turn.length === 2
const appendTurn = (state: typeof baseState, turn: Card):TapFlow => left({...state, turn:[...state.turn, turn]}) 

const determineMatch = (state: typeof baseState, currentTurn: Card): TapFlow => {
  const [c1, c2] = state.turn
  if(c1.char === c2.char) {
    const [matchedCards]: Card[][] = partition((v: Card) => v.id === c1.id || v.id === c2.id, state.boardConfig.flat())
    const [foundMatch1, foundMatch2]:Card[] = map((v: Card) => ({...v, found:true}), matchedCards)
    const updatedBoard = map(row => row.map(updateRowMatch(foundMatch1, foundMatch2)), {...state.boardConfig})
    return left({...state, boardConfig: updatedBoard, turn:[currentTurn]}  )
  }
  return left({...state, turn:[currentTurn]})
}

const updateRowMatch = (m1: Card, m2:Card) => (card: Card) =>  {
  if(card.id === m1.id) return  m1;
  else if(card.id === m2.id) return m2;
  else return card;
}