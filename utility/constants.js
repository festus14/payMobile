import { Dimensions, StatusBar } from 'react-native'

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 28

export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('screen').height

export const API_URL = "https://portal.ipaysuite.com/api/v1/"