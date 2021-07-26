import React, { useState, useContext } from 'react';
import {
  TextInput, Keyboard, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';
import strings from '../../constants/strings';
import constants from '../../constants/constants';

const Input = ({
  isValid,
  setIsValid,
  placeholder,
  value,
  autoCompleteType,
  onChangeText,
  secureTextEntry,
}) => {
  const { theme } = useContext(context);
  const [showPassword, setShowPassword] = useState(false);

  const styles = StyleSheet.create({
    input: {
      width: Math.round(constants.width * 0.6),
      borderBottomWidth: 1,
      fontFamily: constants.fontMainRegular,
      fontSize: 16,
      marginBottom: 10,
      borderBottomColor: isValid ? theme.twilight : theme.neonCarrot,
      color: theme.main,
      paddingVertical: 10,
    },
    eye: {
      position: 'absolute',
      right: 5,
      bottom: 20,
    },
  });

  const renderInput = (secure) => (
    <TextInput
      value={value}
      autoCompleteType={autoCompleteType}
      secureTextEntry={secure}
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.input}
      placeholder={isValid ? placeholder : strings.auth.validateInput}
      placeholderTextColor={isValid ? theme.twilight : theme.neonCarrot}
      onChangeText={(text) => onChangeText(text)}
      onSubmitEditing={Keyboard.dismiss}
      onFocus={() => !isValid && setIsValid(true)}
    />
  );

  return (
    <>
      {secureTextEntry
        ? (
          <View>
            {renderInput(!showPassword)}
            {value
              ? (
                <TouchableOpacity
                  style={styles.eye}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color={theme.twilight}
                  />
                </TouchableOpacity>
              )
              : null}
          </View>
        )
        : renderInput(false)}
    </>
  );
};

export default Input;
