import { StyleSheet, Platform } from 'react-native';
import { SCREEN_HEIGHT } from '../../utility/constants';

import { GREY, MAIN_COLOR, LIGHT_GREY, SECONDARY_COLOR } from '../../utility/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: GREY,
  },
  vText: {
    color: LIGHT_GREY,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 20,
    height: SCREEN_HEIGHT * 0.45,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(77, 84, 124)',
        shadowOpacity: 0.09,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 2,
      },
    }),
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  error: {
    color: '#f00',
    fontSize: 12,
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  remember: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rememberText: {
    color: GREY,
    fontSize: 12,
  },
  btn: {
    width: '50%',
    alignSelf: 'flex-end',
  },
  btnText: {
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  forgotText: {
    color: MAIN_COLOR,
    alignSelf: 'flex-end',
  },
  warnView: {
    marginTop: -40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warnText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  warnTxts: {
    fontSize: 12,
    // display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  warnHead: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  openButton: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: 200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
