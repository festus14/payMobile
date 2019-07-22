import { StyleSheet, Platform } from 'react-native'
import { GREY, ALMOST_BLACK, LIGHT_GREY } from '../../utility/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    data: {
        flex: 1,
    },
    error: {
        color: GREY,
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginTop: 10,
    },
    employee: {
        margin: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 170,
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
        backgroundColor: '#f6f6f6'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 1000
    },
    top: {
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    topText: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    middle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    name: {
        color: ALMOST_BLACK,
        fontSize: 15,
        fontWeight: '200'
    },
    staffId: {
        fontSize: 12,
        color: LIGHT_GREY,
        fontWeight: 'bold'
    },
    net: {
        fontSize: 20,
        marginTop: 5
    },
    bottom: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        height: '25%',
        justifyContent: 'center'
    },
    bottomText: {
        color: GREY,
        fontSize: 15,
    }
})
