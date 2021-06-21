/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import {
  FlatList, RefreshControl, StyleSheet,
} from 'react-native';

import ProductListItem from './ProductListItem';

import context from '../../context/context';
import API from '../../api/api';
import strings from '../../constants/strings';

const ProductsList = ({
  header, navigation, setError, setIsError,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { init, filterProducts } = useContext(context);

  const getProducts = async () => {
    try {
      const products = await API.getProducts();
      init(products);
      setIsError(false);
    } catch (e) {
      setIsError(true);
      setError(strings.error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getProducts();
  };

  const renderItem = ({ item }) => (
    <ProductListItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      src={item.src}
      balance={item.balance}
      navigation={navigation}
    />
  );

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
      columnWrapperStyle={styles.content}
      ListHeaderComponent={header}
      data={filterProducts}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
  },
});

export default ProductsList;
