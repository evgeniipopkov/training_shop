import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';
import utils from '../../helpers/utils';

const Price = ({ price, fontSize }) => (
  <Text style={[styles.price, { fontSize }]}>{utils.getPrice(price)}</Text>
);

const styles = StyleSheet.create({
  price: {
    fontFamily: constants.fontMainBold,
    color: colors.main,
  },
});

export default Price;
