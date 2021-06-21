import React from 'react';
import { View, StyleSheet } from 'react-native';

import Price from '../General/Price';
import Balance from '../General/Balance';
import Name from '../General/Name';
import Trash from '../General/Trash';
import ImageItem from '../General/ImageItem';

const FavoritesListItem = ({
  name, price, src, balance, remove,
}) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <ImageItem src={src} widthCoef={0.18} heightCoef={0.23} />
      <View style={styles.description}>
        <Price price={price} fontSize={17} />
        <Name name={name} fontSize={15} />
        <Balance balance={balance} fontSize={13} />
      </View>
    </View>
    <Trash onPress={remove} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  wrapper: {
    flexDirection: 'row',
  },
  description: {
    paddingLeft: 25,
    justifyContent: 'space-between',
  },
});

export default FavoritesListItem;
