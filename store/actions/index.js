import RNSecureKeyStore from 'react-native-secure-key-store';
import NavigationService from '../../NavigationService';

// ui actions
export { uiStartLoading, uiStopLoading, payrollsUiStartLoading, payrollsUiStopLoading, reportsUiStartLoading, reportsUiStopLoading, userUiStartLoading, userUiStopLoading, employeesUiStartLoading, employeesUiStopLoading, payslipsUiStartLoading, payslipsUiStopLoading, absenteeismUiStartLoading, absenteeismUiStopLoading, arrearsUiStartLoading, arrearsUiStopLoading } from './ui';

// user actions
export { setUser, getUser, getUserId, getEmployee, resetUser } from './user';

// auth actions
export { logIn, authRemoveToken, authError, authSetToken, logout } from './auth';

// employees actions
export { setEmployees, getEmployees, setNotifications, updateNotifications } from './employees';

// payslips actions
export { getPayslips, getDeductions, getPayments, getRecurrentDeductions, getRecurrentPayments } from './payslips';

// absenteeism actions
export { getAbsenteeism } from './absenteeism';

// payrolls actions
export { getPayrolls, sendPayrolls, getPayrollDetails } from './payrolls';

// arrears actions
export { getArrears } from './arrears';

export const resetApp = () => {
    return async (dispatch) => {
        await RNSecureKeyStore.remove('token');
        await RNSecureKeyStore.remove('userId');
        dispatch(reset());
        NavigationService.navigate("AuthScreen")
    };
};

const reset = () => ({
    type: 'RESET_APP',
});
