import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';
import utils from '../../helpers/utils';

const Balance = ({ balance, fontSize }) => (
  <Text style={[styles.balance, { fontSize }]}>{utils.getBalance(balance)}</Text>
);

const styles = StyleSheet.create({
  balance: {
    fontFamily: constants.fontMainRegular,
    color: colors.gullGray,
  },
});

export default Balance;
