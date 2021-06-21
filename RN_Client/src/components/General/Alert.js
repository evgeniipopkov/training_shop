import React from 'react';
import {
  View, Modal, StyleSheet, Text, TouchableOpacity, StatusBar,
} from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';

const Alert = ({
  title, success, isOpen, setIsOpen, showStatusBar = false,
}) => (
  <>
    {isOpen
      && (!constants.isDarkMode || showStatusBar)
      && <StatusBar barStyle={colors.statusBar} backgroundColor={colors.modal} />}
    <Modal animationType="none" transparent visible={isOpen}>
      <View style={styles.container}>
        <View style={[styles.window, constants.isDarkMode ? styles.darkModal : null]}>
          <Text style={styles.text}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsOpen(false)}>
            <Text style={[
              styles.textButton,
              { color: success ? colors.mayGreen : colors.neonCarrot },
            ]}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
);

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
  button: {
    marginTop: 30,
  },
  textButton: {
    fontFamily: constants.fontMainMedium,
    fontSize: 16,
  },
  text: {
    fontFamily: constants.fontMainRegular,
    fontSize: 15,
    color: colors.main,
  },
  darkModal: {
    borderWidth: 1,
    borderColor: colors.main,
  },
});

export default Alert;
