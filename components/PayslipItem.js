import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Modal, Alert, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { ALMOST_BLACK, DARK_GREEN, LIGHT_GREY, GREY } from '../utility/colors';
import { getPercentage } from '../utility/helpers';
import { connect } from 'react-redux';
import WebView from 'react-native-webview';
import downloadManager from 'react-native-simple-download-manager';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getAuthToken, showPayslips, sendPayslips } from '../store/actions';
import { API_URL } from '../utility/constants';
import InputText from './InputText';
import Button from './Button';

class PayslipItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isEmailModalOpen: false,
            isPermitted: false,
            isDownloading: false,
            html: '',
            email: '',
        };
    }

    closeModal = () => {
        if (this.state.isModalOpen) {
            this.toggleModal();
            return true;
        }
        return false;
    }

    toggleModal = async () => {
        const { item: { details }, showSlip } = this.props;
        this.setState({ isModalOpen: !this.state.isModalOpen });
        const html = await showSlip({ ...details, unique_id: details.group_id });
        this.setState({ html });
    }

    sendPayslip = async () => {
        const { item: { details }, sendSlip } = this.props;
        const email = await sendSlip({ ...details, unique_id: details.group_id, email: this.state.email });
        this.setState({ email });
    }

    toggleEmail = () => {
        this.setState({ isEmailModalOpen: !this.state.isEmailModalOpen, email: '' });
    }

    createPdf = async () => {
        try {
            await this.requestExternalWritePermission();
            if (this.state.isPermitted) {
                let { item, getToken } = this.props;
                let fileName = `payslip-${item.info.employee.staff_no}(${item.date}).pdf`;

                const config = {
                    downloadTitle: 'iPaySuite',
                    downloadDescription: `Downloading payslip (${fileName})`,
                    saveAsName: fileName,
                    allowedInRoaming: true,
                    allowedInMetered: true,
                    showInDownloads: true,
                    external: false,
                };

                const token = await getToken();

                this.setState({ isDownloading: true });
                let response = await downloadManager.download(`${API_URL}download_payslip?id=${item.details.id}&month=${item.details.month}&year=${item.details.year}&unique_id=${item.details.group_id}&employee=${item.details.employee_id}`, { Authorization: 'Bearer ' + token, 'Accept': 'application/pdf' }, config);
                this.setState({ isDownloading: false });
                console.warn(response);
                alert('Payslip saved successfully');
            }
        } catch (error) {
            this.setState({ isDownloading: false });
            alert('Download failed.');
            console.warn('error', error);
        }
    }

    onClickCreate = () => {
        Alert.alert(
            'Download Payslip',
            'Are you sure you want to download payslip?',
            [
                {
                    text: 'Yes', onPress: this.createPdf,
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

    async requestExternalWritePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'iPaySuite External Storage Write Permission',
                    message:
                        'iPaySuite needs access to Storage data in your SD Card ',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //If WRITE_EXTERNAL_STORAGE Permission is granted
                //changing the state to show Create PDF option
                this.setState({ isPermitted: true });
            } else {
                alert('WRITE_EXTERNAL_STORAGE permission denied');
            }
        } catch (err) {
            alert('Write permission err', err);
            console.warn(err);
        }
    }

    render() {
        const { item, isLoading } = this.props;
        const { isDownloading, html, isEmailModalOpen, isModalOpen, email } = this.state;
        return (
            <View style={styles.item}>
                <Modal
                    visible={isModalOpen}
                    onRequestClose={() => { }}
                    animationType="fade"
                    transparent
                >
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={this.toggleModal}><Text style={styles.city}>Close</Text></TouchableOpacity>
                        <WebView
                            originWhitelist={['*']}
                            style={{ flex: 1 }}
                            source={{
                                html,
                            }}
                        />
                    </View>
                </Modal>
                <Modal
                    visible={isEmailModalOpen}
                    onRequestClose={() => { }}
                    animationType="fade"
                    transparent
                >
                    <View style={styles.emailModal}>
                        <View style={{ width: '90%', padding: 20, backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={this.toggleEmail}><Text style={styles.city}>Close</Text></TouchableOpacity>
                        <InputText
                            icon="envelope"
                            placeholder="Email"
                            autoCorrect={false}
                            iconSize={16}
                            iconColor={GREY}
                            value={email}
                            onSubmitEditing={() => { this.password.focus(); }}
                            onChangeText={input => this.setState({ email: input })}
                            autoCapitalize="none"
                            returnKeyType="go"
                            keyboardType="email-address"
                        />
                        <Button
                            isLoading={isLoading}
                            text="Send"
                            style={{ alignSelf: 'center', marginVertical: 10 }}
                            onPress={this.sendPayslip}
                        />
                        </View>
                    </View>
                </Modal>
                <View style={styles.top}>
                    {item.info && <Text style={[styles.topText, { color: DARK_GREEN }]}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.info.employee.lastname.toUpperCase()}</Text>, {item.info.employee.firstname}</Text>}
                    <Text style={styles.topText}>{item.date}</Text>
                </View>
                {item.info && <View style={styles.middle}>
                <Text style={styles.city}>{item.info.location}</Text>
                    <Text style={styles.dept}>{item.info.department}</Text>
                </View>}
                {item.pcm && <View style={styles.net}>
                    <Text style={styles.netText}>{getPercentage(item.pcm.net_pay, 100) || 0.00}</Text>

                </View>}
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.btn} onPress={this.toggleModal}><Icon name="eye" color={'#FFF'} size={24} /></TouchableOpacity>
                    <TouchableOpacity disabled={isDownloading} style={[styles.btn, { alignItems: 'flex-end' }]} onPress={this.onClickCreate}>{isDownloading ? <ActivityIndicator color="#fff" size={25} />  : <Icon name="file-download" color={'#FFF'} size={24} />}</TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this.toggleEmail}><Icon name="paper-plane" color={'#FFF'} size={24} /></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    emailModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        justifyContent: 'space-between',
        height: 170,
        backgroundColor: '#f9f9f9',
        borderRadius: 3,
    },
    top: {
        margin: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    topText: {
        color: ALMOST_BLACK,
        fontSize: 13,
    },
    middle: {
        marginHorizontal: 10,
    },
    city: {
        color: ALMOST_BLACK,
        fontSize: 17,
    },
    dept: {
        color: LIGHT_GREY,
        fontWeight: 'bold',
        fontSize: 12,
    },
    net: {
        marginHorizontal: 10,
    },
    netText: {
        fontSize: 20,
        color: DARK_GREEN,
    },
    bottom: {
        backgroundColor: DARK_GREEN,
        width: '100%',
        flexDirection: 'row',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        justifyContent: 'space-between',
        height: '25%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

const mapDispatchToProps = dispatch => ({
    getToken: () => dispatch(getAuthToken()),
    showSlip: (data) => dispatch(showPayslips(data)),
    sendSlip: (data) => dispatch(sendPayslips(data)),
});

const mapStateToProps = state => ({
    isLoading: state.ui.isPayslipsLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(PayslipItem);
