import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import context from '../../context/context';

const Trash = ({ onPress }) => {
  const { theme } = useContext(context);

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name="trash"
        size={25}
        color={theme.neonCarrot}
      />
    </TouchableOpacity>
  );
};

export default Trash;
