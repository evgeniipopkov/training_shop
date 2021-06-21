import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';
import colors from '../../constants/colors';
import constants from '../../constants/constants';

const CartIcon = ({ iconName, isFull = false }) => {
  const { cartProducts } = useContext(context);
  const count = cartProducts.length
    ? cartProducts.reduce((acc, current) => acc + current.count, 0)
    : 0;

  return (
    <View>
      <Icon
        name={iconName}
        size={28}
        color={isFull ? colors.neonCarrot : colors.twilight}
      />
      {count
        ? (
          <View style={styles.circle}>
            <Text style={styles.count}>{count > 99 ? '\u221E' : count}</Text>
          </View>
        )
        : null}
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    bottom: -7,
    right: -7,
    borderRadius: 15,
    backgroundColor: colors.neonCarrot,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontFamily: constants.fontMainRegular,
    fontSize: 12,
    color: colors.background,
  },
});
