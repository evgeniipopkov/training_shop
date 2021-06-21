import constants from './constants';

export default constants.isDarkMode
  ? {
    background: '#160F26',
    statusBar: 'light-content',
    innerBackgroud: '#322E3A',
    neonCarrot: '#FF9938',
    twilight: '#BBC1CB',
    main: '#FFF',
    gullGray: '#9EA7B5',
    transparent: 'transparent',
    mayGreen: '#3BAE4C',
    modal: 'rgba(0, 0, 0, 0.85)',
  }
  : {
    background: '#FFF',
    statusBar: 'dark-content',
    innerBackgroud: '#F6F6F6',
    neonCarrot: '#FF9938',
    twilight: '#BBC1CB',
    main: '#4A4850',
    gullGray: '#9EA7B5',
    transparent: 'transparent',
    mayGreen: '#3BAE4C',
    modal: 'rgba(0, 0, 0, 0.85)',
  };
