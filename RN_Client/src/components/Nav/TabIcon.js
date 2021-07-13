import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CartIcon from './CartIcon';

import context from '../../context/context';
import constants from '../../constants/constants';

const TabIcon = ({
  iconName, label, isFull = false, isCart = false,
}) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      flexDirection: 'row',
      backgroundColor: theme.innerBackgroud,
      paddingVertical: 7,
      paddingHorizontal: 12,
      alignItems: 'center',
    },
    label: {
      paddingLeft: 12,
      color: theme.neonCarrot,
      fontFamily: constants.fontMainRegular,
      fontSize: 15,
    },
  });

  const renderIcon = () => (isCart
    ? <CartIcon iconName={iconName} isFull={isFull} />
    : (
      <Icon
        name={iconName}
        size={25}
        color={isFull ? theme.neonCarrot : theme.twilight}
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
