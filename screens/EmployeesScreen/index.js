import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { connect } from 'react-redux';
import { getEmployees } from '../../store/actions';
import defaultImage from '../../assets/images/myAvatar.png';
import { PHOTO_URL, SCREEN_WIDTH } from '../../utility/constants';
import MyImage from '../../components/MyImage';

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
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', flex: 1 }}>
                        {employees.length > 0 && !isLoading ? employees.map((employee, id) => (
                            <TouchableOpacity key={id} onPress={() => navigation.navigate('EmployeeDetailsNavigator', {
                                employee: { ...employees[id], users: employees.length > 0 ? employees[id].users : {} },
                            })} style={{ width: SCREEN_WIDTH * 0.4 }}>
                                <View  style={styles.employee}>
                                    <MyImage resizeMode="contain" style={styles.image} source={employee.users ? [{ uri: PHOTO_URL + employee.users.picture }, defaultImage] : [defaultImage]} />
                                    <View style={styles.employeeDetails}>
                                        <Text style={styles.name}>{employee.firstname ? `${employee.firstname} ${employee.lastname}` : 'Unknown Unknown'}</Text>
                                        <Text style={styles.email}>{employee.department ? employee.department.name : 'No department'}</Text>
                                        {employee.staff_no && <Text style={styles.staffId}>{employee.staff_no}</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )) : (isLoading ? <ActivityIndicator /> : <Text style={styles.error}>No employees found</Text>)}
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
