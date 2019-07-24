import {
    createStackNavigator
} from 'react-navigation';
import PayrollScreen from '../screens/PayrollScreen';
import PayslipsScreen from '../screens/PayslipsScreen';

const PayrollNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    PayrollScreen,
    PayslipsScreen,
}, {
    initialRouteName: 'PayrollScreen',
})
export default PayrollNavigator;