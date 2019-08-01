import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getPayrolls, sendPayrolls, downloadPayrolls } from '../../store/actions';
import PayrollsItem from '../../components/PayrollsItem';
import Header from '../../components/Header';
import { styles } from './style.js';

class PayrollScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        this.props.getPayrolls();
    }

    render() {
        const { isLoading, payrolls, navigation, token } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payrolls"
                />
                <View style={styles.container}>
                    <ScrollView>
                    {payrolls.length > 0 && !isLoading ? payrolls.map((item, id) => (
                        <PayrollsItem token={token} downloadPayrolls={this.props.downloadPayrolls} sendPayrolls={this.props.sendPayrolls} navigation={navigation} item={item} key={id}/>
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No payrolls found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payrolls: state.payrolls.payrolls,
    token: state.auth.token,
    isLoading: state.ui.isPayrollsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayrolls: () => dispatch(getPayrolls()),
    sendPayrolls: (month, year, group_id, company_id) => dispatch(sendPayrolls(month, year, group_id, company_id)),
    downloadPayrolls: (month, year, group_id, company_id) => dispatch(downloadPayrolls(month, year, group_id, company_id))
});


export default connect(mapStateToProps, mapDispatchToProps)(PayrollScreen)
;