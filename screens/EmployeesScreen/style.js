import { StyleSheet, Platform } from 'react-native'
import { GREY, DARK_BLUE } from '../../utility/colors';
import { SCREEN_WIDTH } from '../../utility/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    data: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    error: {
        color: GREY,
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center'
    },
    employee: {
        width: '100%',
        marginVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 150,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(77, 84, 124)',
                shadowOpacity: 0.09,
                shadowOffset: {
                    width: 0,
                    height: 2
                },
            },
            android: {
                elevation: 4
            }
        }),
        backgroundColor: '#fff'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 90
    },
    name: {
        color: DARK_BLUE,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 13,
        textAlign: 'center'
    },
    employeeDetails: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    email: {
        color: GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        textAlign: 'center'
    },
    staffId: {
        color: GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        textAlign: 'center'
    },
})
