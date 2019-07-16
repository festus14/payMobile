import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ALMOST_BLACK, GREY, DARK_GREEN, LIGHT_BLUE } from '../utility/colors';

export default class ArrearsItem extends Component {
    render() {
        return (
            <View style={styles.item}>
                            <View style={styles.upper}>
                                <View>
                                    <Text style={styles.date}>May, 2019</Text>
                                    <Text style={styles.dept}>Finance</Text>
                                    <Text style={styles.city}>Lagos</Text>
                                </View>
                                <TouchableOpacity><Text style={styles.btnText}>Download</Text></TouchableOpacity>
                            </View>
                            <View style={styles.net}>
                                <Text style={styles.netText}>Net(USD): </Text>
                                <Text style={styles.netMoney}> 19,000,000,000.00</Text>
                            </View>
                        </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(77, 84, 124)',
                shadowOpacity: 0.09,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            },
            android: {
                elevation: 4,
            },
        }),
        margin: 10,
        padding: 10,
        justifyContent: 'space-between',
        minHeight: 140,
        backgroundColor: '#fff',
    },
    upper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    date: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: GREY,
    },
    dept: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: DARK_GREEN,
    },
    city: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: ALMOST_BLACK,
    },
    btnText: {
        color: LIGHT_BLUE,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,
    },
    net: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    netText: {
        color: DARK_GREEN,
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    netMoney: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: ALMOST_BLACK,
    },
});
