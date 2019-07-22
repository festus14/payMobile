import {
    SET_PAYSLIPS,
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
            alert('Something went wrong, please try again. If this persists then you are not logged in');
            return false;
        }
    };
};
