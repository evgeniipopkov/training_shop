import React, { useState, useEffect, useContext } from 'react';
import {
  TextInput, Keyboard, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';
import strings from '../../constants/strings';
import constants from '../../constants/constants';

const Input = ({
  isValid,
  placeholder,
  value,
  autoCompleteType,
  onChangeText,
  secureTextEntry,
}) => {
  const { theme } = useContext(context);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPlaceholder, setPlaceholder] = useState(placeholder);
  const [currentPlaceholderColor, setPlaceholderColor] = useState(theme.twilight);
  const [currentStyle, setStyle] = useState(null);

  const setState = (style, newPlaceholderColor, newPlaceholder = '') => {
    setStyle(style);
    setPlaceholder(newPlaceholder || placeholder);
    setPlaceholderColor(newPlaceholderColor);
  };

  useEffect(() => {
    if (!isValid) {
      setState(styles.errorInput, theme.neonCarrot, strings.auth.validateInput);
    } else {
      setState(null, theme.twilight);
    }
  }, [isValid]);

  const styles = StyleSheet.create({
    input: {
      width: Math.round(constants.width * 0.6),
      borderBottomWidth: 1,
      fontFamily: constants.fontMainRegular,
      fontSize: 16,
      marginBottom: 10,
      borderBottomColor: theme.twilight,
      color: theme.twilight,
      paddingVertical: 10,
    },
    focusedInput: {
      borderBottomColor: theme.main,
      color: theme.main,
    },
    errorInput: {
      borderBottomColor: theme.neonCarrot,
      color: theme.neonCarrot,
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
      style={[styles.input, currentStyle]}
      placeholder={currentPlaceholder}
      placeholderTextColor={currentPlaceholderColor}
      onChangeText={(text) => onChangeText(text)}
      onSubmitEditing={Keyboard.dismiss}
      onFocus={() => setState(styles.focusedInput, theme.main)}
      onBlur={() => setState(null, theme.twilight)}
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
