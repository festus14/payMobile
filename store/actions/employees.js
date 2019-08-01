import {
    SET_EMPLOYEES,
    SET_NOTIFICATIONS,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    employeesUiStartLoading,
    employeesUiStopLoading,
    resetApp,
} from './';

export const setEmployees = employees => {
    return {
        type: SET_EMPLOYEES,
        employees,
    };
};

export const setNotifications = notifications => {
    return {
        type: SET_NOTIFICATIONS,
        notifications,
    };
};

export const getEmployees = () => {
    return async (dispatch, getState) => {
        dispatch(employeesUiStartLoading());
        try {
            let token = getState().auth.token;

            let res = await fetch(`${API_URL}employees`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(employeesUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setEmployees(resJson.success));
                return resJson;
            }
        } catch (e) {
            dispatch(employeesUiStopLoading());
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const updateNotifications = (notifications) => {
    return async (dispatch, getState) => {
        try {
            let token = getState().auth.token;
            let employeeId = getState().user.employee.id;
            let company_id = getState().user.employee.company_id;

            let res = await fetch(`${API_URL}employee_notifications/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email_notify: notifications['Email notifications'],
                    sms: notifications['SMS notifications'],
                    company_id,
                }),
            });
            let resJson = await res.json();

            console.warn(resJson);

            if (resJson.error) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setNotifications(resJson));
                return resJson;
            }
        } catch (e) {
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};