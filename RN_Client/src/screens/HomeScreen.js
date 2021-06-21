import React, { useState, useContext, useEffect } from 'react';

import Alert from '../components/General/Alert';
import Container from '../components/General/Container';
import Search from '../components/Home/Search';
import TabSort from '../components/Home/TabSort';
import ProductsList from '../components/Home/ProductsList';

import constants from '../constants/constants';
import context from '../context/context';

const { ALL_CLOTHES } = constants.types.typeСlothes;

const HomeScreen = ({ navigation }) => {
  const { filter } = useContext(context);

  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(ALL_CLOTHES);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    filter(activeTab, searchValue);
  }, [searchValue, activeTab]);

  return (
    <Container>
      <ProductsList
        header={(
          <>
            <Search value={searchValue} setValue={setSearchValue} />
            <TabSort active={activeTab} setActive={setActiveTab} />
          </>
        )}
        navigation={navigation}
        setError={setError}
        setIsError={setIsError}
      />
      <Alert title={error} success={false} isOpen={isError} setIsOpen={setIsError} />
    </Container>
  );
};

export default HomeScreen;
