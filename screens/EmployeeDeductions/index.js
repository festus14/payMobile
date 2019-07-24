import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getDeductions } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'


class EmployeeDeductions extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Deductions',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getDeductions(employee.id);
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { deductions, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Deductions"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                    {deductions.length > 0 && !isLoading ? deductions.map((item, id) => (
                        <PaymentsItem item={item} key={id}/>
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No deductions found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    deductions: state.payslips.deductions,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getDeductions: (id) => dispatch(getDeductions(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDeductions);
