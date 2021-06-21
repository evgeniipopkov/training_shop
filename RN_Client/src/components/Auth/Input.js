import React, { useState, useEffect } from 'react';
import {
  TextInput, Keyboard, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../constants/colors';
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
  const [showPassword, setShowPassword] = useState(false);
  const [currentPlaceholder, setPlaceholder] = useState(placeholder);
  const [currentPlaceholderColor, setPlaceholderColor] = useState(colors.twilight);
  const [currentStyle, setStyle] = useState(null);

  const setState = (style, newPlaceholderColor, newPlaceholder = '') => {
    setStyle(style);
    setPlaceholder(newPlaceholder || placeholder);
    setPlaceholderColor(newPlaceholderColor);
  };

  useEffect(() => {
    if (!isValid) {
      setState(styles.errorInput, colors.neonCarrot, strings.auth.validateInput);
    } else {
      setState(null, colors.twilight);
    }
  }, [isValid]);

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
      onFocus={() => setState(styles.focusedInput, colors.main)}
      onBlur={() => setState(null, colors.twilight)}
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
                    color={colors.twilight}
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

const styles = StyleSheet.create({
  input: {
    width: Math.round(constants.width * 0.6),
    borderBottomWidth: 1,
    fontFamily: constants.fontMainRegular,
    fontSize: 16,
    marginBottom: 10,
    borderBottomColor: colors.twilight,
    color: colors.twilight,
    paddingVertical: 10,
  },
  focusedInput: {
    borderBottomColor: colors.main,
    color: colors.main,
  },
  errorInput: {
    borderBottomColor: colors.neonCarrot,
    color: colors.neonCarrot,
  },
  eye: {
    position: 'absolute',
    right: 5,
    bottom: 20,
  },
});

export default Input;
