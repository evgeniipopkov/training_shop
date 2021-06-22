import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container = ({ children }) => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      height: '100%',
    },
  });

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default Container;
