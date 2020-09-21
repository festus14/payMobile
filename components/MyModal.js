import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Modal } from 'react-native';
import { MAIN_COLOR } from '../utility/colors';

export default class MyModal extends Component {
  render() {
    const {
      visible,
      onRequestClose = () => {},
      modalStyle = {},
      contentStyle = {},
      children,
      btnTxt,
      btnTxtStyle = {},
      btnStyle = {},
      onPress = () => {},
    } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={[styles.centeredView, modalStyle]}>
          <View style={[styles.modalView, contentStyle]}>
            <View style={styles.children}>{children}</View>
            <View style={styles.horizontalLine} />
            <TouchableOpacity
              style={[styles.openButton, btnStyle]}
              onPress={onPress}
            >
              <Text style={[styles.textStyle, btnTxtStyle]}>{btnTxt}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginVertical: 25,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 35,
    paddingBottom: 10,
    paddingTop: 18,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 280,
  },
  openButton: {
    backgroundColor: '#fff',
    padding: 1,
    // elevation: 2,
    marginTop: 10,
    width: 280,
  },
  textStyle: {
    color: '#005',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horizontalLine: {
    borderWidth: 2,
    borderColor: MAIN_COLOR,
    width: 280,
    marginTop: 20,
  },
  children: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
