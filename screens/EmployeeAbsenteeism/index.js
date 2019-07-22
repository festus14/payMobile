import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import AbsenteeismItem from '../../components/AbsenteeismItem';
import { connect } from 'react-redux';
import { getAbsenteeism } from '../../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome'

class EmployeeAbsenteeism extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Absenteeism',
        drawerIcon: ({tintColor}) => (
            <Icon name="ban" color={tintColor} size={20} />
        )
    }

    componentDidMount() {
        this.props.getAbsenteeism();
    }

    goBack = () => {
        this.props.navigation.navigate('EmployeesScreen');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        const { absenteeism, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title="Absenteeism"
                    leftIcon="md-arrow-back"
                    onLeftPress={this.goBack}
                    rightIcon="ios-menu"
                    onRightPress={this.openDrawer}
                />
                <View style={styles.data}>
                    <ScrollView>
                        {absenteeism.length > 0 && !isLoading ? absenteeism.map((item, id) => (
                            <AbsenteeismItem item={item} key={id} />
                        )) : (isLoading ? <ActivityIndicator style={{ marginTop: 10 }} /> : <Text style={styles.error}>No absenteeism found</Text>)}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    absenteeism: state.absenteeism.absenteeism,
    isLoading: state.ui.isAbsenteeismLoading,
});

const mapDispatchToProps = dispatch => ({
    getAbsenteeism: () => dispatch(getAbsenteeism()),
});


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAbsenteeism);
