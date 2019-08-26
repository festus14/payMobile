import React, { Component } from 'react';
import { View, ActivityIndicator, Text, RefreshControl, FlatList } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PayslipItem from '../../components/PayslipItem';
import { connect } from 'react-redux';
import { getPayrollDetails } from '../../store/actions';


class PayrollDetails extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        const item = this.props.navigation.getParam('item', {});
        this.props.getPayrollDetails(item.month, item.year, item.group_id);
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { payslips, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payroll Details"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                />
                <View style={styles.data}>
                    {payslips.length > 0 && !isLoading ? (<FlatList
                        removeClippedSubviews
                        data={payslips}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => (
                            <PayslipItem item={item} payrolls={true}/>
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={this.props.getPayrollDetails}
                            />
                        }
                    />) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No payslips found</Text>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payslips: state.payrolls.payrollDetails,
    isLoading: state.ui.isPayrollsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayrollDetails: (month, year, group_id) => dispatch(getPayrollDetails(month, year, group_id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PayrollDetails);
