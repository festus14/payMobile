import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    USER_UI_START_LOADING,
    USER_UI_STOP_LOADING,
    EMPLOYEES_UI_STOP_LOADING,
    EMPLOYEES_UI_START_LOADING,
    PAYSLIPS_UI_STOP_LOADING,
    PAYSLIPS_UI_START_LOADING,
} from './actionTypes';

export const uiStartLoading = () =>  {
    return {
        type: UI_START_LOADING,
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING,
    };
};

export const userUiStartLoading = () =>  {
    return {
        type: USER_UI_START_LOADING,
    };
};

export const userUiStopLoading = () => {
    return {
        type: USER_UI_STOP_LOADING,
    };
};

export const employeesUiStartLoading = () =>  {
    return {
        type: EMPLOYEES_UI_START_LOADING,
    };
};

export const employeesUiStopLoading = () => {
    return {
        type: EMPLOYEES_UI_STOP_LOADING,
    };
};

export const payslipsUiStartLoading = () =>  {
    return {
        type: PAYSLIPS_UI_START_LOADING,
    };
};

export const payslipsUiStopLoading = () => {
    return {
        type: PAYSLIPS_UI_STOP_LOADING,
    };
};