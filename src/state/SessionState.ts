import { initGameBoard } from "../util/utils";
import { partition, map } from "lodash/fp";
import { left, right, Either } from 'fp-ts/lib/Either'
import { State } from './index' 

export type CardState = {char:string, found: boolean, id: number}
export type GameConfig = CardState[][]

//** ACTIONS */
export const CardTap = (char: CardState) => ({type: '[Card] TAP', payload: char})
export const ResetGame = (columns:number, symbols:string) => ({type: '[GameBoard] RESET', payload: {columns, symbols}})

//** SELECTORS */
export const getGameLayout = (state: State) => state.sessionState.boardConfig
export const getPrefs = (state: State) => state.sessionState.prefs

//** REDUCER */
export const baseState = {
    boardConfig: initGameBoard(),
    turn: [] as CardState[],
    prefs: {columns: 4, symbols: 'A,B,C,D,E,F,G,H'}
}

export function SessionStateReducerImperative(state = baseState, action: ReducerAction<ResetPayload & CardState>) {
  switch (action.type) {
    case '[GameBoard] RESET':
      const {columns, symbols} = action.payload;
      return {...state, boardConfig: initGameBoard(columns, symbols), turn: [], prefs: {columns, symbols }}
    case '[Card] TAP':
      if(state.turn.length  < 2) return {...state, turn:[...state.turn, action.payload]}
      else if(state.turn.length === 2) {
        const [c1, c2] = state.turn
        if(c1.char === c2.char) {
          const [matchedCards]: CardState[][] = partition((v: CardState) => v.id === c1.id || v.id === c2.id, state.boardConfig.flat())
          const [foundMatch1, foundMatch2]:CardState[] = map((v: CardState): CardState => ({...v, found:true}), matchedCards)
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
type ReducerAction<T> = {type: string, payload: T }
export function SessionStateReducer(state: typeof baseState = baseState, action: ReducerAction<ResetPayload & CardState>): typeof baseState {
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

type LeftSide = typeof baseState
type RightSide = {s:typeof baseState, c:CardState}
type TapFlow = Either<LeftSide, RightSide>
const tapHandler = (state: typeof baseState, action:ReducerAction<CardState>) => {
  const tapped: TapFlow = right<LeftSide, RightSide>({s: state, c: action.payload})
  .chain(({s, c}) => onePlayed(s.turn) ? appendTurn(state, c) : right({s, c}))
  .chain(({s, c}) => twoPlayed(s.turn) ? determineMatch(s, c) : right({s, c}))
  .chain(({s}) => left(s))
  return tapped.fold(v => v, ({s}) => s);
}

const onePlayed = (turn:CardState[]) => turn.length < 2
const twoPlayed = (turn:CardState[]) => turn.length === 2
const appendTurn = (state: typeof baseState, turn: CardState):TapFlow => left({...state, turn:[...state.turn, turn]}) 

const determineMatch = (state: typeof baseState, currentTurn: CardState): TapFlow => {
  const [c1, c2] = state.turn
  if(c1.char === c2.char) {
    const [matchedCards]: CardState[][] = partition((v: CardState) => v.id === c1.id || v.id === c2.id, state.boardConfig.flat())
    const [foundMatch1, foundMatch2]:CardState[] = map((v: CardState) => ({...v, found:true}), matchedCards)
    const updatedBoard = map(row => row.map(updateRowMatch(foundMatch1, foundMatch2)), {...state.boardConfig})
    return left({...state, boardConfig: updatedBoard, turn:[currentTurn]}  )
  }
  return left({...state, turn:[currentTurn]})
}

const updateRowMatch = (m1: CardState, m2:CardState) => (card: CardState) =>  {
  if(card.id === m1.id) return  m1;
  else if(card.id === m2.id) return m2;
  else return card;
}