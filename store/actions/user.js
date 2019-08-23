import {
    SET_USER,
    RESET_USER,
    SET_EMPLOYEE,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    userUiStartLoading,
    userUiStopLoading,
    resetApp,
} from './';
import { setNotifications } from './employees';

export const setUser = (user) => {
    return {
        type: SET_USER,
        user,
    };
};

export const setEmployee = (employee) => {
    return {
        type: SET_EMPLOYEE,
        employee,
    };
};

export const resetUser = (user) => {
    return {
        type: RESET_USER,
    };
};

export const getUserId = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            let userId = await getState().auth.userId;

            if (!userId) {
                try {
                    userId = await getState().auth.userId;

                    resolve(parseInt(userId));
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(userId);
            }
        });
    };
};

export const getUser = () => {
    return async (dispatch, getState) => {
        dispatch(userUiStartLoading());
        try {
            let userData = await getState().user.user;

            if (!userData.email) {
                let token = getState().auth.token;
                let userId = await dispatch(getUserId());

                let res = await fetch(`${API_URL}users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                    },
                });
                let resJson = await res.json();

                console.warn(resJson);

                await dispatch(userUiStopLoading());
                if (resJson.error) {
                    if (resJson.message === 'Unauthenticated.') {
                        dispatch(resetApp());
                    }
                    alert(resJson.error || 'Something went wrong, pls try again');
                    return false;
                } else {
                    dispatch(setUser(resJson.success));
                    return resJson.user;
                }
            } else {
                await dispatch(userUiStopLoading());
                return userData;
            }
        } catch (e) {
            dispatch(userUiStopLoading());
            console.warn(e);
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};

export const getEmployee = () => {
    return async (dispatch, getState) => {
        dispatch(userUiStartLoading());
        try {
            let userData = await getState().user.employee;

            if (!userData.first_name) {
                let token = await getState().auth.token;
                let userId = await dispatch(getUserId());

                console.warn(token);

                let res = await fetch(`${API_URL}employees/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                    },
                });
                let resJson = await res.json();

                console.warn(resJson);

                await dispatch(userUiStopLoading());
                if (resJson.error || resJson.message) {
                    if (resJson.message === 'Unauthenticated.') {
                        dispatch(resetApp());
                    }
                    alert(resJson.error || 'Something went wrong, pls try again');
                    return false;
                } else {
                    dispatch(setEmployee(resJson.success));
                    dispatch(setNotifications(resJson.success.notification));
                    return resJson;
                }
            } else {
                await dispatch(userUiStopLoading());
                return userData;
            }
        } catch (e) {
            dispatch(userUiStopLoading());
            console.warn(e);
            alert('Something went wrong, please check your internet connection and try again. If this persists then you are not logged in');
            return false;
        }
    };
};
