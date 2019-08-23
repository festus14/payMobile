import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, Modal, PermissionsAndroid } from 'react-native';
import { ALMOST_BLACK, DARK_GREEN, LIGHT_GREY } from '../utility/colors';
import { getPercentage } from '../utility/helpers';
import WebView from 'react-native-webview';
import { COMPANY_PHOTO_URL } from '../utility/constants';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PayslipItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isPermitted: false,
        };
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    createPdf = async () => {
        await this.requestExternalWritePermission();
        let options = {
            html: this.html(),
            fileName: `payslip-${this.props.item.info.employee.staff_no}(${this.props.item.date})`,
            directory: 'Documents',
        };

        let file = await RNHTMLtoPDF.convert(options);
        alert('Saved at: ' + file.filePath);
    }

    async requestExternalWritePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'iPyaSuite External Storage Write Permission',
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
        const { item, payrolls = false } = this.props;
        return (
            <View style={styles.item}>
                <Modal
                    visible={this.state.isModalOpen}
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
                                html: this.html(),
                            }}
                        />
                    </View>
                </Modal>
                <View style={styles.top}>
                    {item.info && <Text style={[styles.topText, { color: DARK_GREEN, }]}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.info.employee.lastname.toUpperCase()}</Text>, {item.info.employee.firstname}</Text>}
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
                    <TouchableOpacity style={styles.btn} onPress={this.toggleModal}><Icon name="ios-eye" color={'#FFF'} size={24} /></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, { alignItems: 'flex-end' }]} onPress={this.createPdf}><Icon name="ios-download" color={'#FFF'} size={24} /></TouchableOpacity>
                </View>
            </View>
        );
    }

    html = () => {
        const { item } = this.props;

        let v_total_pcm = 0;
        let v_total_ptd = 0;

        return (`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>PAYSLIP </title>
            <style>
                html {
                    margin: 5px auto;
                    clear: both;
                }
        
                @page {
                    margin: 0px;
                }
        
                body {
                    margin: 0px;
                }
        
                #data {10px
                    background-color: #fff;
                    font-size: ;
                    display: inline-block;
                    padding-left: 40px;
                    margin-left: 120px;
                    padding-right: 40px;
                    padding-bottom: 40px;
                    width: 500px;
                    border: 1px solid black;
                    border-top-left-radius: 100px;
                    border-top-right-radius: 10px;
                    border-bottom-left-radius: 10px;
                    /*border-bottom-right-radius: 100px;*/
                    border-radus: 10px;
                }
        
                table tr td {
                    padding-bottom: 2px !important;
                    font-size: 10px;
                    margin-bottom: 1px !important;
                }
            </style>
        </head>
        
        <body>
            <div id="data">
                <br>
                <table border=0 width='500px'>
                    <tr>
                        <td colspan="8" style="padding:1px;text-align:center;font-weight:bold;font-size:16px;">
                            <h3>${item.company.company_name}</h3>
                        </td>
                    </tr>
                    <tr>
                        ${item.company.logo_position === 'top_left' ? `<td>
                            <img src=${COMPANY_PHOTO_URL + item.company.logo} style="max-height: 80px; max-width: 100px" />
                        </td>` : ''}
                        <td colspan="${item.company.logo_position === 'top_left' || item.company.logo_position === 'top_right' ? '6' : '8'}">
                            <span style='font-weight:bold;font-size:12px;padding-right: 260px'>PAYSLIP</span>
                            <span style='font-size:11px;font-weight:bold;padding-right: 260px'> ${item.date}</span>
                            <br />
                        </td>
                        ${item.company.logo_position === 'top_right' ? `<td>
                            <img src=${COMPANY_PHOTO_URL + item.company.logo} style="max-height: 80px; max-width: 100px; float: right" />
                        </td>` : ''}
                    </tr>
                    <tr>
                        <td colspan='8'>
                            <table style="font-size:11px;">
                                <tr>
                                    <td><b> Employee:</b></td>
                                    <td colspan="6">
                                        <b style="text-transform: uppercase; font-size: 13px">${item.info.employee.firstname} ${item.info.employee.middlename} ${item.info.employee.lastname}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Position:</td>
                                    <td colspan="3"> ${item.info.employee.position}</td>
                                </tr>
                                <tr>
                                    <td>Department:</td>
                                    <td colspan="3">${item.info.department}</td>
                                </tr>
                                <tr>
                                    <td>Location:</td>
                                    <td>${item.info.location}</td>
                                    <td>Staff Code:</td>
                                    <td> ${item.info.employee.staff_no}</td>
                                </tr>
                                <div style="clear: both"></div>
                                <div class="row" style="padding-bottom: 20px">
                                    <table style="font-size:9pt; float: left" width='500px' style='margin-left: 25px;' border=0>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td align='right' style="font-size: 12px;">
                                                <h5>Current ${item.currency ? item.currency.name : 'NGN'}</h5>
                                            </td>
                                            <td align='right' style="font-size: 12px;">
                                                <h5>YTD ${item.currency ? item.currency.name : 'NGN'}</h5>
                                            </td>
                                        </tr>
                                        ${Object.keys(item.payments).map(key => {
                                            if (item.payments[key] > 0) {
                                                return '<tr><td>' + key + '</td>' + (item.pcm.payment[key] ? '<td align="right"> ' + getPercentage(item.pcm.payment[key], 100) + ' </td>' : '<td align="right"> 0.00 </td>') + '<td align="right">' + getPercentage(item.payments[key], 100) + '</td> </tr>';
                                            }
                                        }).join('')}
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td align='right'>____________</td>
                                            <td align='right'>____________</td>
                                        </tr>
                                        <tr>
                                            <td><b>Total Gross Payable (a)</b></td>
                                            <td align='right'><b> ${ getPercentage(item.pcm.total_gross_payable, 100)}</b></td>
                                            <td align='right'><b> ${ getPercentage(item.ptd.total_gross_payable, 100)}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Less: Total Tax Reliefs</td>
                                            <td align='right'><b> ${ getPercentage(item.pcm.total_tax_relief, 100)}</b></td>
                                            <td align='right'><b> ${ getPercentage(item.ptd.total_tax_relief, 100)}</b></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td align='right'>____________</td>
                                            <td align='right'>____________</td>
                                        </tr>
                                        <tr>
                                            <td>Taxable Pay</td>
                                            <td align='right'><b> ${ getPercentage(item.pcm.taxable_pay, 100)}</b></td>
                                            <td align='right'><b> ${ getPercentage(item.ptd.taxable_pay, 100)}</b></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td align='right'>_____________</td>
                                            <td align='right'>_____________</td>
                                        </tr>
                    
                                        <tr>
                                            <td><b>Deductions:</b></td>
                                            <td>&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        ${Object.keys(item.deductions).map(key => {
                                            if (item.deductions[key] > 0) {
                                                return (key === 'Payee' ? '<tr><td> PAYE</td>' : '<tr><td>' + key + '</td>') + (item.pcm.deduction[key] ? "<td align='right'> " + getPercentage(item.pcm.deduction[key], 100) + ' </td>' : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.deductions[key], 100) + '</td> </tr>';
                                            }
                                        }).join('')}
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td align='right'>____________</td>
                                            <td align='right'>____________</td>
                                        </tr>
                                        <tr>
                                            <td><b>Total Deductions (b)</b></td>
                                            <td align='right'><b> ${ getPercentage(item.pcm.total_deduction, 100)}</b></td>
                                            <td align='right'><b> ${ getPercentage(item.ptd.total_deduction, 100)}</b></td>
                                        </tr>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td align='right'>____________</td>
                                            <td align='right'>____________</td>
                                        </tr>
                                        ${(Object.keys(item.other_payments).length !== 0 && item.other_payments.constructor === Object) ?
                (`
                                                <tr>
                                                    <td><strong>Other Payments:</strong></td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                                ${Object.keys(item.other_payments).map(key => (item.other_payments[key] > 0 ? ('<tr><td>' + key + '</td>' + (item.pcm.other_payments[key] ? ("<td align='right'> " + getPercentage(item.pcm.other_payments[key], 100) + ' </td>') : "<td align='right'> 0.00 </td>") + "<td align='right'>" + getPercentage(item.other_payments[key], 100) + '</td> </tr>') : '')).join('')}
                                                <tr>
                                                    <td><b>Total Other Payments(c)</b></td>
                                                    <td align='right'><b>${getPercentage(item.pcm.total_other_payments, 100)}</b></td>
                                                    <td align='right'><b>${getPercentage(item.ptd.total_other_payments, 100)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align='right'>____________</td>
                                                    <td align='right'>____________</td>
                                                </tr>
                                                <tr>
                                                    <td><strong> Net Salary ((a - b) + c)</strong></td>
                                                    <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                                    <td align='right'><b>${getPercentage(item.pcmnet_pay, 100)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align='right'>____________</td>
                                                    <td align='right'>____________</td>
                                                </tr>
                                            `
                ) : (`
                                                <tr>
                                                    <td><strong> Net Salary (a - b)</strong></td>
                                                    <td align='right'><b> ${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                                    <td align='right'><b> ${getPercentage(item.ptd.net_pay, 100)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align='right'>____________</td>
                                                    <td align='right'>____________</td>
                                                </tr>
                                                <tr>
                                                    <td><strong> Effective Tax Rate</strong></td>
                                                <td align='right'><b>${getPercentage(item.pcm.deduction.Payee / item.pcm.total_gross_payable * 100, 100)}</b></td>
                                                <td align='right'><b>${getPercentage(item.deductions.Payee / item.ptd.total_gross_payable * 100, 100)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align='right'>____________</td>
                                                    <td align='right'>____________</td>
                                                </tr>
                                            `)}
                                        ${item.disbursement_variance.length <= 0 ? `
                                            <tr>
                                                <td><b>Disbursement:</b></td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td><b>NGN</b></td>
                                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td align='right'>____________</td>
                                                <td align='right'>____________</td>
                                            </tr>
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td align='right'>____________</td>
                                                <td align='right'>____________</td>
                                            </tr>` : `
                                            ${Object.keys(item.disbursement_variance).map(key =>
                `<tr>
                                                    ${() => {
                    v_total_pcm += item.pcm.disbursement_variance[key].total;
                    v_total_ptd += item.disbursement_variance[key].total;
                }}
                                                    
                                                    <td><b>${key}</b></td>
                                                    ${item.pcm.disbursement_variance[key] ? `<td align=\'right\'><b>${getPercentage(item.pcm.disbursement_variance[key].total, 100)}</b></td>` :
                    '<td align=\'right\'><b>0.00</b></td>'}
                                                    <td align='right'><b>${getPercentage(item.disbursement_variance[key].total, 100)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td align='right'>____________</td>
                                                    <td align='right'>____________</td>
                                                </tr>
                                                <tr>
                                                    <th style="font-size: 9px">Details</th>
                                                    <th align='right'>Rate(NGN)</th>
                                                    <th style="font-size: 9px">NGN(equ)</th>
                                                </tr>
                                                <tr>
                                                    ${Object.keys(item.disbursement_variance[key].details).map(details =>
                        Object.keys(details).map(detail =>
                            `<td>&nbsp;</td>
                                                            <td align='right'><b>${getPercentage(detail.actual, 100)}</b></td>
                                                            <td align='right'><b>${getPercentage(detail.rate, 100)}</b></td>`
                        ).join('')
                    ).join('')}
                                                </tr>`).join('')}
                                            <tr>
                                                <td><b>NGN</b></td>
                                                <td align='right'><b>${getPercentage(item.pcm.net_pay - v_total_pcm, 100)}</b></td>
                                                <td align='right'><b>${getPercentage(item.ptd.net_pay - v_total_ptd, 100)}</b></td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td align='right'>____________</td>
                                                <td align='right'>____________</td>
                                            </tr>
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td align='right'><b>${getPercentage(item.pcm.net_pay, 100)}</b></td>
                                                <td align='right'><b>${getPercentage(item.ptd.net_pay, 100)}</b></td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td align='right'>____________</td>
                                                <td align='right'>____________</td>
                                            </tr>
                                            `
            }
                                    </table>
                                    <br/><br/><br/>
                                    <div style="clear: both"></div>
                                    ${item.company.logo_position === 'bottom_left' || item.company.logo_position === 'bottom_right' ? `<div style="float: right; width: 500px">
                                        <img src=${COMPANY_PHOTO_URL + item.company.logo}
                                            style="max-height: 80px; float: ${item.company.logo_position === 'bottom_right' ? 'right' : 'left'}; max-width: 100px">
                                    </div>` : ''}
                                </div>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <a href="#" style='font-size:8px;font-weight:bold; color: red; position: fixed; bottom: 10px; left: 40px;'>Generated  at ${new Date(Date.now())}</a>
        </body>
        </html>
        `);
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
