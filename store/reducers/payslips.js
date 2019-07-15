import { SET_PAYSLIPS } from '../actions/actionTypes';

const initialState = {
    payslips: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYSLIPS:
            return {
                ...state,
                payslips: action.payslips,
            };
        default:
            return state;
    }
};

export default reducer;
