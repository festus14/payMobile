import {
    createDrawerNavigator,
} from 'react-navigation';
import EmployeeDetails from '../screens/EmployeeDetails';
import EmployeePayslips from '../screens/EmployeePayslips';
import EmployeeAbsenteeism from '../screens/EmployeeAbsenteeism';
import EmployeeArrears from '../screens/EmployeeArrears';

const EmployeesDetailsNavigator = createDrawerNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    EmployeeDetails,
    EmployeePayslips,
    EmployeeAbsenteeism,
    EmployeeArrears,
}, {
    initialRouteName: 'EmployeeDetails',
    navigationOptions: {
        header: null,
    },
    drawerPosition: 'right'
});
export default EmployeesDetailsNavigator;
