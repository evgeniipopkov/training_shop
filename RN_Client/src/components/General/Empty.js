import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../constants/colors';
import constants from '../../constants/constants';
import strings from '../../constants/strings';

const Empty = ({
  header, text = strings.empty, refresh = false, onPress,
}) => (
  <>
    {header}
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {refresh
        && (
          <TouchableOpacity style={styles.refreshWrapper} onPress={onPress}>
            <Icon
              name="refresh-outline"
              size={22}
              color={colors.main}
            />
            <Text style={styles.refreshText}>{strings.refresh}</Text>
          </TouchableOpacity>
        )}
    </View>

  </>
);

const styles = StyleSheet.create({
  container: {
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: constants.fontMainRegular,
    color: colors.gullGray,
    fontSize: 16,
  },
  refreshWrapper: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    fontFamily: constants.fontMainMedium,
    color: colors.main,
    fontSize: 17,
    paddingLeft: 5,
  },
});

export default Empty;
