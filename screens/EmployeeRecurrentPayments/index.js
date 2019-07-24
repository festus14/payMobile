import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getRecurrentPayments } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'


class EmployeeRecurrentPayments extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Recurrent Payments',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getRecurrentPayments(employee.id);
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { recurrentPayments, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Recurrent Payments"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                    {recurrentPayments.length > 0 && !isLoading ? recurrentPayments.map((item, id) => (
                        <PaymentsItem item={item} key={id}/>
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No recurrent payments found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    recurrentPayments: state.payslips.recurrentPayments,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getRecurrentPayments: (id) => dispatch(getRecurrentPayments(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRecurrentPayments);
