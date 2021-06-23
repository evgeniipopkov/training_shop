import React, { useContext } from 'react';
import {
  View, Modal, StyleSheet, Text, TouchableOpacity, StatusBar,
} from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';

const Alert = ({
  title, isOpen, setIsOpen, showStatusBar = false,
}) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.modal,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    window: {
      backgroundColor: theme.background,
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
      color: theme.neonCarrot,
    },
    text: {
      fontFamily: constants.fontMainRegular,
      fontSize: 15,
      color: theme.main,
      textAlign: 'center',
    },
  });

  return (
    <>
      {isOpen
        && (showStatusBar)
        && <StatusBar barStyle={theme.statusBar} backgroundColor={theme.modal} />}
      <Modal animationType="none" transparent visible={isOpen}>
        <View style={styles.container}>
          <View style={styles.window}>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setIsOpen(false)}>
              <Text style={styles.textButton}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Alert;
