import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import context from '../../context/context';

const Loader = ({ style }) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.background,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={theme.main} />
    </View>
  );
};

export default Loader;
