import { genGameBoard } from "../util/utils";

export const getGameLayout = (state: any) => {
  return state.gameConfig.boardConfig
}

const initialState = {
    boardConfig: genGameBoard()
}

export function GameConfigReducer(state = initialState, action: {type: string}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        return {...state, boardConfig: genGameBoard()}
      default:
        return state
    }
  }