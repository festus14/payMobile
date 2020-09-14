import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import {
  logIn,
  authError,
  forgotPassword,
  resetPassword,
} from '../../store/actions';
import { GREY } from '../../utility/colors';
import validate from '../../utility/validation';
import { styles } from './style';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import DismissKeyboard from '../../components/DismissKeyboard';
import logo from '../../assets/images/logo.jpg';
import { SCREEN_HEIGHT } from '../../utility/constants';

const url = 'https://portal.ipaysuite.com/password/reset';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPassword: {
        field: 'LoginPassword',
        value: '',
        error: undefined,
        validationRules: {
          minLength: 4,
        },
      },
      password: {
        field: 'Password',
        value: '',
        error: undefined,
        validationRules: {
          minLength: 8,
          isPassword: true,
        },
      },
      confirmPassword: {
        field: 'ConfirmPassword',
        value: '',
        error: undefined,
        validationRules: {
          minLength: 8,
        },
      },
      token: {
        field: 'Token',
        value: '',
        error: undefined,
        validationRules: {
          minLength: 3,
        },
      },
      email: {
        field: 'Email',
        value: '',
        error: undefined,
        validationRules: {
          isEmail: true,
          minLength: 5,
        },
      },
      error: '',
      authState: 'resetPassword',
    };
  }

  validateUser = () => {
    const { email, loginPassword } = this.state;
    let error = '';
    error = validate(email.value, email.validationRules, email.field);
    if (error) {
      return error;
    }
    error = validate(loginPassword.value, loginPassword.validationRules, loginPassword.field);
    if (error) {
      return error;
    }
    return '';
  };

  loginHandler = async () => {
    if (this.state.email.value !== '' && this.state.loginPassword.value !== '') {
      try {
        await this.setState((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            error: validate(
              prevState.email.value,
              prevState.email.validationRules,
              prevState.email.field
            ),
          },
          loginPassword: {
            ...prevState.loginPassword,
            error: validate(
              prevState.loginPassword.value,
              prevState.loginPassword.validationRules,
              prevState.loginPassword.field
            ),
          },
        }));

        let error = this.validateUser();

        if (error) {
          this.showError(error);
        } else {
          const authData = {
            email: this.state.email.value.toLowerCase(),
            password: this.state.loginPassword.value,
          };

          error = await this.props.onLogIn(authData);
          if (error) {
            this.showError(error);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  showError = (error) => {
    this.setState({ error });
    setTimeout(() => {
      this.setState({ error: '' });
    }, 5000);
  };

  onChangeText = (input, type) => {
    this.setState({
      [type]: {
        ...this.state[type],
        value: input,
      },
    });
  };

  changePassword = () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.warn("Don't know how to open URI: " + url);
      }
    });
  };

  forgotPasswordHandler = async () => {
    const { email } = this.state;
    if (email.value !== '') {
      try {
        await this.setState((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            error: validate(
              prevState.email.value,
              prevState.email.validationRules,
              prevState.email.field
            ),
          },
        }));

        let error = validate(email.value, email.validationRules, email.field);

        if (error) {
          this.showError(error);
        } else {
          error = await this.props.onForgotPassword(email.value);
          if (error) {
            this.showError(error);
          } else {
            this.setState({ authState: 'resetPassword' });
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  validateResetPassword = () => {
    const { password, confirmPassword, token } = this.state;
    let error = '';
    error = validate(token.value, token.validationRules, token.field);
    if (error) {
      return error;
    }
    error = validate(password.value, password.validationRules, password.field);
    if (error) {
      return error;
    }
    error = password.value !== confirmPassword.value ? 'Password do not match' : false;
    if (error) {
      return error;
    }
    return '';
  };

  resetPasswordHandler = async () => {
    const { email, token, password, confirmPassword } = this.state;

    if (token.value !== '' && password.value !== '' && confirmPassword !== '') {
      try {
        await this.setState((prevState) => ({
          ...prevState,
          password: {
            ...prevState.password,
            error: validate(
              prevState.password.value,
              prevState.password.validationRules,
              prevState.password.field
            ),
          },
          confirmPassword: {
            ...prevState.confirmPassword,
            error: validate(
              prevState.confirmPassword.value,
              prevState.confirmPassword.validationRules,
              prevState.confirmPassword.field
            ),
          },
          token: {
            ...prevState.token,
            error: validate(
              prevState.token.value,
              prevState.token.validationRules,
              prevState.token.field
            ),
          },
        }));

        let error = this.validateResetPassword();

        if (error) {
          this.showError(error);
        } else {
          const resetData = {
            email: email.value.toLowerCase(),
            password: password.value,
            password_confirmation: confirmPassword.value,
            token: token.value,
          };

          error = await this.props.onResetPassword(resetData);
          if (error) {
            this.showError(error);
          } else {
            console.warn('Successfully changed');
            this.setState({ authState: 'resetPassword' });
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  render() {
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}
        >
          <View
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: SCREEN_HEIGHT }}
          >
            <View style={styles.image}>
              <Image
                style={{ width: '60%', height: '60%' }}
                resizeMode="contain"
                source={logo}
              />
              <Text style={styles.headText}>
                {this.state.authState === 'login'
                  ? 'Sign in to account'
                  : this.state.authState === 'forgotPassword'
                  ? 'Forgot Password'
                  : 'Reset Password'}
              </Text>
            </View>
            {this.state.authState === 'login' ? (
              <>
                <View style={styles.form}>
                  <Text style={styles.error}>{this.state.error}</Text>
                  <InputText
                    icon="envelope"
                    placeholder="Email"
                    autoCorrect={false}
                    iconSize={16}
                    iconColor={GREY}
                    value={this.state.email.value}
                    onSubmitEditing={() => {
                      this.loginPassword.focus();
                    }}
                    onChangeText={(input) => this.onChangeText(input, 'email')}
                    autoCapitalize="none"
                    returnKeyType="next"
                    keyboardType="email-address"
                  />
                  <InputText
                    icon="lock"
                    placeholder="Password"
                    secureTextEntry
                    iconSize={16}
                    iconColor={GREY}
                    value={this.state.loginPassword.value}
                    getRef={(input) => {
                      this.loginPassword = input;
                    }}
                    onChangeText={(input) =>
                      this.onChangeText(input, 'loginPassword')
                    }
                    autoCapitalize="none"
                    returnKeyTpe="go"
                    onSubmitEditing={this.loginHandler}
                  />
                  <Button
                    text="Sign In"
                    style={styles.btn}
                    textStyle={styles.btnText}
                    isLoading={this.props.isLoading}
                    onPress={this.loginHandler}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ authState: 'forgotPassword' })
                    }
                    style={styles.forgot}
                  >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : this.state.authState === 'forgotPassword' ? (
              <View style={{ ...styles.form, height: SCREEN_HEIGHT * 0.32 }}>
                <Text style={styles.error}>{this.state.error}</Text>
                <InputText
                  icon="envelope"
                  placeholder="Email"
                  autoCorrect={false}
                  iconSize={16}
                  iconColor={GREY}
                  value={this.state.email.value}
                  onSubmitEditing={() => {
                    this.password.focus();
                  }}
                  onChangeText={(input) => this.onChangeText(input, 'email')}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="email-address"
                />
                <Button
                  text="Submit"
                  style={styles.btn}
                  textStyle={styles.btnText}
                  isLoading={this.props.isLoading}
                  onPress={this.forgotPasswordHandler}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ authState: 'login' })}
                  style={styles.forgot}
                >
                  <Text style={{ ...styles.forgotText, paddingRight: 8 }}>
                    Sign in to account
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ ...styles.form, height: SCREEN_HEIGHT * 0.6 }}>
                <Text style={styles.error}>{this.state.error}</Text>
                <InputText
                  icon="lock"
                  placeholder="Verify Token"
                  iconSize={16}
                  iconColor={GREY}
                  value={this.state.token.value}
                  getRef={(input) => {
                    this.password = input;
                  }}
                  onChangeText={(input) => this.onChangeText(input, 'token')}
                  autoCapitalize="none"
                  returnKeyTpe="go"
                  onSubmitEditing={this.loginHandler}
                />
                <InputText
                  icon="lock"
                  placeholder="New Password"
                  secureTextEntry
                  iconSize={16}
                  iconColor={GREY}
                  value={this.state.password.value}
                  getRef={(input) => {
                    this.password = input;
                  }}
                  onChangeText={(input) => this.onChangeText(input, 'password')}
                  autoCapitalize="none"
                  returnKeyTpe="go"
                  onSubmitEditing={this.loginHandler}
                />
                <InputText
                  icon="lock"
                  placeholder="Confirm Password"
                  secureTextEntry
                  iconSize={16}
                  iconColor={GREY}
                  value={this.state.confirmPassword.value}
                  getRef={(input) => {
                    this.password = input;
                  }}
                  onChangeText={(input) =>
                    this.onChangeText(input, 'confirmPassword')
                  }
                  autoCapitalize="none"
                  returnKeyTpe="go"
                  onSubmitEditing={this.loginHandler}
                />
                <Text style={styles.warnText}>e.g I@mTrue2020</Text>
                <Button
                  text="Submit"
                  style={styles.btn}
                  textStyle={styles.btnText}
                  isLoading={this.props.isLoading}
                  onPress={this.resetPasswordHandler}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ authState: 'login' })}
                  style={styles.forgot}
                >
                  <Text style={{ ...styles.forgotText, paddingRight: 8 }}>
                    Sign in to account
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: 30,
              }}
            >
              <Text style={styles.vText}>v1.0</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isLoading: state.ui.isLoading,
  isDoneLoading: state.ui.isDoneLoading,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogIn: (authData) => dispatch(logIn(authData)),
  onForgotPassword: (email) => dispatch(forgotPassword(email)),
  onResetPassword: (resetData) => dispatch(resetPassword(resetData)),
  authError: (error) => dispatch(authError(error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
