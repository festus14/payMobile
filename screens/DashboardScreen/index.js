import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image } from 'react-native'
import { connect } from 'react-redux'
import defaultImage from '../../assets/images/myAvatar.png'
import { styles } from './style';
import Button from '../../components/Button';
import { DARK_GREEN } from '../../utility/colors';
import { SCREEN_HEIGHT } from '../../utility/constants';
// import CachedImage from 'react-native-cached-image'

class DashboardScreen extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        const {user} = this.props
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.rando}></View>
                <View style={styles.imageContainer}><Image resizeMode="contain" style={styles.image} source={user.picture ? { url: user.picture, uri: user.picture } : defaultImage} /></View>
                <Text style={styles.name}>{user.name || "Moore Dagogo-Hart"}</Text>
                <Text style={styles.email}>{user.email || "mail@domain.com"}</Text>
                <Text style={styles.company}>{user.company ? user.company.name : "Stransact Partners"}</Text>
                <Text style={styles.staffId}>{user.employee ? user.employee.department.name : "Support Services"}</Text>
                <Text style={styles.staffId}>{user.employee ? user.employee.location.name : "Lagos"}</Text>
                <Text style={styles.staffId}>{user.employee ? user.employee.staff_id : "AAA-000"}</Text>
                <Button
                    text="Details"
                    style={{ backgroundColor: DARK_GREEN, marginTop: 20 }}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.ui.isLoading,
    isDoneLoading: state.ui.isDoneLoading,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)