import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View } from 'react-native';
import { connect } from 'react-redux'
import { authAutoSignIn, getUser, authSetToken } from '../../store/actions';

class AuthLoadingScreen extends Component {
    componentDidMount = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const userId = await AsyncStorage.getItem('user-id')
            id = parseInt(userId)
            if (token && id) {
                await this.props.authSetToken(token, id)
                await this.props.getUser()
                this.props.navigation.navigate('DashboardScreen')
            } else {
                this.props.navigation.navigate('AuthScreen')
            }
        } catch (error) {
            this.props.navigation.navigate('AuthScreen')
        }
    }

    render() {
        return (
            <View>
                
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAutoSignIn: () => dispatch(authAutoSignIn()),
    authSetToken: (token, id) => dispatch(authSetToken(token, id)),
    getUser: () => dispatch(getUser())
})

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)