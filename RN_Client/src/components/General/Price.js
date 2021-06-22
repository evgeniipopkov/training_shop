import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';
import utils from '../../helpers/utils';

const Price = ({ price, fontSize }) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    price: {
      fontFamily: constants.fontMainBold,
      color: theme.main,
      fontSize,
    },
  });

  return (
    <Text style={styles.price}>{utils.getPrice(price)}</Text>
  );
};

export default Price;
