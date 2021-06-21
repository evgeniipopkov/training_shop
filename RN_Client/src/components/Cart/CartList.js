import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import CartListItem from './CartListItem';
import context from '../../context/context';

const CartList = ({ header }) => {
  const { cartProducts, removeCart } = useContext(context);

  const renderItem = ({ item }) => (
    <CartListItem
      id={item.id}
      key={item.id}
      name={item.name}
      price={item.price}
      src={item.src}
      balance={item.balance}
      count={item.count}
      remove={() => removeCart(item.id)}
    />
  );

  return (
    <FlatList
      style={styles.list}
      ListHeaderComponent={header}
      data={cartProducts.sort((prev, current) => prev.name > current.name)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 145,
  },
});

export default CartList;
