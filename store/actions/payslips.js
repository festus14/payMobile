import {
    SET_PAYSLIPS,
    SET_PAYMENTS,
    SET_RECURRENT_PAYMENTS,
    SET_DEDUCTIONS,
    SET_RECURRENT_DEDUCTIONS
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    payslipsUiStartLoading,
    payslipsUiStopLoading,
    resetApp,
} from './';

export const setPayslips = payslips => {
    return {
        type: SET_PAYSLIPS,
        payslips,
    };
};

export const setPayments = payments => {
    return {
        type: SET_PAYMENTS,
        payments,
    };
};

export const setDeductions = deductions => {
    return {
        type: SET_DEDUCTIONS,
        deductions,
    };
};

export const setRecurrentPayments = recurrentPayments => {
    return {
        type: SET_RECURRENT_PAYMENTS,
        recurrentPayments,
    };
};

export const setRecurrentDeductions = recurrentDeductions => {
    return {
        type: SET_RECURRENT_DEDUCTIONS,
        recurrentDeductions,
    };
};

export const getPayslips = () => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = getState().auth.token;
            let userId = getState().user.employee.id;

            let res = await fetch(`${API_URL}payrolls/payslips/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setPayslips(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getPayments = () => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = getState().auth.token;

            let res = await fetch(`${API_URL}employee_payments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setPayments(resJson));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getDeductions = () => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = getState().auth.token;

            let res = await fetch(`${API_URL}employeedeductions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setDeductions(resJson));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};


export const getRecurrentPayments = () => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = getState().auth.token;

            let res = await fetch(`${API_URL}employee_recurrent_payments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setRecurrentPayments(resJson));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getRecurrentDeductions = () => {
    return async (dispatch, getState) => {
        dispatch(payslipsUiStartLoading());
        try {
            let token = getState().auth.token;

            let res = await fetch(`${API_URL}employee_recurrent_deductions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(payslipsUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setRecurrentDeductions(resJson));
                return resJson;
            }
        } catch (e) {
            dispatch(payslipsUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};
