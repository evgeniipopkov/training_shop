import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';
import constants from '../../constants/constants';

const CartIcon = ({ iconName, isFull = false }) => {
  const { theme, cartProducts } = useContext(context);

  const count = cartProducts.length
    ? cartProducts.reduce((acc, current) => acc + current.count, 0)
    : 0;

  const styles = StyleSheet.create({
    circle: {
      position: 'absolute',
      bottom: -7,
      right: -7,
      borderRadius: 15,
      backgroundColor: theme.neonCarrot,
      height: 15,
      width: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    count: {
      fontFamily: constants.fontMainRegular,
      fontSize: 10,
      color: theme.background,
    },
  });

  return (
    <View>
      <Icon
        name={iconName}
        size={25}
        color={isFull ? theme.neonCarrot : theme.twilight}
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
