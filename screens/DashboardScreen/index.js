import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class DashboardScreen extends Component {
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
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