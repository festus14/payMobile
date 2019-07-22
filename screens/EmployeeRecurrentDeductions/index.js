import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PaymentsItem from '../../components/PaymentsItem';
import { connect } from 'react-redux';
import { getRecurrentDeductions } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'


class EmployeeRecurrentDeductions extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Recurrent Deductions',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        this.props.getRecurrentDeductions();
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { recurrentDeductions, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Recurrent Deductions"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                    {recurrentDeductions.length > 0 && !isLoading ? recurrentDeductions.map((item, id) => (
                        <PaymentsItem item={item} key={id}/>
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No recurrent deductions found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    recurrentDeductions: state.payslips.recurrentDeductions,
    isLoading: state.ui.isPayslipsLoading,
});

const mapDispatchToProps = dispatch => ({
    getRecurrentDeductions: () => dispatch(getRecurrentDeductions()),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRecurrentDeductions);
