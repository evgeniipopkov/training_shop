import React, { useContext } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';
import constants from '../../constants/constants';
import strings from '../../constants/strings';

const Empty = ({
  header, text = strings.empty, refresh = false, onPress,
}) => {
  const { theme } = useContext(context);

  const styles = StyleSheet.create({
    container: {
      height: '85%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: constants.fontMainRegular,
      color: theme.gullGray,
      fontSize: 16,
    },
    refreshWrapper: {
      marginTop: 40,
      flexDirection: 'row',
      alignItems: 'center',
    },
    refreshText: {
      fontFamily: constants.fontMainMedium,
      color: theme.main,
      fontSize: 17,
      paddingLeft: 5,
    },
  });

  return (
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
                color={theme.main}
              />
              <Text style={styles.refreshText}>{strings.refresh}</Text>
            </TouchableOpacity>
          )}
      </View>

    </>
  );
};

export default Empty;
