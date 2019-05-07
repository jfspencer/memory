const initialState = {
    activeGame: []
}

export function SessionStateReducer(state = initialState, action: {type: string}) {
    switch (action.type) {
      case '[GameBoard] RESET':
        return {activeGame: []}
      default:
        return state
    }
  }