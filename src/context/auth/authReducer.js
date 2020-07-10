import { SET_CURRENT_USER } from '../types'


export default(state, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            console.log(action.payload)
            return {
                ...state,
                ...action.payload, //will spread token into state
                loading: false
            }
        default:
            return state
    }
}