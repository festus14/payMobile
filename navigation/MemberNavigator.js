import React from 'react';
import {
    createBottomTabNavigator,
} from 'react-navigation';
import DashboardNavigator from './DashboardNavigator';
import ReportsNavigator from './ReportsNavigator';
import EmployeesNavigator from './EmployeesNavigator';
import SettingsNavigator from './SettingsNavigator';
import PayrollNavigator from './PayrollNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    DARK_BLUE,
    DARK_GREEN,
} from '../utility/colors';
import { SCREEN_HEIGHT } from '../utility/constants';

const MemberNavigator = createBottomTabNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Dashboard: DashboardNavigator,
    Employees: EmployeesNavigator,
    Payroll: PayrollNavigator,
    Reports: ReportsNavigator,
    Settings: SettingsNavigator,
}, {
        initialRouteName: 'Dashboard',
        defaultNavigationOptions: ({
            navigation,
        }) => ({
            tabBarIcon: ({
                focused,
                horizontal,
                tintColor,
            }) => {
                const {
                    routeName,
                } = navigation.state;
                let iconName;

                switch (routeName) {
                    case 'Settings':
                        iconName = 'cog';
                        break;
                    case 'Dashboard':
                        iconName = 'tachometer';
                        break;
                    case 'Employees':
                        iconName = 'users';
                        break;
                    case 'Payroll':
                        iconName = 'money';
                        break;
                    case 'Reports':
                        iconName = 'file';
                        break;
                    default:
                        break;
                }

                // You can return any component that you like here!
                return <Icon name={iconName} color={tintColor} size={24} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: DARK_GREEN,
            inactiveTintColor: '#ccc',
            labelStyle: {
                fontFamily: 'Poppins-Regular',
            },
            style: {
                backgroundColor: DARK_BLUE,
                height: SCREEN_HEIGHT * 0.1,

            },
        },
    });

export default MemberNavigator;
