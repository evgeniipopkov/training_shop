import React, {
  useRef, useContext, useEffect, useState,
} from 'react';
import {
  View, StyleSheet, StatusBar, TouchableOpacity, Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Alert from '../components/General/Alert';
import Description from '../components/Home/Description';

import context from '../context/context';
import constants from '../constants/constants';
import API from '../api/api';

const MIN_HEIGHT_IMAGE = Math.round(constants.height * 0.6);
const MAX_HEIGHT_IMAGE = Math.round(constants.height * 0.91);

const DetailScreen = ({ navigation }) => {
  const { theme, currentProduct } = useContext(context);

  const heightLayout = useRef(0);
  const heightImage = useRef(new Animated.Value(MIN_HEIGHT_IMAGE)).current;
  const [product, setProduct] = useState(currentProduct);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [showDesc, setShowDesc] = useState(false);

  const getProduct = async () => {
    try {
      const response = await API.getProduct(currentProduct.id);
      setProduct(response);
      setIsError(false);
      setShowDesc(true);
    } catch (e) {
      setIsError(true);
      setError(e.status);
    }
  };

  useEffect(() => {
    getProduct();
  }, [currentProduct]);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    image: {
      width: '100%',
    },
    back: {
      position: 'absolute',
      top: 60,
      left: 25,
    },
    refresh: {
      position: 'absolute',
      top: 60,
      right: 25,
    },
  });

  const icons = [
    {
      key: 'back',
      style: styles.back,
      onPress: navigation,
      nameIcon: 'chevron-back-outline',
    },
    {
      key: 'refresh',
      style: styles.refresh,
      onPress: getProduct,
      nameIcon: 'refresh-outline',
    }];

  const renderIcon = (key, style, onPress, nameIcon) => (
    <TouchableOpacity key={key} style={style} onPress={onPress}>
      <Icon
        name={nameIcon}
        size={30}
        color="#160F26"
      />
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar translucent barStyle="dark-content" backgroundColor={theme.transparent} />
      <View style={styles.container}>
        <Animated.Image
          style={[styles.image, { height: heightImage }]}
          source={{ uri: product.bigSrc }}
        />
        {icons.map(({
          key, style, onPress, nameIcon,
        }) => renderIcon(key, style, onPress, nameIcon))}
        {showDesc && (
          <Description
            id={product.id}
            price={product.price}
            views={product.views}
            name={product.name}
            balance={product.balance}
            description={product.description}
            heightLayout={heightLayout}
            heightImage={heightImage}
            min={MIN_HEIGHT_IMAGE}
            max={MAX_HEIGHT_IMAGE}
          />
        )}
      </View>
      <Alert title={error} isOpen={isError} setIsOpen={setIsError} showStatusBar />
    </>
  );
};

export default DetailScreen;
