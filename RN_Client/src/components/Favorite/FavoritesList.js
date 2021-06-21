import React, { useContext } from 'react';
import { FlatList } from 'react-native';

import Empty from '../General/Empty';
import FavoritesListItem from './FavoritesListItem';
import context from '../../context/context';

const FavoritesList = ({ header }) => {
  const { favoriteProducts, removeFavorite } = useContext(context);

  const renderItem = ({ item }) => (
    <FavoritesListItem
      key={item.id}
      name={item.name}
      price={item.price}
      src={item.src}
      balance={item.balance}
      remove={() => removeFavorite(item.id)}
    />
  );

  return (
    <>
      {favoriteProducts.length
        ? (
          <FlatList
            ListHeaderComponent={header}
            data={favoriteProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
        )
        : (
          <Empty header={header} />
        )}
    </>
  );
};

export default FavoritesList;
