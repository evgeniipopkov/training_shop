import React, { useContext } from 'react';
import {
  Text, TouchableOpacity, StyleSheet,
} from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';

const Button = ({
  label, onPress, touchable = true,
}) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    cart: {
      width: '100%',
      paddingVertical: 10,
      marginVertical: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: touchable ? theme.mayGreen : theme.gullGray,
    },
    cartText: {
      fontFamily: constants.fontMainMedium,
      fontSize: 16,
      color: theme.background,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={touchable ? 0 : 1}
      style={styles.cart}
      onPress={() => touchable && onPress()}
    >
      <Text style={styles.cartText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
