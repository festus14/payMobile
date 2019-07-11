import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Header from '../../components/Header'
import { styles } from './style';
import defaultImage from '../../assets/images/myAvatar.png'
import { PHOTO_URL } from '../../utility/constants';
import MyImage from '../../components/MyImage'
import EmployeeItem from '../../components/EmployeeItem';
import { moneyFormatter, getPercentage } from '../../utility/helpers';
import { DARK_GREEN, GREY } from '../../utility/colors';

export default class EmployeeDetails extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        const { employee, onGoBack } = this.props
        return (
            <View style={styles.container}>
                <Header
                    title={employee.users.name || "Unknown Unknown"}
                    leftIcon="md-arrow-back"
                    onLeftPress={onGoBack}
                />
                <View style={styles.data}>
                    <ScrollView>
                        <View style={styles.personal}>
                            <MyImage resizeMode="contain" style={styles.image} source={employee.users ? [{ uri: PHOTO_URL + employee.users.picture }, defaultImage] : [defaultImage]} />
                            <View style={styles.personalText}>
                                <Text style={styles.name}>{employee.users.name || "Unknown Unknown"}</Text>
                                <Text style={styles.email}>{employee.users.email || "mail@domain.com"}</Text>
                                {employee.staff_no && <Text style={styles.staffId}>{employee.staff_no}</Text>}
                                {employee.phone && <Text style={styles.staffId}>{employee.phone}</Text>}
                            </View>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Payroll Data</Text>
                            <View style={styles.sectionDetails}>
                                <View style={{ width: '100%', marginBottom: 15 }}>
                                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, textAlign: 'center', color: DARK_GREEN }}>Gross Salary ({employee.currency ? employee.currency.name : 'NGN'})</Text>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, color: GREY, textAlign: 'center' }}>{moneyFormatter(employee.gross)}</Text>
                                </View>
                                {employee.pay_elements.map(elem => (
                                    <View style={{ width: '100%', marginBottom: 5, marginLeft: 10 }} key={elem.id}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 17, color: DARK_GREEN }}>{elem.name}</Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 17, color: GREY }}>{getPercentage(parseFloat(employee.gross), parseFloat(elem.percentage))}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Personal Info</Text>
                            <View style={styles.sectionDetails}>
                                <EmployeeItem title="Gender" value={employee.gender} />
                                <EmployeeItem title="DOB" value={employee.dob} />
                                <EmployeeItem title="DOE" value={employee.date_of_employment} />
                                <EmployeeItem title="Country" value={employee.country.name} />
                                <EmployeeItem title="Residence State" value={employee.state.name} />
                                <EmployeeItem title="State of Origin" value={employee.origin.name} />
                                <EmployeeItem title="Position" value={employee.position} />
                                <EmployeeItem title="Department" value={employee.department.name} />
                                <EmployeeItem title="Staff Type" value={employee.stafftype && employee.stafftype.name} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Account Info</Text>
                            <View style={styles.sectionDetails}>
                                <EmployeeItem title="Employee Bank" value={employee.employee_bank.name} />
                                <EmployeeItem title="Account Number" value={employee.account_number} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pension & Tax Info</Text>
                            <View style={styles.sectionDetails}>
                                <EmployeeItem title="TIN" value={employee.tin} />
                                <EmployeeItem title="Payer ID" value={employee.taxpayer_id} />
                                <EmployeeItem title="Tax Aauthority" value={employee.tax_authority} />
                                <EmployeeItem title="PFA" value={employee.pfa} />
                                <EmployeeItem title="RSA PIN" value={employee.rsa_pin} />
                                <EmployeeItem title="Pension Bank" value={employee.p_bank.name} />
                                <EmployeeItem title="Pension Account Number" value={employee.p_acc_number} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Reliefs</Text>
                            <View style={styles.sectionDetails}>
                                <EmployeeItem title="CRA" value={employee.cra} />
                                <EmployeeItem title="Fixed CRA" value={employee.fixed_cra} />
                                <EmployeeItem title="Pension" value={employee.pension} />
                                <EmployeeItem title="NHF" value={employee.nhf} />
                                <EmployeeItem title="Dependable Relative" value={employee.dependable_relative} />
                                <EmployeeItem title="Children" value={employee.children} />
                                <EmployeeItem title="Disability" value={employee.disability} />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Deductions</Text>
                            <View style={styles.sectionDetails}>
                                <EmployeeItem title="Pension Deduction" value={employee.pension_deduction} />
                                <EmployeeItem title="NHF Deduction" value={employee.nhf_deduction} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}