import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../constants/colors';

const Trash = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon
      name="trash"
      size={25}
      color={colors.neonCarrot}
    />
  </TouchableOpacity>
);

export default Trash;
