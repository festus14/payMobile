import {
    createStackNavigator,
} from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const SettingsNavigator = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    SettingsScreen,
    ChangePasswordScreen,
}, {
    initialRouteName: 'SettingsScreen',
});
export default SettingsNavigator;
