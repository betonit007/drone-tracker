import { ADD_DRONE } from '../types'

export default(state, action) => {
    switch(action.type) {
        case ADD_DRONE:
            return {
                ...state,
                downedDrones: [...state.downedDrones, action.payload]
            }
        default:
            return state
    }
}