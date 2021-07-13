import React, { useContext } from 'react';
import {
  Text, View, Modal, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';
import strings from '../../constants/strings';

const Question = ({
  title, isOpen, setIsOpen, onPress,
}) => {
  const { theme } = useContext(context);

  const pressYes = () => {
    onPress();
    setIsOpen(false);
  };

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
      color: theme.main,
    },
  });

  return (
    <>
      {isOpen && <StatusBar barStyle={theme.statusBar} backgroundColor={theme.modal} />}
      <Modal animationType="none" transparent visible={isOpen}>
        <View style={styles.container}>
          <View style={styles.window}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={pressYes}>
                <Text style={[styles.text, { color: theme.mayGreen }]}>{strings.yes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNo} onPress={() => setIsOpen(false)}>
                <Text style={[styles.text, { color: theme.neonCarrot }]}>{strings.no}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Question;
