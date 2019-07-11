import React, { Component } from 'react'
import { Text, View, SafeAreaView, Modal } from 'react-native'
import { connect } from 'react-redux'
import defaultImage from '../../assets/images/myAvatar.png'
import { styles } from './style';
import Button from '../../components/Button';
import { DARK_GREEN } from '../../utility/colors';
import { getEmployee } from '../../store/actions';
import { PHOTO_URL } from '../../utility/constants';
import EmployeeDetails from '../EmployeeDetails';
import MyImage from '../../components/MyImage';
// import CachedImage from 'react-native-cached-image'

class DashboardScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }
    }


    componentDidMount() {
        if (!this.props.employee.firstname) {
            this.props.getEmployee()
        }
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    render() {
        const { user, employee } = this.props
        const { isModalOpen } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={isModalOpen}
                    onRequestClose={() => { }}
                >
                    <EmployeeDetails onGoBack={this.toggleModal} employee={{ ...employee, users: employee.users || user }} />
                </Modal>
                <View style={styles.rando}></View>
                <View style={styles.imageContainer}><MyImage resizeMode="contain" style={styles.image} source={user ? [{ uri: PHOTO_URL + user.picture }, defaultImage] : [defaultImage]} /></View>
                <Text style={styles.name}>{user.name || "Moore Dagogo-Hart"}</Text>
                <Text style={styles.email}>{user.email || "mail@domain.com"}</Text>
                <Text style={styles.company}>{employee.company ? employee.company.name : ""}</Text>
                <Text style={styles.staffId}>{employee.department ? employee.department.name : ""}</Text>
                <Text style={styles.staffId}>{employee.location ? employee.location.name : ""}</Text>
                <Text style={styles.staffId}>{employee.firstname ? employee.staff_no : ""}</Text>
                <Button
                    text="Details"
                    style={{ backgroundColor: DARK_GREEN, marginTop: 20 }}
                    onPress={this.toggleModal}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.ui.isUserLoading,
    isDoneLoading: state.ui.isUserDoneLoading,
    employee: state.user.employee,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    getEmployee: () => dispatch(getEmployee())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)