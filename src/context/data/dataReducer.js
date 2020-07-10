import { GET_DATA } from '../types'

export default(state, action) => {
    switch(action.type) {
        case GET_DATA:
            return {
                ...state,
                fetchedData: action.payload
            }
        default:
            return state
    }
}