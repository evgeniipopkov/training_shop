/* eslint-disable no-case-declarations */
import AsyncStorage from '@react-native-async-storage/async-storage';

import types from './types';
import constants from '../constants/constants';
import utils from '../helpers/utils';
import colors from '../constants/colors';

const { ALL_CLOTHES } = constants.types.typeСlothes;
const {
  INIT,
  ADD_CART,
  ADD_FAVORITE,
  CHANGE_COUNT,
  REMOVE_CART,
  REMOVE_FAVORITE,
  REMOVE_ORDER,
  FILTER,
  SET_CURRENT_PRODUCT,
  SET_CURRENT_ORDER,
  CLEAR_CART,
  INIT_ORDERS,
  SET_LOGIN,
  SET_PASSWORD,
  CHANGE_THEME,
} = types;

const setItem = async (key, value) => AsyncStorage.setItem(key, JSON.stringify(value));

const Reducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case INIT:
      return {
        ...state,
        products: action.payload.products,
        filterProducts: action.payload.products,
        favoriteProducts: action.payload.favorites,
        cartProducts: action.payload.carts,
      };

    case ADD_CART:
      newState = {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          {
            ...state.products.find(
              (product) => product.id === action.payload,
            ),
            count: 1,
          },
        ],
      };
      setItem('cartProducts', newState.cartProducts);
      return newState;

    case ADD_FAVORITE:
      newState = {
        ...state,
        favoriteProducts: [...state.favoriteProducts, state.products.find(
          (product) => product.id === action.payload,
        )],
      };
      setItem('favoriteProducts', newState.favoriteProducts);
      return newState;

    case REMOVE_CART:
      newState = {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product.id !== action.payload,
        ),
      };
      setItem('cartProducts', newState.cartProducts);
      return newState;

    case REMOVE_FAVORITE:
      newState = {
        ...state,
        favoriteProducts: state.favoriteProducts.filter(
          (product) => product.id !== action.payload,
        ),
      };
      setItem('favoriteProducts', newState.favoriteProducts);
      return newState;

    case REMOVE_ORDER:
      newState = {
        ...state,
        orders: state.orders.filter(
          ({ orderid }) => orderid !== action.payload,
        ),
      };
      return newState;

    case CHANGE_COUNT:
      const findProduct = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );
      newState = {
        ...state,
        cartProducts: [
          ...state.cartProducts.filter((product) => product.id !== action.payload.id),
          { ...findProduct, count: findProduct.count + action.payload.count },
        ],
      };
      setItem('cartProducts', newState.cartProducts);
      return newState;

    case FILTER:
      return {
        ...state,
        filterProducts: state.products.filter(
          (product) => (action.payload.type === ALL_CLOTHES
            || utils.getType(product.type) === action.payload.type)
            && (action.payload.search === ''
              || product.name.toLowerCase().indexOf(action.payload.search.toLowerCase()) !== -1),
        ),
      };

    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: state.products.find(({ id }) => id === action.payload),
      };

    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: state.orders.find(({ orderid }) => orderid === action.payload),
      };

    case CLEAR_CART:
      setItem('cartProducts', []);
      return {
        ...state,
        cartProducts: [],
      };

    case INIT_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };

    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    case CHANGE_THEME:
      // console.log(action.payload);
      // console.log(action.payload ? colors.dark : colors.light);
      return {
        ...state,
        isDarkMode: action.payload,
        theme: action.payload ? colors.dark : colors.light,
      };

    default: return state;
  }
};

export default Reducer;
