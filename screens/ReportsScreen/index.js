import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { connect } from 'react-redux';
import ReportsItem from '../../components/ReportsItem';
import { getPayrolls } from '../../store/actions';

const data = [
    'Master',
    'Location',
    'Department',
    'Pension',
    'NSTIF',
    'ITF',
    'PAYE',
    'NHF',
    'State',
];

class ReportsScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        if (this.props.payrolls.length < 1) {
            this.props.getPayrolls();
        }
    }

    render() {
        const { isLoading, navigation, payrolls } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Reports"
                />
                <View style={styles.container}>
                    <ScrollView>
                    {payrolls.length > 0 && !isLoading ? data.map((item, id) => (
                        <ReportsItem navigation={navigation} item={item} key={id} payroll={payrolls[0]} />
                    )) : isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No payrolls found</Text>}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    payrolls: state.payrolls.payrolls,
    isLoading: state.ui.isPayrollsLoading,
});

const mapDispatchToProps = dispatch => ({
    getPayrolls: () => dispatch(getPayrolls()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ReportsScreen);
