import { Platform, StyleSheet } from 'react-native';
import { ALMOST_BLACK, GREY, LIGHTER_GREY, MAIN_COLOR } from '../../utility/colors';
import { SCREEN_HEIGHT } from '../../utility/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: LIGHTER_GREY,
    borderStartWidth: 2,
    paddingHorizontal: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: LIGHTER_GREY,
    borderRadius: 5,
    marginBottom: SCREEN_HEIGHT * 0.03,
    marginVertical: 2,
    marginHorizontal: 18,
  },
  form: {
    padding: 20,
    height: SCREEN_HEIGHT * 0.35,
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
    marginVertical: SCREEN_HEIGHT * 0.2,
  },
  labelTxt: {
    color: ALMOST_BLACK,
    fontSize: 13,
    marginLeft: 18,
  },
  btn: {
    width: '30%',
    alignSelf: 'flex-end',
    marginRight: 18,
  },
  btnText: {
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  warnView: {
    marginTop: -25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
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
  warnHead: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  warnTxts: {
    fontSize: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
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
  error: {
    color: '#f00',
    fontSize: 12,
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
