import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import AuthScreen from '../screens/AuthScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const MainAppNavigator = createAppContainer(createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthScreen,
    AuthLoadingScreen
}, {
    initialRouteName: 'AuthLoadingScreen',
    navigationOptions: {
        header: null
    }
}))

export default MainAppNavigator