import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { DARK_GREEN, LIGHTER_GREY } from '../utility/colors';
import { getMonth } from '../utility/helpers';
import EmployeeItem from './EmployeeItem';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PayslipItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDownloading: false,
            isSending: false
        }
    }

    sendPayrolls = async () => {
        const { item, sendPayrolls } = this.props;
        this.setState({
            isSending: true
        });
        console.warn("object")

        await sendPayrolls(item.month, item.year, item.group_id, item.company_id)

        this.setState({
            isSending: false
        });
    }

    downloadPayrolls = async () => {
        const { item, downloadPayrolls } = this.props;
        this.setState({
            isDownloading: true
        });

        await downloadPayrolls(item.month, item.year, item.group_id, item.company_id)

        this.setState({
            isDownloading: false
        });
    }

    render() {
        const { item, navigation } = this.props;

        return (
            <View style={[styles.section, { backgroundColor: item.supervisor_approval.toLowerCase() === 'approved' ? DARK_GREEN : '#a00' }]}>
                <View style={[styles.sectionDetails]}>
                    <Text style={styles.sectionTitle}>{`${getMonth(item.month)} ${item.year}`}</Text>
                    <EmployeeItem labelStyle={styles.white} valueStyle={styles.white} title="HR Approval" value={item.hr_approval} />
                    <EmployeeItem labelStyle={styles.white} valueStyle={styles.white} title="Supervisor Approval" value={item.supervisor_approval} />
                    <Text style={styles.footer}>{item.group_id}</Text>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity onPress={() => navigation.navigate('PayslipsScreen', { item })}>
                        <Icon name="ios-eye" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.isSending} onPress={this.downloadPayrolls}>
                        <Icon name="ios-download" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.isDownloading} onPress={this.sendPayrolls}>
                        <Icon name="ios-send" size={25} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    section: {
        margin: 10,
        backgroundColor: '#fff',
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
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 17,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionDetails: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        borderRadius: 5,
    },
    white: {
        color: LIGHTER_GREY,
    },
    footer: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 15,
        textAlign: 'center',
        flexGrow: 1,
    },
    view: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
