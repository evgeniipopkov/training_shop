import React from 'react';

import Container from '../components/General/Container';
import Header from '../components/General/Header';
import FavoritesList from '../components/Favorite/FavoritesList';

import strings from '../constants/strings';

const FavoritesScreen = () => (
  <Container>
    <FavoritesList header={<Header title={strings.tabBar.favorites} />} />
  </Container>
);

export default FavoritesScreen;
