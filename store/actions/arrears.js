import {
    SET_ARREARS,
} from './actionTypes';
import {
    API_URL,
} from '../../utility/constants';
import {
    arrearsUiStartLoading,
    arrearsUiStopLoading,
    resetApp,
} from './';

export const setArrears = arrears => {
    return {
        type: SET_ARREARS,
        arrears,
    };
};

export const getArrears = () => {
    return async (dispatch, getState) => {
        dispatch(arrearsUiStartLoading());
        try {
            let token = getState().auth.token;

            let res = await fetch(`${API_URL}employeeareas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                },
            });
            let resJson = await res.json();

            console.warn(resJson);

            await dispatch(arrearsUiStopLoading());
            if (resJson.error || resJson.message) {
                if (resJson.message === 'Unauthenticated.') {
                    dispatch(resetApp());
                }
                alert(resJson.error || 'Something went wrong, pls try again');
                return false;
            } else {
                dispatch(setArrears(resJson));
                return resJson;
            }
        } catch (e) {
            dispatch(arrearsUiStopLoading());
            alert('Something went wrong, please try again. If this persists then you are not logged in');
            return false;
        }
    };
};
