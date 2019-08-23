import React, { PureComponent } from 'react';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { authAutoSignIn, getUser, authSetToken } from '../../store/actions';

class AuthLoadingScreen extends PureComponent {
    componentDidMount = async () => {
        try {
            const token = await RNSecureKeyStore.get('token');
            const userId = await RNSecureKeyStore.get('user-id');
            const id = parseInt(userId, 10);
            if (token && id) {
                await this.props.authSetToken(token, id);
                await this.props.getUser();
                this.props.navigation.navigate('DashboardScreen');
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

const mapDispatchToProps = dispatch => ({
    onAutoSignIn: () => dispatch(authAutoSignIn()),
    authSetToken: (token, id) => dispatch(authSetToken(token, id)),
    getUser: () => dispatch(getUser()),
});

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);
