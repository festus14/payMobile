import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import PayslipItem from '../../components/PayslipItem';
import { connect } from 'react-redux';
import { getPayslips } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'


class PayslipsScreen extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Payslips',
        drawerIcon: ({tintColor}) => (
            <Icon name="print" color={tintColor} size={20} />
        ),
    }

    componentDidMount() {
        const item = this.props.navigation.getParam('item', {});
        this.props.getPayslips('', item.month, item.year, item.group_id);
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { payslips, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Payslips"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
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
    getPayslips: (id, month, year, group_id) => dispatch(getPayslips(id, month, year, group_id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PayslipsScreen);
