import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class SettingsScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View>
                <Text>Settings Screen</Text>
            </View>
        )
    }
}
