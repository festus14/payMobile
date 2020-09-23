import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { DARK_GREEN, SECONDARY_COLOR } from '../utility/colors';
import Icon from 'react-native-vector-icons/Feather';
import { STATUS_BAR_HEIGHT } from '../utility/constants';

export default class Header extends Component {
    render() {
        const { style = {},
            leftColor = '#fff',
            leftSize = 30,
            titleStyle = {},
            rightColor = '#fff',
            rightSize = 30,
            rightIcon,
            leftIcon,
            title = '',
            onLeftPress,
            onRightPress,
        } = this.props;
        return (
            <View style={[styles.header, style]}>
                <StatusBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                />
                {Platform.OS !== 'android' && <View style={styles.status} />}
                <View style={styles.details}>
                    <View style={styles.iconContainer}>
                        {leftIcon && <TouchableOpacity onPress={onLeftPress} style={styles.icon}>
                            <Icon name={leftIcon} color={leftColor} size={leftSize} />
                        </TouchableOpacity>}
                    </View>
                    <View style={[styles.textContainer, titleStyle]}>
                        <Text style={styles.text}>{title || ''}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        {rightIcon && <TouchableOpacity  onPress={onRightPress} style={styles.icon}>
                            <Icon name={rightIcon} color={rightColor} size={rightSize} />
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: SECONDARY_COLOR,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(190, 190, 190)',
                shadowOpacity: 0.6,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            },
            android: {
                elevation: 5,
            },
        }),
        width: '100%',
        height: '13%',
        ...Platform.select({
            android: {
                height: '10%',
            },
        }),
    },
    status: {
        height: STATUS_BAR_HEIGHT,
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        width: '10%',
    },
})
;