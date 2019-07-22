import { AUTH_ERROR, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes';

const initialState = {
    error: '',
    token: null,
    userId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case AUTH_SET_TOKEN:
            console.warn(action.token);
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            };
        case AUTH_REMOVE_TOKEN:
            return initialState;
        default:
            return state;
    }
};

export default reducer
;