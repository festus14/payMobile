import {
    UI_START_LOADING,
    UI_STOP_LOADING
} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    isDoneLoading: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true,
                isDoneLoading: false
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false,
                isDoneLoading: true
            }
        default:
            return state
    }
}

export default reducer