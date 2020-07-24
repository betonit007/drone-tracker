import { SET_CURRENT_USER, SET_ERROR, CLEAR_ERROR } from '../types'


export default(state, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                authState: action.payload, //will spread token into state
                loading: false
            }
        case SET_ERROR:
          return {
              ...state,
              error: action.payload
          }
        case CLEAR_ERROR:
            return {
              ...state,
              error: null
            }
        default:
            return state
    }
}