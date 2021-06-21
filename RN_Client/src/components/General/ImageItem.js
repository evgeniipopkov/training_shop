import React from 'react';
import { Image, StyleSheet } from 'react-native';

import constants from '../../constants/constants';

const ImageItem = ({ src, widthCoef, heightCoef }) => (
  <Image
    source={{ uri: src }}
    style={[
      styles.image,
      {
        width: Math.round(constants.width * widthCoef),
        height: Math.round(constants.width * heightCoef),
      }]}
  />
);

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
  },
});

export default ImageItem;
