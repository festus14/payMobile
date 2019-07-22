import {
    AUTH_ERROR,
    AUTH_REMOVE_TOKEN,
    AUTH_SET_TOKEN,
} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {
    uiStartLoading,
    uiStopLoading,
    setUser,
    resetApp,
} from './';
import {
    API_URL,
} from '../../utility/constants';

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        error,
    };
};

export const authSetToken = (token, userId) => {
    return {
        type: AUTH_SET_TOKEN,
        token,
        userId,
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN,
    };
};

export const logIn = (authData) => {
    return async (dispatch) => {
        try {
            dispatch(uiStartLoading());

            let res = await fetch(`${API_URL}login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            setTimeout(() => {
                if (!res) {
                    dispatch(uiStopLoading());
                    dispatch(authError('Please check your internet connection'));
                }
            }, 15000);

            let resJson = await res.json();
            console.warn(resJson);

            await dispatch(uiStopLoading());
            if (resJson.error) {
                dispatch(authError(resJson.error === 'Unauthorised' ? 'Email and password do not match' : 'Authentication failed, please try again'));
            } else {
                dispatch(authError(''));
                dispatch(authSetToken(resJson.success.token, resJson.success.user.id));
                await AsyncStorage.setItem('token', resJson.success.token);
                await AsyncStorage.setItem('user-id', `${resJson.success.user.id}`);
                dispatch(setUser(resJson.success.user));
            }
        } catch (error) {
            dispatch(uiStopLoading());
            console.warn(error);
            dispatch(authError('Authentication failed, please check your internet connection and try again'));
        }
    };
};

export const logout = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(uiStartLoading());

            let token = getState().auth.token;

            let res = await fetch(`${API_URL}api_logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });

            setTimeout(() => {
                if (!res) {
                    dispatch(uiStopLoading());
                    dispatch(authError('Please check your internet connection'));
                }
            }, 15000);

            let resJson = await res.json();
            console.warn(resJson);

            if (resJson.message || resJson.error) {
                alert('Logout failed, please try again');
                dispatch(uiStopLoading());
                return null;
            } else {
                dispatch(resetApp());
                dispatch(uiStopLoading());
                return 'done';
            }
        } catch (error) {
            alert('Logout failed, please try check your internet connection and try again');
            dispatch(uiStopLoading());
            return null;
        }
    };
};
