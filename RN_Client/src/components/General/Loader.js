import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const Loader = ({ style }) => (
  <View style={[styles.container, style]}>
    <ActivityIndicator size="large" color={colors.main} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

export default Loader;
