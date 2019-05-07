import { validChar } from "../util/utils";

export const revealedCard = (state: any) => state.revealed

const initialState = {
    revealed: [] as validChar[]
}

export function playerTapsReducer(state = initialState, action: {type: string, payload: validChar}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        return {...state, revealed:[]}
      case 'CARD_TAP':
        if(state.revealed.length  === 0) return {...state, revealed:[...state.revealed, action.payload]}
        else if(state.revealed.length === 1) return {...state, revealed:[]}
        return state
      default:
        return state
    }
  }