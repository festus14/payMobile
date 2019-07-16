import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import AbsenteeismItem from '../../components/AbsenteeismItem';
import { connect } from 'react-redux';
import { getAbsenteeism } from '../../store/actions';

class EmployeeAbsenteeism extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Absenteeism',
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
        const { absenteeism } = this.props;
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
                        <AbsenteeismItem absenteeism={absenteeism} />
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
