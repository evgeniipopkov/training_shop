import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';

import colors from '../../constants/colors';
import constants from '../../constants/constants';
import strings from '../../constants/strings';

const {
  ALL_CLOTHES, DRESS_CLOTHES, HOODY_CLOTHES, SHOES_CLOTHES,
} = constants.types.typeСlothes;

const TabSort = ({ active, setActive }) => {
  const items = [
    {
      key: ALL_CLOTHES,
      label: strings.tabSort.all,
      isActive: active === ALL_CLOTHES,
      onPress: () => setActive(ALL_CLOTHES),
    },
    {
      key: DRESS_CLOTHES,
      label: strings.tabSort.dress,
      isActive: active === DRESS_CLOTHES,
      onPress: () => setActive(DRESS_CLOTHES),
    },
    {
      key: SHOES_CLOTHES,
      label: strings.tabSort.shoes,
      isActive: active === SHOES_CLOTHES,
      onPress: () => setActive(SHOES_CLOTHES),
    },
    {
      key: HOODY_CLOTHES,
      label: strings.tabSort.hoody,
      isActive: active === HOODY_CLOTHES,
      onPress: () => setActive(HOODY_CLOTHES),
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity key={item.key} onPress={() => active !== item.key && item.onPress()}>
          <Text
            style={[
              styles.label,
              { color: item.isActive ? colors.neonCarrot : colors.main },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
    backgroundColor: colors.background,
  },
  label: {
    fontFamily: constants.fontMainBold,
    color: colors.main,
    fontSize: 15,
  },
});

export default TabSort;
