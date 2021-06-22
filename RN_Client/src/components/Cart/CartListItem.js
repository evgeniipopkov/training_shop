import React, { useContext, useState } from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Price from '../General/Price';
import Name from '../General/Name';
import Trash from '../General/Trash';
import ImageItem from '../General/ImageItem';

import context from '../../context/context';
import constants from '../../constants/constants';

const CartListItem = ({
  id, name, price, src, count, remove,
}) => {
  const { theme, changeCount } = useContext(context);
  const [countState, setCount] = useState(count);

  const minus = () => {
    if (countState >= 2) {
      changeCount(id, -1);
      setCount(countState - 1);
    }
  };

  const plus = () => {
    changeCount(id, 1);
    setCount(countState + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    wrapper: {
      flexDirection: 'row',
    },
    description: {
      paddingLeft: 25,
      justifyContent: 'space-between',
    },
    counter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    circle: {
      borderRadius: 20,
      backgroundColor: theme.gullGray,
      height: 22,
      width: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    count: {
      fontFamily: constants.fontMainRegular,
      fontSize: 12,
      color: theme.background,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ImageItem src={src} widthCoef={0.18} heightCoef={0.23} />
        <View style={styles.description}>
          <Price price={price} fontSize={17} />
          <Name name={name} fontSize={15} />
          <View style={styles.counter}>
            <TouchableOpacity onPress={minus}>
              <Icon
                name="remove-outline"
                size={20}
                color={theme.main}
              />
            </TouchableOpacity>
            <View style={styles.circle}>
              <Text style={styles.count}>{countState}</Text>
            </View>
            <TouchableOpacity onPress={plus}>
              <Icon
                name="add-outline"
                size={20}
                color={theme.main}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Trash onPress={remove} />
    </View>
  );
};

export default CartListItem;
