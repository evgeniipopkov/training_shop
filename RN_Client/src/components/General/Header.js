import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';

const Header = ({ title }) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 25,
      paddingBottom: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
    },
    title: {
      fontFamily: constants.fontMainRegular,
      fontSize: 18,
      color: theme.main,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
