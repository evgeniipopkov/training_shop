import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderScreen from '../screens/OrderScreen';
import AuthScreen from '../screens/AuthScreen';

import context from '../context/context';
import Alert from '../components/General/Alert';
import Loader from '../components/General/Loader';
import TabIcon from '../components/Nav/TabIcon';
import strings from '../constants/strings';
import constants from '../constants/constants';
import API from '../api/api';

const TAB_PRODUCTS = 'TAB_PRODUCTS';
const TAB_FAVORITES = 'TAB_FAVORITES';
const TAB_CART = 'TAB_CART';
const TAB_ORDERS = 'TAB_ORDERS';

const SCREEN_HOME = 'SCREEN_HOME';
const SCREEN_DETAIL = 'SCREEN_DETAIL';
const SCREEN_FAVOTITES = 'SCREEN_FAVOTITES';
const SCREEN_CART = 'SCREEN_CART';
const SCREEN_ORDERS = 'SCREEN_ORDERS';
const SCREEN_ORDER = 'SCREEN_ORDER';

const AppNavigator = () => {
  const {
    theme,
    initTheme,
    setCurrentProduct,
    setCurrentOrder,
    init,
    initOrders,
    login,
    password,
    setLogin,
    setPassword,
  } = useContext(context);

  const [activeTab, setActiveTab] = useState(TAB_PRODUCTS);
  const [activeScreen, setActiveScreen] = useState(SCREEN_HOME);
  const [lastHomeScreen, setLastHomeScreen] = useState(SCREEN_HOME);
  const [lastOrderScreen, setLastOrderScreen] = useState(SCREEN_ORDERS);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [statusLoading, setStatusLoading] = useState('loading');

  const initState = async () => {
    try {
      const products = await API.getProducts();
      const orders = await API.getOrders({ login, password });
      init(products);
      initOrders(orders);
      setIsError(false);
    } catch (e) {
      setIsError(true);
      setError(strings.error);
    }
  };

  const bootstrapAsync = async () => {
    const isDarkModeString = await AsyncStorage.getItem('isDarkMode');
    const isDarkMode = await JSON.parse(isDarkModeString);
    initTheme(Boolean(isDarkMode));

    const storageLogin = await AsyncStorage.getItem(
      `${constants.appName}${constants.appVersion}login`,
    );

    const storagePassword = await AsyncStorage.getItem(
      `${constants.appName}${constants.appVersion}password`,
    );

    if (storageLogin && storagePassword) {
      try {
        const response = await API.login({ login: storageLogin, password: storagePassword });
        if (response.result) {
          setLogin(storageLogin);
          setPassword(storagePassword);
          setStatusLoading('main');
        } else {
          setStatusLoading('auth');
        }
      } catch (e) {
        setStatusLoading('auth');
      }
    } else {
      setStatusLoading('auth');
    }
  };

  useEffect(() => {
    if (statusLoading === 'main') {
      initState();
    } else if (statusLoading === 'loading') {
      bootstrapAsync();
    }
  }, [statusLoading]);

  const initScreen = () => {
    setActiveScreen(SCREEN_HOME);
    setActiveTab(TAB_PRODUCTS);
  };

  const tabBarItems = [
    {
      key: TAB_PRODUCTS,
      iconName: 'grid',
      label: strings.tabBar.products,
      isFull: activeTab === TAB_PRODUCTS,
      isCart: false,
      onPress: () => {
        setActiveTab(TAB_PRODUCTS);
        if (activeScreen === SCREEN_ORDER || activeScreen === SCREEN_ORDERS) {
          setLastOrderScreen(activeScreen);
        }
        if (activeScreen !== SCREEN_DETAIL && activeScreen !== SCREEN_HOME) {
          setActiveScreen(lastHomeScreen);
        } else {
          setActiveScreen(SCREEN_HOME);
        }
      },
    },
    {
      key: TAB_FAVORITES,
      iconName: 'star',
      label: strings.tabBar.favorites,
      isFull: activeTab === TAB_FAVORITES,
      isCart: false,
      onPress: () => {
        setActiveTab(TAB_FAVORITES);
        if (activeScreen !== SCREEN_FAVOTITES) {
          setActiveScreen(SCREEN_FAVOTITES);
        }
        if (activeScreen === SCREEN_DETAIL || activeScreen === SCREEN_HOME) {
          setLastHomeScreen(activeScreen);
        }
        if (activeScreen === SCREEN_ORDER || activeScreen === SCREEN_ORDERS) {
          setLastOrderScreen(activeScreen);
        }
      },
    },
    {
      key: TAB_ORDERS,
      iconName: 'albums',
      label: strings.tabBar.orders,
      isFull: activeTab === TAB_ORDERS,
      isCart: false,
      onPress: () => {
        setActiveTab(TAB_ORDERS);
        if (activeScreen === SCREEN_DETAIL || activeScreen === SCREEN_HOME) {
          setLastHomeScreen(activeScreen);
        }
        if (activeScreen !== SCREEN_ORDER && activeScreen !== SCREEN_ORDERS) {
          setActiveScreen(lastOrderScreen);
        } else {
          setActiveScreen(SCREEN_ORDERS);
        }
      },
    },
    {
      key: TAB_CART,
      iconName: 'cart',
      label: strings.tabBar.cart,
      isFull: activeTab === TAB_CART,
      isCart: true,
      onPress: () => {
        setActiveTab(TAB_CART);
        if (activeScreen !== SCREEN_CART) {
          setActiveScreen(SCREEN_CART);
        }
        if (activeScreen === SCREEN_DETAIL || activeScreen === SCREEN_HOME) {
          setLastHomeScreen(activeScreen);
        }
        if (activeScreen === SCREEN_ORDER || activeScreen === SCREEN_ORDERS) {
          setLastOrderScreen(activeScreen);
        }
      },
    },
  ];

  const navigateDetail = (id) => {
    setActiveScreen(SCREEN_DETAIL);
    setCurrentProduct(id);
  };
  const navigateHome = () => setActiveScreen(SCREEN_HOME);

  const navigateOrder = (id) => {
    setActiveScreen(SCREEN_ORDER);
    setCurrentOrder(id);
  };
  const navigateOrders = () => setActiveScreen(SCREEN_ORDERS);

  const renderScreen = () => {
    switch (activeScreen) {
      case SCREEN_HOME:
        return <HomeScreen navigation={navigateDetail} />;
      case SCREEN_DETAIL:
        return <DetailScreen navigation={navigateHome} />;
      case SCREEN_FAVOTITES:
        return <FavoritesScreen />;
      case SCREEN_CART:
        return <CartScreen />;
      case SCREEN_ORDERS:
        return (
          <OrdersScreen
            navigation={navigateOrder}
            setStatusLoading={setStatusLoading}
            initScreen={initScreen}
          />
        );
      case SCREEN_ORDER:
        return <OrderScreen navigation={navigateOrders} />;
      default:
        return null;
    }
  };

  const renderTabs = () => tabBarItems.map((item) => (
    <TouchableOpacity
      key={item.key}
      activeOpacity={activeTab !== item.key ? 0 : 1}
      onPress={() => activeTab !== item.key && item.onPress()}
    >
      <TabIcon
        iconName={item.iconName}
        label={item.label}
        isFull={item.isFull}
        isCart={item.isCart}
      />
    </TouchableOpacity>
  ));

  const render = () => {
    if (statusLoading === 'loading') {
      return (
        <View style={styles.emptyContainer}>
          <Loader />
        </View>
      );
    }

    if (statusLoading === 'auth') {
      return <AuthScreen setStatusLoading={setStatusLoading} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.screen}>
          {renderScreen()}
        </View>
        <View style={styles.tabBar}>
          {renderTabs()}
        </View>
        <Alert title={error} isOpen={isError} setIsOpen={setIsError} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: theme.background,
    },
    emptyContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    screen: {
      height: '92%',
    },
    tabBar: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      flexDirection: 'row',
      width: '100%',
      height: '8%',
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'space-around',
      elevation: 10,
    },
  });

  return (
    <>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.background} />
      {render()}
    </>
  );
};

export default AppNavigator;
