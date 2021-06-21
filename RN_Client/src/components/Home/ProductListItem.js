import React, { useContext } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Price from '../General/Price';
import Balance from '../General/Balance';
import Name from '../General/Name';

import context from '../../context/context';
import colors from '../../constants/colors';
import constants from '../../constants/constants';

const ProductListItem = ({
  id, name, price, src, balance, navigation,
}) => {
  const { favoriteProducts } = useContext(context);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation(id)}>
      <View>
        <Image
          source={{ uri: src }}
          style={styles.image}
        />
        <View style={
          [
            styles.favorites,
            {
              backgroundColor: favoriteProducts.length
                && favoriteProducts.find((product) => product.id === id)
                ? colors.neonCarrot
                : colors.twilight,
            },
          ]
        }
        >
          <Icon
            name="star"
            size={15}
            color={colors.background}
          />
        </View>
      </View>
      <View style={styles.wrapperPrice}>
        <Price price={price} fontSize={18} />
        <Balance balance={balance} fontSize={14} />
      </View>
      <Name name={name} fontSize={15} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Math.round(constants.width * 0.4),
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: Math.round(constants.width * 0.51),
    borderRadius: 15,
  },
  wrapperPrice: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favorites: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 7,
  },
});

export default ProductListItem;
