import React, { Component } from 'react';
import { connect } from 'react-redux';
import { strongRegex, mediumRegex } from '../../utility/constants';
import { styles } from './style';
import { changePassword } from '../../store/actions';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import DismissKeyboard from '../../components/DismissKeyboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GREY, LIGHTER_GREY, MAIN_COLOR } from '../../utility/colors';
import Header from '../../components/Header';
import validate from '../../utility/validation';

class ChangePasswordScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: {
        field: 'CurrentPassword',
        value: '',
        error: undefined,
        validationRules: {
          minLength: 4,
        },
      },
      newPassword: {
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
      error: '',
      passwordStrength: {
        color: 'white',
        strength: '',
      },
      passwordInfoModal: false,
    };
  }

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

    if (type === 'newPassword') {
      if (strongRegex.test(this.state[type].value)) {
        this.setState({
          passwordStrength: {
            ...this.state.passwordStrength,
            color: 'green',
            strength: 'strong',
          },
        });
      } else if (mediumRegex.test(this.state[type].value)) {
        this.setState({
          passwordStrength: {
            ...this.state.passwordStrength,
            color: 'orange',
            strength: 'medium',
          },
        });
      } else {
        this.setState({
          passwordStrength: {
            ...this.state.passwordStrength,
            color: 'red',
            strength: 'weak',
          },
        });
      }
    }
  };

  setPasswordInfoVisible = (visible) => {
    this.setState({ passwordInfoModal: visible });
  };

  validatePasswordChange = () => {
    const { newPassword, confirmPassword, currentPassword } = this.state;
    let error = '';
    error = validate(
      newPassword.value,
      newPassword.validationRules,
      newPassword.field
    );
    if (error) {
      return error;
    }
    error = validate(
      currentPassword.value,
      currentPassword.validationRules,
      currentPassword.field
    );
    if (error) {
      return error;
    }
    error =
      newPassword.value !== confirmPassword.value
        ? 'Password do not match'
        : false;
    if (error) {
      return error;
    }
    return '';
  };

  changePasswordHandler = async () => {
    const { currentPassword, newPassword, confirmPassword } = this.state;

    if (
      currentPassword.value !== '' &&
      newPassword.value !== '' &&
      confirmPassword.value !== ''
    ) {
      try {
        await this.setState((prevState) => ({
          ...prevState,
          currentPassword: {
            ...prevState.currentPassword,
            error: validate(
              prevState.currentPassword.value,
              prevState.currentPassword.validationRules,
              prevState.currentPassword.field
            ),
          },
          newPassword: {
            ...prevState.newPassword,
            error: validate(
              prevState.newPassword.value,
              prevState.newPassword.validationRules,
              prevState.newPassword.field
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
        }));

        let error = this.validatePasswordChange();
        console.warn(error);

        if (error) {
          this.showError(error);
        } else {
          const passwordData = {
            current_password: currentPassword.value,
            password: newPassword.value,
            password_confirmation: confirmPassword.value,
          };

          error = await this.props.onChangedPassword(passwordData);
          if (error) {
            this.showError(error);
          } else {
            console.warn('No error returned');
            this.props.navigation.navigate('AuthScreen');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  render() {
    const {
      passwordStrength,
      newPassword,
      confirmPassword,
      currentPassword,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Change Password" />
        <DismissKeyboard>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
          >
            <Text style={styles.error}>{this.state.error}</Text>
            <View style={{ width: '100%', marginTop: 40 }}>
              <Text style={styles.labelTxt}>Current Password</Text>
              <InputText
                secureTextEntry
                iconSize={16}
                iconColor={GREY}
                containerStyle={styles.inputContainer}
                value={this.state.currentPassword.value}
                getRef={(input) => {
                  this.currentPassword = input;
                }}
                onChangeText={(input) =>
                  this.onChangeText(input, 'currentPassword')
                }
                autoCapitalize="none"
                returnKeyTpe="next"
                onSubmitEditing={() => {
                  this.newPassword.focus();
                }}
              />
              <Text style={styles.labelTxt}>New Password</Text>
              <InputText
                secureTextEntry
                iconSize={16}
                iconColor={GREY}
                containerStyle={styles.inputContainer}
                value={this.state.newPassword.value}
                getRef={(input) => {
                  this.newPassword = input;
                }}
                onChangeText={(input) =>
                  this.onChangeText(input, 'newPassword')
                }
                autoCapitalize="none"
                returnKeyTpe="next"
                onSubmitEditing={() => {
                  this.confirmPassword.focus();
                }}
              />
              <View style={styles.warnView}>
                {passwordStrength.color !== 'white' && (
                  <TouchableOpacity
                    onPress={() =>
                      this.setPasswordInfoVisible(!this.state.passwordInfoModal)
                    }
                  >
                    <Icon
                      name="info-circle"
                      size={16}
                      color={passwordStrength.color}
                    />
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    ...styles.warnText,
                    color: passwordStrength.color,
                  }}
                >
                  {passwordStrength.strength}
                </Text>
              </View>

              <Text style={styles.labelTxt}>Confirm Password</Text>
              <InputText
                secureTextEntry
                iconSize={16}
                iconColor={GREY}
                containerStyle={styles.inputContainer}
                value={confirmPassword.value}
                getRef={(input) => {
                  this.confirmPassword = input;
                }}
                onChangeText={(input) =>
                  this.onChangeText(input, 'confirmPassword')
                }
                autoCapitalize="none"
                returnKeyTpe="go"
                onSubmitEditing={this.changePasswordHandler}
              />
              <Button
                text="Submit"
                style={{
                  ...styles.btn,
                  backgroundColor: this.validatePasswordChange()
                    ? LIGHTER_GREY
                    : MAIN_COLOR,
                }}
                textStyle={styles.btnText}
                isLoading={this.props.isLoading}
                onPress={this.changePasswordHandler}
                disabled={
                  this.validatePasswordChange()
                }
              />
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboard>
        {this.state.passwordInfoModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.passwordInfoModal}
            onRequestClose={() => {}}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.warnHead}>Password requirements are:</Text>
                <Text style={styles.warnTxts}>
                  {'\u25CF'} At least one upper case letter
                </Text>
                <Text style={styles.warnTxts}>
                  {'\u25CF'} At least one lower case letter
                </Text>
                <Text style={styles.warnTxts}>
                  {'\u25CF'} At least one symbol
                </Text>
                <Text style={styles.warnTxts}>
                  {'\u25CF'} At least one number
                </Text>

                <TouchableOpacity
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    this.setPasswordInfoVisible(!this.state.passwordInfoModal);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
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
  onChangedPassword: (passwordData) => dispatch(changePassword(passwordData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordScreen);
