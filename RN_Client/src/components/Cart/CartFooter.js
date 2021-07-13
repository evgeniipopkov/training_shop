import React, { useContext } from 'react';
import {
  Text, View, StyleSheet, ToastAndroid,
} from 'react-native';

import Button from '../General/Button';
import Price from '../General/Price';

import context from '../../context/context';
import strings from '../../constants/strings';
import constants from '../../constants/constants';
import API from '../../api/api';

const CartFooter = ({
  setMessage, setIsMessage, setIsLoading,
}) => {
  const {
    theme, cartProducts, clearCart, initOrders, login, password,
  } = useContext(context);
  const sum = cartProducts.reduce((acc, current) => (acc + current.count * current.price), 0);

  const postOrder = async () => {
    setIsLoading(true);
    try {
      await API.postOrder({
        login,
        password,
        products: cartProducts.map(({ id, count, price }) => ({ id, count, price })),
      });
      ToastAndroid.show(strings.order.successOrder, ToastAndroid.SHORT);
      clearCart();
      const orders = await API.getOrders({ login, password });
      initOrders(orders);
    } catch (e) {
      const error = await e.json();
      setMessage(error.message);
      setIsMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: theme.background,
      width: '100%',
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 25,
      paddingVertical: 10,
    },
    wrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sum: {
      fontFamily: constants.fontMainBold,
      color: theme.main,
      fontSize: 21,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.sum}>{strings.sum}</Text>
        <Price price={sum} fontSize={21} />
      </View>
      <Button
        onPress={postOrder}
        label={strings.cartButtons.order}
      />
    </View>
  );
};

export default CartFooter;
