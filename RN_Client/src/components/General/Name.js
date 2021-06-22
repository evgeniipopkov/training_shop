import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';

import context from '../../context/context';
import constants from '../../constants/constants';

const Name = ({ name, fontSize }) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    name: {
      fontFamily: constants.fontMainRegular,
      color: theme.gullGray,
      fontSize,
    },
  });

  return (
    <Text style={styles.name}>{name}</Text>
  );
};

export default Name;
