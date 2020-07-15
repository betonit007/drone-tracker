import { ADD_DRONE, SET_MARKER } from '../types'

export default(state, action) => {
    switch(action.type) {
        case ADD_DRONE:
            return {
                ...state,
                downedDrones: action.payload
            }
        case SET_MARKER:
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state
    }
}