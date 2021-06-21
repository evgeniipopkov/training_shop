import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Button from '../General/Button';
import Price from '../General/Price';

import context from '../../context/context';
import strings from '../../constants/strings';
import colors from '../../constants/colors';
import constants from '../../constants/constants';
import API from '../../api/api';

const CartFooter = ({
  setMessage, setSuccess, setIsMessage, setIsLoading,
}) => {
  const {
    cartProducts, clearCart, initOrders, login, password,
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
      setMessage(strings.order.successOrder);
      setSuccess(true);
      clearCart();
      const orders = await API.getOrders({ login, password });
      initOrders(orders);
    } catch (e) {
      const error = await e.json();
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setIsMessage(true);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.sum}>{strings.sum}</Text>
        <Price price={sum} fontSize={22} />
      </View>
      <Button
        onPress={postOrder}
        label={strings.cartButtons.order}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.background,
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
    color: colors.main,
    fontSize: 22,
  },
});

export default CartFooter;
