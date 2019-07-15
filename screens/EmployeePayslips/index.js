import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PayslipItem from '../../components/PayslipItem';
import { connect } from 'react-redux';
import { getPayslips } from '../../store/actions';

class EmployeePayslips extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Payslips',
    }

    componentDidMount() {
        this.props.getPayslips();
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { payslips } = this.props;
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
                        <PayslipItem payslips={payslips} />
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
    getPayslips: () => dispatch(getPayslips()),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeePayslips);
