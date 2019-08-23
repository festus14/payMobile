import React, { PureComponent } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import ArrearsItem from '../../components/ArrearsItem';
import { connect } from 'react-redux';
import { getArrears } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';


class EmployeeArrears extends PureComponent {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Arrears',
        drawerIcon: ({tintColor}) => (
            <Icon name="user-plus" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        const employee = this.props.navigation.getParam('employee', {});
        this.props.getArrears(employee.id);
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { arrears, isLoading } = this.props;
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
                    {arrears.length > 0 && !isLoading ? arrears.map((item, id) => (
                        <ArrearsItem item={item} key={id}/>
                    )) : (isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No arrears found</Text>)}
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
    getArrears: (id) => dispatch(getArrears(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeArrears);
