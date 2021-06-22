const basic = {
  neonCarrot: '#FF9938',
  ligthNeonCarrot: '#FCCDA0',
  twilight: '#BBC1CB',
  gullGray: '#9EA7B5',
  transparent: 'transparent',
  mayGreen: '#3BAE4C',
  modal: 'rgba(0, 0, 0, 0.85)',
  lightDark: '#423A55',
  minorDark: '#7E798A',
};

export default {
  dark: {
    ...basic,
    background: '#160F26',
    statusBar: 'light-content',
    innerBackgroud: '#322E3A',
    main: '#FFF',
  },
  light: {
    ...basic,
    background: '#FFF',
    statusBar: 'dark-content',
    innerBackgroud: '#F6F6F6',
    main: '#4A4850',
  },
};
