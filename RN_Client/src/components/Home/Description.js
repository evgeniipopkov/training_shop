import React, { useRef, useContext, useState } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '../General/Button';
import Price from '../General/Price';

import context from '../../context/context';
import constants from '../../constants/constants';
import strings from '../../constants/strings';
import utils from '../../helpers/utils';

const MARGIN = 15;
const BEGIN_BOTTOM = 5;
const SIZE_ICON = 17;

const Description = ({
  id,
  price,
  views,
  name,
  balance,
  description,
  heightLayout,
  heightImage,
  min,
  max,
}) => {
  const {
    theme, favoriteProducts, addFavorite, removeFavorite, cartProducts, addCart,
  } = useContext(context);
  const [favorite, setFavorite] = useState(
    favoriteProducts.length
      ? Boolean(favoriteProducts.find((product) => product.id === id))
      : false,
  );
  const [cart, setCart] = useState(
    cartProducts.length
      ? Boolean(cartProducts.find((product) => product.id === id))
      : false,
  );

  const [down, setDown] = useState(true);
  const bottomValue = useRef(new Animated.Value(BEGIN_BOTTOM)).current;

  const onPressAnimation = () => {
    Animated.timing(bottomValue, {
      toValue: down ? -heightLayout.current + MARGIN * 2 + SIZE_ICON + BEGIN_BOTTOM : BEGIN_BOTTOM,
      duration: 700,
      useNativeDriver: false,
    }).start();

    Animated.timing(heightImage, {
      toValue: down ? max : min,
      duration: 700,
      useNativeDriver: false,
    }).start();

    setDown(!down);
  };

  const onPressCart = () => {
    setCart(true);
    addCart(id);
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      backgroundColor: theme.background,
      borderRadius: 30,
      paddingHorizontal: 25,
    },
    line: {
      marginTop: MARGIN,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginVertical: MARGIN,
    },
    wrapperViews: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconViews: {
      paddingLeft: 10,
    },
    views: {
      fontFamily: constants.fontMainRegular,
      fontSize: 16,
      color: theme.gullGray,
    },
    lineWrapper: {
      width: '100%',
      alignItems: 'center',
    },
    name: {
      fontFamily: constants.fontMainMedium,
      fontSize: 25,
      color: theme.main,
    },
    balanceWrapper: {
      width: '100%',
      marginVertical: MARGIN,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    balance: {
      fontFamily: constants.fontMainMedium,
      fontSize: 15,
      color: theme.neonCarrot,
    },
    description: {
      fontFamily: constants.fontMainRegular,
      fontSize: 15,
      color: theme.gullGray,
    },
  });

  return (
    <Animated.View
      // eslint-disable-next-line no-param-reassign
      onLayout={(event) => { heightLayout.current = event.nativeEvent.layout.height; }}
      style={[styles.container, { bottom: bottomValue }]}
      scrollEventThrottle={16}
    >
      <View style={styles.lineWrapper}>
        <TouchableOpacity
          style={styles.line}
          hitSlop={{
            top: 15,
            left: 15,
            bottom: 15,
            right: 15,
          }}
          onPress={() => onPressAnimation()}
        >
          <Icon
            style={styles.iconViews}
            name={down ? 'chevron-down-outline' : 'chevron-up-outline'}
            size={25}
            color={theme.gullGray}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Price price={price} fontSize={19} />
        <View style={styles.wrapperViews}>
          <Text style={styles.views}>{views}</Text>
          <Icon
            style={styles.iconViews}
            name="eye-outline"
            size={22}
            color={theme.gullGray}
          />
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.balanceWrapper}>
        <Text style={styles.balance}>{utils.getBalance(balance)}</Text>
        <TouchableOpacity onPress={() => {
          setFavorite(!favorite);
          if (favorite) removeFavorite(id);
          else addFavorite(id);
        }}
        >
          {favorite
            ? (
              <Icon
                name="star"
                size={25}
                color={theme.neonCarrot}
              />
            )
            : (
              <Icon
                name="star-outline"
                size={25}
                color={theme.gullGray}
              />
            )}
        </TouchableOpacity>
      </View>
      <Text style={styles.description} numberOfLines={4}>{description}</Text>
      <Button
        onPress={onPressCart}
        label={cart ? strings.cartButtons.addedCart : strings.cartButtons.addCart}
        touchable={!cart}
      />
    </Animated.View>
  );
};

export default Description;
