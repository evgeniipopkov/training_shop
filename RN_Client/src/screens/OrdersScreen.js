/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Container from '../components/General/Container';
import Alert from '../components/General/Alert';
import Loader from '../components/General/Loader';
import OrdersList from '../components/Order/OrdersList';

import context from '../context/context';
import strings from '../constants/strings';
import constants from '../constants/constants';

const OrdersScreen = ({
  navigation, setStatusLoading, initScreen,
}) => {
  const {
    theme, changeTheme, isDarkMode, setLogin, setPassword,
  } = useContext(context);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    AsyncStorage.removeItem(`${constants.appName}${constants.appVersion}login`);
    AsyncStorage.removeItem(`${constants.appName}${constants.appVersion}password`);
    setLogin('');
    setPassword('');
    initScreen();
    setStatusLoading('auth');
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 35,
      backgroundColor: theme.background,
      flexDirection: 'row',
    },
    header: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontFamily: constants.fontMainRegular,
      fontSize: 18,
      color: theme.main,
    },
    switcherContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    switcher: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: theme.twilight,
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 12,
    },
    switchButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
    },
    logoutContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    logout: {
      fontFamily: constants.fontMainRegular,
      fontSize: 16,
      color: theme.neonCarrot,
      marginLeft: 7,
    },
  });

  const header = (
    <View style={styles.container}>

      <View style={styles.switcherContainer}>
        {isDarkMode
          ? (
            <TouchableOpacity
              style={[
                styles.switcher,
                { backgroundColor: theme.lightDark }]}
              onPress={() => changeTheme(!isDarkMode)}
            >
              <View style={[
                styles.switchButton,
                {
                  marginRight: 10,
                  backgroundColor: theme.minorDark,
                  borderColor: theme.background,
                }]}
              />
              <Icon
                name="moon"
                size={18}
                color={theme.background}
              />
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={[
                styles.switcher,
                { backgroundColor: theme.background }]}
              onPress={() => changeTheme(!isDarkMode)}
            >
              <Icon
                name="sunny"
                size={18}
                color={theme.neonCarrot}
              />
              <View style={[
                styles.switchButton,
                {
                  marginLeft: 10,
                  backgroundColor: theme.ligthNeonCarrot,
                  borderColor: theme.neonCarrot,
                }]}
              />
            </TouchableOpacity>
          )}

      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.tabBar.orders}</Text>
      </View>
      <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
        <Icon
          name="log-out-outline"
          size={22}
          color={theme.neonCarrot}
        />
        <Text style={styles.logout}>{strings.logout}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container>
      {!isLoading
        ? (
          <>
            <OrdersList
              navigation={navigation}
              header={header}
              setError={setError}
              setIsError={setIsError}
              setIsLoading={setIsLoading}
            />
            <Alert title={error} success={false} isOpen={isError} setIsOpen={setIsError} />
          </>
        )
        : <Loader />}
    </Container>
  );
};

export default OrdersScreen;
