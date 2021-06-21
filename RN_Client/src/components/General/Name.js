import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';

const Name = ({ name, fontSize }) => (
  <Text style={[styles.name, { fontSize }]}>{name}</Text>
);

const styles = StyleSheet.create({
  name: {
    fontFamily: constants.fontMainRegular,
    color: colors.gullGray,
  },
});

export default Name;
