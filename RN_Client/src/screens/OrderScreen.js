import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Container from '../components/General/Container';
import Price from '../components/General/Price';
import Balance from '../components/General/Balance';
import ImageItem from '../components/General/ImageItem';
import Question from '../components/General/Question';
import Alert from '../components/General/Alert';
import Loader from '../components/General/Loader';

import context from '../context/context';
import constants from '../constants/constants';
import strings from '../constants/strings';
import API from '../api/api';

const OrderScreen = ({ navigation }) => {
  const { theme, currentOrder, removeOrder } = useContext(context);

  const [isQuestion, setIsQuestion] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date(currentOrder.date);
  const isClosed = currentOrder.status === strings.order.status.closed;

  const getDateString = (value) => (value < 10 ? `0${value}` : value);

  const deleteOrder = async () => {
    setIsLoading(true);
    try {
      const response = await API.deleteOrder(currentOrder.orderid);
      if (response.result) {
        removeOrder(currentOrder.orderid);
        ToastAndroid.show(strings.order.cancelSuccess, ToastAndroid.SHORT);
        navigation();
      }
    } catch (e) {
      setIsError(true);
      setError(strings.order.errors.remove);
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    header: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 35,
      backgroundColor: theme.background,
      flexDirection: 'row',
    },
    backWrapper: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    titleWrapper: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: constants.fontMainMedium,
      fontSize: 17,
      color: theme.main,
    },
    dateWrapper: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    date: {
      fontFamily: constants.fontMainRegular,
      fontSize: 13,
      color: theme.gullGray,
    },
    productWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    description: {
      paddingLeft: 25,
      justifyContent: 'space-between',
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      fontFamily: constants.fontMainRegular,
      color: theme.gullGray,
      fontSize: 15,
      marginTop: 5,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 25,
    },
    sumWrapper: {
      flexDirection: 'row',
    },
    sum: {
      fontFamily: constants.fontMainBold,
      color: theme.main,
      fontSize: 18,
      marginRight: 10,
    },
    button: {
      width: '40%',
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: theme.neonCarrot,
    },
    buttonText: {
      fontFamily: constants.fontMainMedium,
      fontSize: 16,
      color: theme.background,
    },
  });

  const renderItem = ({ item }) => (
    <View style={styles.productWrapper}>
      <View style={styles.info}>
        <ImageItem src={item.src} widthCoef={0.15} heightCoef={0.19} />
        <View style={styles.description}>
          <Price price={item.price} fontSize={17} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
      <View>
        <Balance balance={item.count} fontSize={14} />
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backWrapper} onPress={() => navigation()}>
        <Icon
          name="chevron-back-outline"
          size={30}
          color={theme.main}
        />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{`№ ${currentOrder.number}`}</Text>
      </View>
      <View style={styles.dateWrapper}>
        <Text style={styles.date}>
          {`${getDateString(date.getDate())}.${getDateString(date.getMonth() + 1)}.${date.getFullYear()}`}
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.footer, { justifyContent: isClosed ? 'center' : 'space-between' }]}>
      <View style={styles.sumWrapper}>
        <Text style={styles.sum}>{strings.sum}</Text>
        <Price price={currentOrder.totalSum} fontSize={18} />
      </View>
      {!isClosed
        && (
          <TouchableOpacity style={styles.button} onPress={() => setIsQuestion(true)}>
            <Text style={styles.buttonText}>{strings.cartButtons.cancel}</Text>
          </TouchableOpacity>
        )}
    </View>
  );

  return (
    <Container>
      {renderHeader()}
      {!isLoading
        ? (
          <>
            <FlatList
              data={currentOrder.products}
              keyExtractor={(item) => item.productid}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
            {renderFooter()}
            <Question
              title={strings.cancelOrder}
              isOpen={isQuestion}
              setIsOpen={setIsQuestion}
              onPress={deleteOrder}
            />
            <Alert title={error} isOpen={isError} setIsOpen={setIsError} />
          </>
        )
        : <Loader />}
    </Container>
  );
};

export default OrderScreen;
