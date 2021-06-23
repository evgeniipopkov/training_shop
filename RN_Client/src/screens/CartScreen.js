import React, { useContext, useState } from 'react';

import Alert from '../components/General/Alert';
import Empty from '../components/General/Empty';
import Container from '../components/General/Container';
import Loader from '../components/General/Loader';
import Header from '../components/General/Header';
import CartList from '../components/Cart/CartList';
import CartFooter from '../components/Cart/CartFooter';

import context from '../context/context';
import strings from '../constants/strings';

const CartScreen = () => {
  const { cartProducts } = useContext(context);

  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const renderHeader = () => <Header title={strings.tabBar.cart} />;

  return (
    <Container>
      {!isLoading
        ? (
          <>
            {cartProducts.length
              ? (
                <>
                  <CartList
                    header={renderHeader()}
                  />
                  <CartFooter
                    setIsMessage={setIsMessage}
                    setMessage={setMessage}
                    setIsLoading={setIsLoading}
                  />
                </>
              )
              : <Empty header={renderHeader()} />}
            <Alert
              title={message}
              isOpen={isMessage}
              setIsOpen={setIsMessage}
            />
          </>
        )
        : <Loader />}
    </Container>
  );
};

export default CartScreen;
