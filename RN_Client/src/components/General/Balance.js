import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';
import utils from '../../helpers/utils';

const Balance = ({ balance, fontSize }) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    balance: {
      fontFamily: constants.fontMainRegular,
      color: theme.gullGray,
      fontSize,
    },
  });

  return (
    <Text style={styles.balance}>{utils.getBalance(balance)}</Text>
  );
};

export default Balance;
