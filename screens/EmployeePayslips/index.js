import React, { PureComponent } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PayslipItem from '../../components/PayslipItem';
import { connect } from 'react-redux';
import { getPayslips } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'


class EmployeePayslips extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Payslips',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getPayslips(employee.id);
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { payslips, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payslips"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                    {payslips.length > 0 && !isLoading ? payslips.map((item, id) => (
                        <PayslipItem item={item} key={id}/>
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No payslips found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payslips: state.payslips.payslips,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayslips: (id) => dispatch(getPayslips(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePayslips);
