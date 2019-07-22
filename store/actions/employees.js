import {
    SET_EMPLOYEES,
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
            alert('Something went wrong, please try again. If this persists then you are not logged in');
            return false;
        }
    };
};
