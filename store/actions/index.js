import AsyncStorage from '@react-native-community/async-storage';

// ui actions
export { uiStartLoading, uiStopLoading, payrollsUiStartLoading, payrollsUiStopLoading, userUiStartLoading, userUiStopLoading, employeesUiStartLoading, employeesUiStopLoading, payslipsUiStartLoading, payslipsUiStopLoading, absenteeismUiStartLoading, absenteeismUiStopLoading, arrearsUiStartLoading, arrearsUiStopLoading } from './ui';

// user actions
export { setUser, getUser, getUserId, getEmployee, resetUser } from './user';

// auth actions
export { logIn, authRemoveToken, authError, authSetToken, logout } from './auth';

// employees actions
export { setEmployees, getEmployees } from './employees';

// payslips actions
export { getPayslips, getDeductions, getPayments, getRecurrentDeductions, getRecurrentPayments } from './payslips';

// absenteeism actions
export { getAbsenteeism } from './absenteeism';

// payrolls actions
export { getPayrolls, sendPayrolls, downloadPayrolls } from './payrolls';

// arrears actions
export { getArrears } from './arrears';

export const resetApp = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        return ({
            type: 'RESET_APP',
        });
    };
};
