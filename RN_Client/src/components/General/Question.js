import React from 'react';
import {
  Text, View, Modal, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';

const Question = ({
  title, isOpen, setIsOpen, onPress,
}) => {
  const pressYes = () => {
    onPress();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen
        && !constants.isDarkMode
        && <StatusBar barStyle={colors.statusBar} backgroundColor={colors.modal} />}
      <Modal animationType="none" transparent visible={isOpen}>
        <View style={styles.container}>
          <View style={[styles.window, constants.isDarkMode ? styles.darkModal : null]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={pressYes}>
                <Text style={[styles.text, { color: colors.mayGreen }]}>Да</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNo} onPress={() => setIsOpen(false)}>
                <Text style={[styles.text, { color: colors.neonCarrot }]}>Нет</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.modal,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  window: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 70,
    padding: 30,
    borderRadius: 20,
    elevation: 5,
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
  },
  buttonNo: {
    marginLeft: 30,
  },
  text: {
    fontFamily: constants.fontMainMedium,
    fontSize: 16,
  },
  title: {
    fontFamily: constants.fontMainRegular,
    fontSize: 15,
    color: colors.main,
  },
  darkModal: {
    borderWidth: 1,
    borderColor: colors.main,
  },
});

export default Question;
