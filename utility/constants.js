import { Dimensions, StatusBar } from 'react-native';

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 28;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const API_URL = 'https://portal.ipaysuite.com/api/v1/';
export const PHOTO_URL =
  'https://portal.ipaysuite.com/company/profile_picture/';
export const COMPANY_PHOTO_URL = 'https://portal.ipaysuite.com/company/';

export const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
export const mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);
