import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { GREY, DARK_GREEN } from '../utility/colors';
import { getMonth, reformatDate } from '../utility/helpers';

export default class ArrearsItem extends Component {
    render() {
        const { item } = this.props;
        const payment_date = reformatDate(item.payment_date);
        const date = reformatDate(item.date);

        return (
            <View style={styles.item}>
                <View style={styles.option}>
                    <Text style={styles.dept}>Arrear Date</Text>
                    <Text style={styles.date}>{`${getMonth(date.getMonth() + 1)} ${date.getFullYear()}`}</Text>
                </View>
                <View style={styles.option}>
                    <Text style={styles.dept}>Payment Date</Text>
                    <Text style={styles.date}>{`${getMonth(payment_date.getMonth() + 1)} ${payment_date.getFullYear()}`}</Text>
                </View>
                <View style={styles.option}>
                    <Text style={styles.dept}>Days</Text>
                    <Text style={styles.date}>{item.days}</Text>
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
        minHeight: 100,
        backgroundColor: '#fff',
    },
    option: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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
});
