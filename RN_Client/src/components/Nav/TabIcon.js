import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CartIcon from './CartIcon';

import colors from '../../constants/colors';
import constants from '../../constants/constants';

const TabIcon = ({
  iconName, label, isFull = false, isCart = false,
}) => {
  const renderIcon = () => (isCart
    ? <CartIcon iconName={iconName} isFull={isFull} />
    : (
      <Icon
        name={iconName}
        size={28}
        color={isFull ? colors.neonCarrot : colors.twilight}
      />
    ));

  return (isFull
    ? (
      <View style={styles.container}>
        {renderIcon()}
        <Text style={styles.label}>{label}</Text>
      </View>
    )
    : renderIcon());
};

export default TabIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: colors.innerBackgroud,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  label: {
    paddingLeft: 12,
    color: colors.neonCarrot,
    fontFamily: constants.fontMainRegular,
    fontSize: 15,
  },
});
