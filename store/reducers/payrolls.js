import { SET_PAYROLLS } from '../actions/actionTypes';

const initialState = {
    payrolls: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYROLLS:
            return {
                ...state,
                payrolls: action.payrolls,
            };
        default:
            return state;
    }
};

export default reducer;
