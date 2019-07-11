import { StyleSheet, Platform } from 'react-native'
import { GREY, DARK_BLUE, SECONDARY_COLOR, LIGHT_BLUE, DARK_GREEN } from '../../utility/colors';
import { SCREEN_HEIGHT } from '../../utility/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    data: {
        flex: 1,
        margin: 15
    },
    personal: {
        height: SCREEN_HEIGHT * 0.12,
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 90,
        marginRight: 25
    },
    name: {
        color: DARK_BLUE,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
    },
    email: {
        color: GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    staffId: {
        color: GREY,
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    line: {
        backgroundColor: SECONDARY_COLOR,
        height: 0.5,
        width: '100%',
        marginVertical: 10
    },
    section: {
        width: '100%',
        padding: 15
    },
    sectionTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        color: DARK_GREEN
    },
    sectionDetails: {
        backgroundColor: '#fff',
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
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    }
})
