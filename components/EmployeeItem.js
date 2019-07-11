import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { GREY, DARK_GREEN } from '../utility/colors';

export default class EmployeeItem extends Component {
    render() {
        if (this.props.value) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        width: '50%'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17,
        color: DARK_GREEN
    },
    value: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: GREY
    }
})
