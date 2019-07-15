// ui actions
export { uiStartLoading, uiStopLoading, userUiStartLoading, userUiStopLoading, employeesUiStartLoading, employeesUiStopLoading, payslipsUiStartLoading, payslipsUiStopLoading } from './ui';

// user actions
export { setUser, getUser, getUserId, getEmployee, resetUser } from './user';

// auth actions
export { logIn, authRemoveToken, authError, authSetToken, logout } from './auth';

// employees actions
export { setEmployees, getEmployees } from './employees';

export { getPayslips } from './payslips';
