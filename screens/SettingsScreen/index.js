import React, { Component } from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';
import { connect } from 'react-redux';
import data from './data.json';
import { styles } from './style';
import { logout } from '../../store/actions/auth';

class SettingsScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    onPressItem = title => {
        switch (title) {
            case 'Log Out':
                this.onLogout();
                break;

            default:
                break;
        }
    }

    onLogout = async () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Yes', onPress: async () => {
                        let done = await this.props.onLogOut();
                        if (done) {
                            this.props.navigation.navigate('AuthScreen');
                        }
                    },
                },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title="Settings"
                />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${index}`}
                    extraData={this.state}
                    renderItem={({ item, index }) => <ItemList
                        item={item}
                        onPress={this.onPressItem}
                    />}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(SettingsScreen);
