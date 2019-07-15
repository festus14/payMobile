import {
    createDrawerNavigator,
} from 'react-navigation';
import EmployeeDetails from '../screens/EmployeeDetails';
import EmployeePayslips from '../screens/EmployeePayslips';

const EmployeesDetailsNavigator = createDrawerNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    EmployeeDetails,
    EmployeePayslips,
}, {
    initialRouteName: 'EmployeeDetails',
    navigationOptions: {
        header: null,
    },
});
export default EmployeesDetailsNavigator;
