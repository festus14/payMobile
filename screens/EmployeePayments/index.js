import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getPayments } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'


class EmployeePayments extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Payments',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getPayments(employee.id);
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { payments, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payments"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                    {payments.length > 0 && !isLoading ? payments.map((item, id) => (
                        <PaymentsItem item={item} key={id}/>
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No payments found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payments: state.payslips.payments,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayments: (id) => dispatch(getPayments(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePayments);
