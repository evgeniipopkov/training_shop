import React, { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from './context';
import reducer from './reducer';
import types from './types';

const {
  INIT,
  ADD_CART,
  ADD_FAVORITE,
  REMOVE_CART,
  REMOVE_FAVORITE,
  REMOVE_ORDER,
  FILTER,
  SET_CURRENT_PRODUCT,
  SET_CURRENT_ORDER,
  CHANGE_COUNT,
  CLEAR_CART,
  INIT_ORDERS,
  SET_LOGIN,
  SET_PASSWORD,
} = types;

const compareArray = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
  }
  return true;
};

const State = ({ children }) => {
  const initialState = {
    orders: [],
    products: [],
    filterProducts: [],
    favoriteProducts: [],
    cartProducts: [],
    currentProduct: {},
    currentOrder: {},
    login: '',
    password: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const init = async (products) => {
    const favoritesString = await AsyncStorage.getItem('favoriteProducts');
    const favorites = favoritesString ? await JSON.parse(favoritesString) : [];
    const cartsString = await AsyncStorage.getItem('cartProducts');
    const carts = cartsString ? await JSON.parse(cartsString) : [];

    const newFavorites = favorites.length
      ? favorites.filter((favorite) => products.find((product) => favorite.id === product.id))
      : [];

    const newCarts = carts.length
      ? carts.filter((cart) => products.find((product) => cart.id === product.id))
      : [];

    if (!compareArray(newFavorites, favorites)) {
      AsyncStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
    }
    if (!compareArray(newCarts, carts)) {
      AsyncStorage.setItem('cartProducts', JSON.stringify(newCarts));
    }

    dispatch({
      type: INIT,
      payload: {
        products,
        favorites: newFavorites,
        carts: newCarts,
      },
    });
  };

  const initOrders = (orders) => dispatch({ type: INIT_ORDERS, payload: orders });
  const addCart = (id) => dispatch({ type: ADD_CART, payload: id });
  const addFavorite = (id) => dispatch({ type: ADD_FAVORITE, payload: id });
  const removeCart = (id) => dispatch({ type: REMOVE_CART, payload: id });
  const removeFavorite = (id) => dispatch({ type: REMOVE_FAVORITE, payload: id });
  const removeOrder = (id) => dispatch({ type: REMOVE_ORDER, payload: id });
  const filter = (type, search) => dispatch({ type: FILTER, payload: { type, search } });
  const setCurrentProduct = (id) => dispatch({ type: SET_CURRENT_PRODUCT, payload: id });
  const setCurrentOrder = (id) => dispatch({ type: SET_CURRENT_ORDER, payload: id });
  const changeCount = (id, count) => dispatch({ type: CHANGE_COUNT, payload: { id, count } });
  const clearCart = () => dispatch({ type: CLEAR_CART });
  const setLogin = (login) => dispatch({ type: SET_LOGIN, payload: login });
  const setPassword = (password) => dispatch({ type: SET_PASSWORD, payload: password });

  return (
    <Context.Provider
      value={{
        orders: state.orders,
        products: state.products,
        filterProducts: state.filterProducts,
        favoriteProducts: state.favoriteProducts,
        cartProducts: state.cartProducts,
        currentProduct: state.currentProduct,
        currentOrder: state.currentOrder,
        login: state.login,
        password: state.password,
        init,
        addCart,
        addFavorite,
        removeCart,
        removeFavorite,
        removeOrder,
        filter,
        setCurrentProduct,
        setCurrentOrder,
        changeCount,
        clearCart,
        initOrders,
        setLogin,
        setPassword,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;
