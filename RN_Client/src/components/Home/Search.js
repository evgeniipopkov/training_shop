import React from 'react';
import {
  TextInput, View, StyleSheet, Pressable, Keyboard, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../constants/colors';
import constants from '../../constants/constants';
import strings from '../../constants/strings';

const Search = ({ value, setValue }) => {
  const clean = () => {
    setValue('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.wrapper}>
          <Pressable onPress={() => Keyboard.dismiss()}>
            <Icon
              name="search-outline"
              size={22}
              color={colors.gullGray}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder={strings.searchPlaceholder}
            placeholderTextColor={colors.gullGray}
          />
        </View>
        {value
          ? (
            <TouchableOpacity onPress={() => clean()}>
              <Icon
                name="close-outline"
                size={27}
                color={colors.main}
              />
            </TouchableOpacity>
          )
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    backgroundColor: colors.background,
  },
  borderContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: colors.innerBackgroud,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: constants.fontMainRegular,
    color: colors.main,
    fontSize: 16,
    paddingLeft: 15,
    width: '80%',
  },
});

export default Search;
