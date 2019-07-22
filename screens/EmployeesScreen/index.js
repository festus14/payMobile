import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { connect } from 'react-redux';
import { getEmployees } from '../../store/actions';
import defaultImage from '../../assets/images/myAvatar.png';
import { PHOTO_URL, SCREEN_WIDTH } from '../../utility/constants';
import MyImage from '../../components/MyImage';
import { getPercentage } from '../../utility/helpers';

class EmployeesScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        if (this.props.employees.length < 1) {
            this.props.getEmployees();
        }
    }

    render() {
        const { employees, isLoading, navigation } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Employees"
                />
                <View style={styles.data}>
                    <ScrollView>
                        {employees.length > 0 && !isLoading ? employees.map((employee, id) => (
                            <View key={id} style={styles.employee}>
                                <View style={styles.top}>
                                    <Text style={styles.topText}>{employee.department.name}</Text>
                                </View>
                                <View style={styles.middle}>
                                    <View>
                                        <Text style={styles.name}>{employee.firstname ? `${employee.firstname} ${employee.lastname}` : 'Unknown Unknown'}</Text>
                                        <Text style={styles.staffId}>{employee.staff_no ? employee.staff_no : ''}</Text>
                                        <Text style={styles.net}>{getPercentage(parseFloat(employee.gross), 100)}</Text>
                                    </View>
                                    <MyImage resizeMode="contain" style={styles.image} source={employee.users ? [{ uri: PHOTO_URL + employee.users.picture }, defaultImage] : [defaultImage]} />
                                </View>
                                <View style={styles.bottom}>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => navigation.navigate('EmployeeDetailsNavigator', { employee: { ...employees[id], users: employees.length > 0 ? employees[id].users : {} }})}>
                                        <Text style={styles.bottomText}>VIEW ALL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )) : (isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No employees found</Text>)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.ui.isEmployeesLoading,
    isDoneLoading: state.ui.isEmployeesDoneLoading,
    employees: state.employees.employees,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    getEmployees: () => dispatch(getEmployees()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesScreen);
