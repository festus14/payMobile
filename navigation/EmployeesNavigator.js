import {
    createStackNavigator
} from 'react-navigation';
import EmployeesScreen from '../screens/EmployeesScreen';

const EmployeesNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    EmployeesScreen
}, {
    initialRouteName: 'EmployeesScreen',
})
export default EmployeesNavigator;