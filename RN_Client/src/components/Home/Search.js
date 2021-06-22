import React, { useContext } from 'react';
import {
  TextInput, View, StyleSheet, Pressable, Keyboard, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';
import constants from '../../constants/constants';
import strings from '../../constants/strings';

const Search = ({ value, setValue }) => {
  const { theme } = useContext(context);

  const clean = () => {
    setValue('');
    Keyboard.dismiss();
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 25,
      backgroundColor: theme.background,
    },
    borderContainer: {
      flexDirection: 'row',
      borderRadius: 20,
      backgroundColor: theme.innerBackgroud,
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
      color: theme.main,
      fontSize: 16,
      paddingLeft: 15,
      width: '80%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.borderContainer}>
        <View style={styles.wrapper}>
          <Pressable onPress={() => Keyboard.dismiss()}>
            <Icon
              name="search-outline"
              size={22}
              color={theme.gullGray}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder={strings.searchPlaceholder}
            placeholderTextColor={theme.gullGray}
          />
        </View>
        {value
          ? (
            <TouchableOpacity onPress={() => clean()}>
              <Icon
                name="close-outline"
                size={27}
                color={theme.main}
              />
            </TouchableOpacity>
          )
          : null}
      </View>
    </View>
  );
};

export default Search;
