import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DARK_GREEN, LIGHTER_GREY } from '../utility/colors';
import { getMonth } from '../utility/helpers';
import EmployeeItem from './EmployeeItem';
import Icon from 'react-native-vector-icons/Ionicons';
import downloadManager from 'react-native-simple-download-manager';
import { API_URL } from '../utility/constants';

export default class PayslipItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDownloading: false,
            isSending: false,
        };
    }

    sendPayrolls = async () => {
        try {
            const { item, sendPayrolls } = this.props;
            this.setState({
                isSending: true,
            });

            let resJson = await sendPayrolls(item.month, item.year, item.group_id, item.company_id);

            if (!resJson) { throw new Error(); }

            this.setState({
                isSending: false,
            });
        } catch (e) {
            this.setState({ isSending: false });
        }
    }

    onSendPayrolls = () => {
        Alert.alert(
            'Send Payslips to employees',
            'Are you sure you want to send all payslips in this payroll?',
            [
                {
                    text: 'Yes', onPress: this.sendPayrolls,
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

    downloadPayrolls = async () => {
        try {
            const { item, getToken } = this.props;
            const token = await getToken();
            console.warn(token);
            await this.setState({
                isDownloading: true,
            });

            let filename = `payroll-${item.group_id}.zip`;

            const config = {
                downloadTitle: 'iPaySuite',
                downloadDescription: `Downloading payslip (${filename})`,
                saveAsName: filename,
                allowedInRoaming: true,
                allowedInMetered: true,
                showInDownloads: true,
                external: false,
            };

            let file = await downloadManager.download(`${API_URL}download_all_payslip?month=${item.month}&year=${item.year}&unique_id=${item.group_id}`, { 'Authorization': 'Bearer ' + token, 'Accept': 'application/zip' }, config);
            console.warn(file);

            alert('Payroll saved successfully');

            await this.setState({
                isDownloading: false,
            });
        } catch (e) {
            await this.setState({ isDownloading: false });
            alert('Download failed, please try again');
            console.warn(e);
        }
    }

    onClickDownload = () => {
        Alert.alert(
            'Download Payroll',
            'Are you sure you want to download this payroll?',
            [
                {
                    text: 'Yes', onPress: this.downloadPayrolls,
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
        const { item, navigation } = this.props;

        return (
            <View style={[styles.section, { backgroundColor: item.supervisor_approval.toLowerCase() === 'approved' ? DARK_GREEN : '#a00' }]}>
                <View style={[styles.sectionDetails]}>
                    <Text style={styles.sectionTitle}>{`${getMonth(item.month)} ${item.year}`}</Text>
                    <EmployeeItem labelStyle={styles.white} valueStyle={styles.white} title="HR Approval" value={item.hr_approval} />
                    <EmployeeItem labelStyle={styles.white} valueStyle={styles.white} title="Supervisor Approval" value={item.supervisor_approval} />
                    <Text style={styles.footer}>{/* item.group_id */}</Text>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity onPress={() => navigation.navigate('PayrollDetails', { item })}>
                        <Icon name="ios-eye" size={25} color="#FFF" />
                    </TouchableOpacity>
                    {this.state.isDownloading ?
                        <ActivityIndicator color="#fff" size={25} /> : <TouchableOpacity disabled={this.state.isDownloading} onPress={this.onClickDownload}>
                            <Icon name="ios-download" size={25} color="#FFF" />
                        </TouchableOpacity>
                    }
                    {this.state.isSending ?
                        <ActivityIndicator color="#fff" size={25} /> : <TouchableOpacity disabled={this.state.isSending} onPress={this.onSendPayrolls}>
                            <Icon name="ios-send" size={25} color="#FFF" />
                        </TouchableOpacity>}
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
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
