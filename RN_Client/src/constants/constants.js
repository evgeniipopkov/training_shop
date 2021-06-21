import { Dimensions, Appearance } from 'react-native';
import appPackage from '../../package.json';

const fontMainRegular = 'Roboto-Regular';
const fontMainMedium = 'Roboto-Medium';
const fontMainBold = 'Roboto-Bold';

const { width, height } = Dimensions.get('window');
const isDarkMode = Appearance.getColorScheme() === 'dark';
const appVersion = appPackage.version;
const appName = appPackage.name;

const types = {
  typeСlothes: {
    ALL_CLOTHES: 'ALL_CLOTHES',
    DRESS_CLOTHES: 'DRESS_CLOTHES',
    SHOES_CLOTHES: 'SHOES_CLOTHES',
    HOODY_CLOTHES: 'HOODY_CLOTHES',
    DRESS_CLOTHES_1C: 'Платье',
    SHOES_CLOTHES_1C: 'Обувь',
    HOODY_CLOTHES_1C: 'Толстовка',
  },
};

export default {
  fontMainRegular,
  fontMainMedium,
  fontMainBold,
  width,
  height,
  types,
  appVersion,
  appName,
  isDarkMode,
};
