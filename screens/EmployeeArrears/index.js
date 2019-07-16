import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import ArrearsItem from '../../components/ArrearsItem';
import { connect } from 'react-redux';
import { getArrears } from '../../store/actions';

class EmployeeArrears extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Arrears',
    }

    componentDidMount() {
        this.props.getArrears();
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { arrears } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Arrears"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                        <ArrearsItem arrears={arrears} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    arrears: state.arrears.arrears,
    isLoading: state.ui.isArrearsLoading,
});

const mapDispatchToProps = dispatch => ({
    getArrears: () => dispatch(getArrears()),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeArrears);
