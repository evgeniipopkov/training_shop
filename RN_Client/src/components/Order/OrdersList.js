/* eslint-disable global-require */
import React, { useContext, useState } from 'react';
import {
  SectionList, Text, View, StyleSheet, Image, RefreshControl, TouchableOpacity,
} from 'react-native';

import Empty from '../General/Empty';
import Balance from '../General/Balance';
import Price from '../General/Price';
import Trash from '../General/Trash';
import Question from '../General/Question';

import context from '../../context/context';
import strings from '../../constants/strings';
import constants from '../../constants/constants';
import API from '../../api/api';

const OrdersList = ({
  navigation, header, setError, setIsError, setIsLoading,
}) => {
  const {
    theme, orders, initOrders, removeOrder, login, password, isDarkMode,
  } = useContext(context);
  const [isQuestion, setIsQuestion] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [removeIdOrder, setRemoveIdOrder] = useState();

  const removedOrders = orders.filter(({ status }) => status !== strings.order.status.closed);
  const nonRemovedOrders = orders.filter(({ status }) => status === strings.order.status.closed);

  const sections = [
    {
      title: strings.order.header.new,
      data: removedOrders,
      color: theme.mayGreen,
      type: 'removed',
      image: require('../../assets/images/shopping-bag_active.png'),
    },
    {
      title: strings.order.header.received,
      data: nonRemovedOrders,
      color: theme.main,
      type: 'nonRemoved',
      image: isDarkMode
        ? require('../../assets/images/shopping-bag_unactive_dark.png')
        : require('../../assets/images/shopping-bag_unactive.png'),
    },
  ];

  const getCount = (products) => products.reduce((acc, x) => acc + x.count, 0);

  const getOrders = async () => {
    try {
      const response = await API.getOrders({ login, password });
      initOrders(response);
    } catch (e) {
      setIsError(true);
      setError(strings.order.errors.get);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getOrders();
  };

  const deleteOrder = async () => {
    setIsLoading(true);
    try {
      const response = await API.deleteOrder(removeIdOrder);
      if (response.result) {
        removeOrder(removeIdOrder);
      }
    } catch (e) {
      setIsError(true);
      setError(strings.order.errors.remove);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    sectionList: {
      marginBottom: 15,
    },
    sectionHeader: {
      paddingBottom: 15,
      backgroundColor: theme.background,
    },
    sectionText: {
      fontFamily: constants.fontMainRegular,
      fontSize: 15,
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    item: {
      marginHorizontal: 10,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      height: 51,
      width: 40,
    },
    info: {
      marginLeft: 30,
    },
    number: {
      fontFamily: constants.fontMainRegular,
      fontSize: 14,
      paddingVertical: 5,
      color: theme.gullGray,
    },
  });

  const renderHeader = ({ section }) => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.sectionHeader, { paddingTop: section.type === 'removed' ? 0 : 15 }]}>
      <Text style={[
        styles.sectionText,
        { color: section.type === 'removed' ? theme.mayGreen : theme.main },
      ]}
      >
        {section.title}
      </Text>
    </View>
  );

  const renderItem = ({ section, item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={styles.wrapper} onPress={() => navigation(item.orderid)}>
        <Image
          style={styles.image}
          source={section.image}
        />
        <View style={styles.info}>
          <Price price={item.totalSum} fontSize={17} />
          <Text style={styles.number}>{`${strings.order.number} ${item.number}`}</Text>
          <Balance balance={getCount(item.products)} fontSize={13} />
        </View>
      </TouchableOpacity>
      {section.type === 'removed'
        ? (
          <Trash onPress={() => {
            setRemoveIdOrder(item.orderid);
            setIsQuestion(true);
          }}
          />
        )
        : <Text />}
    </View>
  );

  return (
    <>
      {orders.length
        ? (
          <>
            {header}
            <SectionList
              style={styles.sectionList}
              sections={sections}
              keyExtractor={(item) => item.orderid}
              renderSectionHeader={renderHeader}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              stickySectionHeadersEnabled
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
            <Question
              title="Отменить заказ?"
              isOpen={isQuestion}
              setIsOpen={setIsQuestion}
              onPress={deleteOrder}
            />
          </>
        )
        : (
          <Empty header={header} text={strings.order.empty} refresh onPress={() => getOrders()} />
        )}
    </>
  );
};

export default OrdersList;
