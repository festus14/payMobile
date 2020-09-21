import React, { Component } from 'react';
import { View, FlatList, Alert, Image, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';
import { connect } from 'react-redux';
import data from './data.json';
import { styles } from './style';
import {
  logout,
  updateNotifications,
  changeProfilePicture,
} from '../../store/actions/';
import ImagePicker from 'react-native-image-picker';
import defaultImage from '../../assets/images/myAvatar.png';
import { SECONDARY_COLOR } from '../../utility/colors';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: {
        'Email notifications': this.props.notifications.email_notify || 0,
        'SMS notifications': this.props.notifications.sms || 0,
      },
      avatarSource: null,
      error: '',
    };
  }

  onPressItem = (title) => {
    switch (title) {
      case 'Log Out':
        this.onLogout();
        break;
      case 'Change password':
        this.changePassword();
        break;
      case 'Change profile picture':
        this.changeProfilePictureHandler();
        break;
      default:
        this.onCheck(title);
        break;
    }
  };

  showError = (error) => {
    this.setState({ error });
    setTimeout(() => {
      this.setState({ error: '' });
    }, 5000);
  };

  changeProfileFunc = async () => {
    let error = await this.props.onChangeProfilePicture(
      this.state.avatarSource
    );

    if (error) {
      // console.warn(error);
      this.showError(error);
      this.setState({
        avatarSource: null,
      });
    } else {
      console.warn('Pix successfully changed');
    }
  };

  changeProfilePictureHandler = async () => {
    const options = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      // console.warn('Response = ', response);

      if (response.didCancel) {
        // console.warn('User cancelled image picker');
      } else if (response.error) {
        // console.warn('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = { uri, type, name };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });

        this.changeProfileFunc();
      }
    });
  };

  changePassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen');
  };

  onCheck = async (title) => {
    const type = title === 'Email notifications' ? 'email_notify' : 'sms';
    await this.setState({
      isChecked: {
        ...this.state.isChecked,
        [title]: this.state.isChecked[title] ? 0 : 1,
      },
    });
    await this.props.updateNotifications(
      this.state.isChecked,
      this.props.notifications.id
    );
    await this.setState({
      isChecked: {
        ...this.state.isChecked,
        [title]: this.props.notifications[type],
      },
    });
  };

  onLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await this.props.onLogOut();
          },
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { user, isPictureLoading } = this.props;
    if (this.state.error){
      Alert.alert(
        'Error',
        this.state.error,
        [
          {
            text: 'Close',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    }
    return (
      <View style={styles.container}>
        <Header title="Settings" />
        <View style={styles.imageContainer}>
          {isPictureLoading ? (
            <ActivityIndicator color={SECONDARY_COLOR} style={{...styles.loader, ...styles.image}} />
          ) : (
            <Image
              resizeMode="contain"
              style={styles.image}
              source={
                this.state.avatarSource
                  ? {uri: this.state.avatarSource.uri}
                  : { uri: user ? user.image_url : defaultImage }
              }
            />
          )}
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <ItemList
              item={item}
              onPress={this.onPressItem}
              isChecked={this.state.isChecked}
              notifications={this.props.notifications || {}}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.employees.notifications,
  user: state.user.user,
  isPictureLoading: state.ui.isPictureLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logout()),
  onChangeProfilePicture: (picture) => dispatch(changeProfilePicture(picture)),
  updateNotifications: (notifications, notificationsId) =>
    dispatch(updateNotifications(notifications, notificationsId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
