import {
    StyleSheet,
    Platform
} from 'react-native'
import {
    SCREEN_HEIGHT,
    SCREEN_WIDTH
} from '../../utility/constants'

import { GREY, MAIN_COLOR } from '../../utility/colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.35,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headText: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: GREY
    },
    form: {
        padding: 30,
        height: SCREEN_HEIGHT * 0.55,
        marginHorizontal: 20,
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
        borderRadius: 10,
        justifyContent: 'space-around'
    },
    error: {
        color: '#f00',
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular'
    },
    remember: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rememberText: {
        color: GREY,
        fontSize: 12
    },
    btn: {
        width: '50%',
        alignSelf: 'flex-end'
    },
    btnText: {
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    forgotText: {
        color: MAIN_COLOR,
        alignSelf: 'flex-end'
    }
})