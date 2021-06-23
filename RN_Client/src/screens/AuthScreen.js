import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../components/Auth/Input';
import Loader from '../components/General/Loader';
import Alert from '../components/General/Alert';

import API from '../api/api';
import strings from '../constants/strings';
import constants from '../constants/constants';
import context from '../context/context';

const AuthScreen = ({ setStatusLoading }) => {
  const { theme, setLogin, setPassword } = useContext(context);

  const [localLogin, setlocalLogin] = useState('');
  const [localPassword, setlocalPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const isValid = () => {
    setIsValidLogin(Boolean(localLogin.trim()));
    setIsValidPassword(Boolean(localPassword.trim()));
    return localLogin.trim() && localPassword.trim();
  };

  const resetValid = () => {
    Keyboard.dismiss();
    setIsValidLogin(true);
    setIsValidPassword(true);
  };

  const inputs = [
    {
      key: '0',
      value: localLogin,
      autoCompleteType: 'username',
      secureTextEntry: false,
      placeholder: strings.auth.login,
      isValid: isValidLogin,
      onChangeText: setlocalLogin,
    },
    {
      key: '1',
      value: localPassword,
      autoCompleteType: 'password',
      secureTextEntry: true,
      placeholder: strings.auth.password,
      isValid: isValidPassword,
      onChangeText: setlocalPassword,
    },
  ];

  const auth = async () => {
    try {
      const response = await API.login({ login: localLogin, password: localPassword });
      if (response.result) {
        AsyncStorage.setItem(`${constants.appName}${constants.appVersion}login`, localLogin);
        AsyncStorage.setItem(`${constants.appName}${constants.appVersion}password`, localPassword);
        setLogin(localLogin);
        setPassword(localPassword);
        setStatusLoading('main');
      }
    } catch (e) {
      setIsError(true);
      setError(strings.auth.error);
      setIsLoading(false);
    }
  };

  const onPress = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      if (isValid()) {
        setIsLoading(true);
        auth();
      }
    }, 100);
  };

  const styles = StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor: theme.background,
      alignItems: 'center',
      paddingVertical: 25,
    },
    headerWrapper: {
      marginTop: 50,
      alignItems: 'center',
    },
    header: {
      marginTop: 5,
      fontFamily: constants.fontMainMedium,
      fontSize: 23,
      color: theme.main,
    },
    name: {
      fontFamily: constants.fontMainRegular,
      fontSize: 16,
      color: theme.main,
    },
    buttonContainer: {
      marginTop: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.neonCarrot,
      fontFamily: constants.fontMainRegular,
      fontSize: 20,
      paddingLeft: 10,
    },
    loader: {
      flex: 0,
      marginTop: 40,
    },
  });

  return (
    <>
      <KeyboardAvoidingView
        behavior="height"
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={() => resetValid()}>
          <View style={styles.container}>
            <View style={styles.headerWrapper}>
              <Text style={styles.name}>{strings.auth.name}</Text>
              <Text style={styles.header}>{strings.auth.header}</Text>
            </View>
            <View>
              {inputs.map((item) => (
                <Input
                  key={item.key}
                  value={item.value}
                  autoCompleteType={item.autoCompleteType}
                  isValid={item.isValid}
                  onChangeText={item.onChangeText}
                  placeholder={item.placeholder}
                  secureTextEntry={item.secureTextEntry}
                />
              ))}
              {isLoading
                ? <Loader style={styles.loader} />
                : (
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => onPress()}>
                    <Icon
                      name="log-in-outline"
                      size={26}
                      color={theme.neonCarrot}
                    />
                    <Text style={styles.buttonText}>{strings.auth.button}</Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Alert title={error} isOpen={isError} setIsOpen={setIsError} />
    </>
  );
};

export default AuthScreen;
