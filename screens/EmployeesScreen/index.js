import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class EmployeesScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View>
                <Text>Employees Screen</Text>
            </View>
        )
    }
}
