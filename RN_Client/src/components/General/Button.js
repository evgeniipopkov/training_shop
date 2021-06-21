import React from 'react';
import {
  Text, TouchableOpacity, StyleSheet,
} from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';

const Button = ({
  label, onPress, touchable = true,
}) => (
  <TouchableOpacity
    activeOpacity={touchable ? 0 : 1}
    style={[styles.cart, touchable ? styles.active : styles.noActive]}
    onPress={() => touchable && onPress()}
  >
    <Text style={styles.cartText}>{label}</Text>
  </TouchableOpacity>

);

const styles = StyleSheet.create({
  cart: {
    width: '100%',
    paddingVertical: 10,
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  active: {
    backgroundColor: colors.mayGreen,
  },
  noActive: {
    backgroundColor: colors.gullGray,
  },
  cartText: {
    fontFamily: constants.fontMainMedium,
    fontSize: 16,
    color: colors.background,
  },
});

export default Button;
