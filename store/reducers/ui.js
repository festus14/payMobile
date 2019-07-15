import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    USER_UI_START_LOADING,
    USER_UI_STOP_LOADING,
    EMPLOYEES_UI_START_LOADING,
    EMPLOYEES_UI_STOP_LOADING,
    PAYSLIPS_UI_START_LOADING,
    PAYSLIPS_UI_STOP_LOADING,
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isDoneLoading: null,
    isUserLoading: false,
    isUserDoneLoading: null,
    isEmployeesLoading: false,
    isEmployeesDoneLoading: null,
    isPayslipsLoading: false,
    isPayslipsDoneLoading: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true,
                isDoneLoading: false,
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false,
                isDoneLoading: true,
            };
        case USER_UI_START_LOADING:
            return {
                ...state,
                isUserLoading: true,
                isUserDoneLoading: false,
            };
        case USER_UI_STOP_LOADING:
            return {
                ...state,
                isUserLoading: false,
                isUserDoneLoading: true,
            };
        case EMPLOYEES_UI_START_LOADING:
            return {
                ...state,
                isEmployeesLoading: true,
                isEmployeesDoneLoading: false,
            };
        case EMPLOYEES_UI_STOP_LOADING:
            return {
                ...state,
                isEmployeesLoading: false,
                isEmployeesDoneLoading: true,
            };
        case PAYSLIPS_UI_START_LOADING:
            return {
                ...state,
                isPayslipsLoading: true,
                isPayslipsDoneLoading: false,
            };
        case PAYSLIPS_UI_STOP_LOADING:
            return {
                ...state,
                isPayslipsLoading: false,
                isPayslipsDoneLoading: true,
            };
        default:
            return state;
    }
};

export default reducer
;