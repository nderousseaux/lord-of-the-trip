const initialState = { test: 0 }

export default function testReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TEST':
        nextState = { 
            ...state,
            test: state.test + 1 
        }
      return nextState
  default:
    return state
  }
}