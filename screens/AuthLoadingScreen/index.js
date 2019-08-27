import React, { PureComponent } from 'react';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { authAutoSignIn, getUser, authSetToken } from '../../store/actions';
import { isAdmin } from '../../utility/helpers';

class AuthLoadingScreen extends PureComponent {
    componentDidMount = async () => {
        try {
            const token = await RNSecureKeyStore.get('token');
            const userId = await RNSecureKeyStore.get('user-id');
            const id = parseInt(userId, 10);
            if (token && id) {
                await this.props.authSetToken(token, id);
                console.warn(id);
                await this.props.getUser();
                if (isAdmin(this.props.user.role)) {
                    this.props.navigation.navigate('MemberNavigator');
                } else {
                    this.props.navigation.navigate('EmployeeMainNavigator');
                }
            } else {
                this.props.navigation.navigate('AuthScreen');
            }
        } catch (error) {
            this.props.navigation.navigate('AuthScreen');
        }
    }

    render() {
        return (
            <View />
        );
    }
}

const mapStateToProps = (state) => ({
    employee: state.user.employee,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    onAutoSignIn: () => dispatch(authAutoSignIn()),
    authSetToken: (token, id) => dispatch(authSetToken(token, id)),
    getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
