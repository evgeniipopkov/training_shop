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
import colors from '../constants/colors';
import constants from '../constants/constants';

const OrdersScreen = ({
  navigation, setStatusLoading, initScreen,
}) => {
  const { login, setLogin, setPassword } = useContext(context);

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

  const header = (
    <View style={styles.container}>
      <View style={styles.user}>
        <Icon
          name="person"
          size={14}
          color={colors.main}
        />
        <Text style={styles.login}>{login}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.tabBar.orders}</Text>
      </View>
      <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
        <Icon
          name="log-out-outline"
          size={17}
          color={colors.neonCarrot}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 35,
    backgroundColor: colors.background,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: constants.fontMainRegular,
    fontSize: 18,
    color: colors.main,
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  login: {
    fontFamily: constants.fontMainRegular,
    fontSize: 14,
    color: colors.main,
    marginLeft: 7,
  },
  logoutContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logout: {
    fontFamily: constants.fontMainRegular,
    fontSize: 14,
    color: colors.neonCarrot,
    marginLeft: 7,
  },
});

export default OrdersScreen;
