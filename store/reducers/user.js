import { SET_USER, AUTH_REMOVE_TOKEN } from "../actions/actionTypes";

const initialState = {
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case AUTH_REMOVE_TOKEN:
            return initialState
        default:
            return state
    }
}

export default reducer