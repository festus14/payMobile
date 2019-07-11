import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class PayrollScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View>
                <Text>Payroll Screen</Text>
            </View>
        )
    }
}
