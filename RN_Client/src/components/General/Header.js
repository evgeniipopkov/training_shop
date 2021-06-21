import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';

const Header = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 25,
    paddingBottom: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: constants.fontMainRegular,
    fontSize: 18,
    color: colors.main,
  },
});

export default Header;
