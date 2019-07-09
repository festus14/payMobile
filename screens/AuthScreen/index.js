import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { logIn, authError, authAutoSignIn } from '../../store/actions';
import { GREY } from '../../utility/colors'
import validate from '../../utility/validation'
import { styles } from './style';
import InputText from '../../components/InputText'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import DismissKeyboard from '../../components/DismissKeyboard'

class AuthScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false,
            password: {
                field: 'Password',
                value: '',
                error: undefined,
                validationRules: {
                    minLength: 6
                }
            },
            email: {
                field: 'Email',
                value: '',
                error: undefined,
                validationRules: {
                    isEmail: true,
                    minLength: 5
                }
            },
        }
    }

    toggleCheck = () => {
        this.setState({ isChecked: !this.state.isChecked })
    }

    loginHandler = async () => {
        if (this.state.email.value !== '' && this.state.password.value !== '') {
            try {
                if (this.state.authState !== 'login') {
                    throw new Error('Not in login mode')
                }
                await this.setState(prevState => ({
                    email: {
                        ...prevState.email,
                        error: validate(prevState.email.value, prevState.email.validationRules, prevState.email.field)
                    },
                    password: {
                        ...prevState.password,
                        error: validate(prevState.password.value, prevState.password.validationRules, prevState.password.field)
                    },
                }))

                if (this.state.email.error !== undefined) {
                    await this.props.authError(this.state.email.error)
                } else if (this.state.password.error !== undefined) {
                    await this.props.authError(this.state.password.error)
                } else {
                    this.props.authError('')
                    const authData = {
                        email: this.state.email.value.toLowerCase(),
                        password: this.state.password.value,
                    }
                    await this.props.onLogIn(authData)
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            if (!this.props.isLoading) {
                if (this.props.error !== '') {
                    this.showError(this.props.error);
                }
                if (this.props.isDoneLoading && this.props.user.first_name && this.props.error === '') {
                    this.props.navigation.navigate('ExploreScreen')
                }
            }
        }
    }

    showError = (error) => {
        this.setState({ error })
    }

    onChangeText = (input, type) => {
        this.setState({ [type]: {
            ...this.state[type],
            value: input
        } })
    }

    render() {
        return (
            <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image style={{ width: '40%', height: '40%' }} resizeMode="contain" source={{ uri: "https://portal.ipaysuite.com/assets/media/logos/logo.jpg" }} />
                    <Text style={styles.headText}>Sign in to account</Text>
                </View>
                <View style={styles.form}>
                    <InputText
                        icon="envelope"
                        placeholder="Email"
                        autoCorrect={false}
                        iconSize={16}
                        iconColor={GREY}
                        value={this.state.email.value}
                        onSubmitEditing={() => { this.password.focus() }}
                        onChangeText={input => this.onChangeText(input, 'email')}
                        autoCapitalize="none"
                    />
                    <InputText
                        icon="lock"
                        placeholder="Password"
                        secureTextEntry
                        iconSize={16}
                        iconColor={GREY}
                    />
                    <View style={styles.remember}>
                        <Checkbox
                            isChecked={this.state.isChecked}
                            onPress={this.toggleCheck}
                            containerStyle={{ marginRight: 8, width: 14, height: 14 }}
                        />
                        <Text style={styles.rememberText}>Remember Me?</Text>
                    </View>
                    <Button
                        text="Sign In"
                        style={styles.btn}
                        textStyle={styles.btnText}
                        isLoading={this.props.isLoading}
                    />
                    <TouchableOpacity style={styles.forgot}><Text style={styles.forgotText}>Forgot Password?</Text></TouchableOpacity>
                </View>
            </View>
            </DismissKeyboard>
        )
    }
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.ui.isLoading,
    isDoneLoading: state.ui.isDoneLoading,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    onLogIn: (authData) => dispatch(logIn(authData)),
    authError: (error) => dispatch(authError(error)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)