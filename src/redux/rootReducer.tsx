/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import flightReducer from '@src/screens/flight/slice/flightSlice';
import oneWayFlightReducer from '@screens/flight/slice/oneWayFlightSlice';
import roundTripReducer from '@src/screens/flight/slice/roundTripFlightSlice';
import loginReducer from '@src/screens/login/slice/loginSlice';
import signUpReducer from '@src/screens/signUp/slice/signUpSlice';
import appReducer from './appSlice/appSlice';
import checkoutReducer from '../screens/checkOut/slice/checkoutSlice';
import {persistKeys} from '@src/constants/appConstants';
import seatMapReducer from '../screens/checkOut/slice/seatMapSlice';
import hotelSearchReducer from '../screens/hotel/slice/hotelSlice';
import submitReducer from '../screens/payment/slice/submitSlice';
import nationalityReducer from '../redux/appSlice/nationalitySlice';
import roomRatesReducer from '../screens/hotelList/slice/hotelListSlice';
import hotelDetailsReducer from '../screens/hotelList/slice/hotelDetailsSlice';
// import roomReserveReducer from '../screens/hotelRating/slice/hotelRoomReserveSlice';
import roomReserveReducer from '../screens/hotelRating/slice/hotelRoomReserveSlice';
import hotelPaymentReducer from '../screens/hotelPayment/slice/hotelPaymentSlice';
import awsReducer from '@screens/login/slice/awsLoginSlice';
// Reducers Config to persist and blacklist reducers
const flightPersistConfig = {
  key: persistKeys.flightState,
  storage: AsyncStorage,
  blacklist: ['locationsData', 'isLoading', 'err'],
};

const oneWayPersistConfig = {
  key: persistKeys.oneWayFlightState,
  storage: AsyncStorage,
  blacklist: ['searchedData', 'isLoading', 'err'],
};

const roundTripPersistConfig = {
  key: persistKeys.roundTripFlightState,
  storage: AsyncStorage,
  blacklist: ['searchedRoundTripData', 'isLoading', 'err'],
};

const appSlicePersistConfig = {
  key: persistKeys.appSliceState,
  storage: AsyncStorage,
  blacklist: ['selectedTab', 'selectedFilter'],
};

const checkoutPersistConfig = {
  key: persistKeys.checkoutState,
  storage: AsyncStorage,
  // blackList: ['searchedData', 'isLoading', 'err'],
};

const seatMapPersistConfig = {
  key: persistKeys.seatMapState,
  storage: AsyncStorage,
  blackList: ['response', 'isLoading', 'err'],
};

const submitPersistConfig = {
  key: persistKeys.submitState,
  storage: AsyncStorage,
  blackList: ['responce', 'isLoading', 'err'],
};

const hotelSearchPersistConfig = {
  key: persistKeys.hotelState,
  storage: AsyncStorage,
  blackList: ['hotelsData', 'isLoading', 'err'],
};

const nationalityPersistConfig = {
  key: persistKeys.nationalityState,
  storage: AsyncStorage,
  blackList: ['nationalityData', 'isLoading', 'err'],
};

const roomRatesPersistConfig = {
  key: persistKeys.roomRatesState,
  storage: AsyncStorage,
  blackList: ['roomRatesData', 'isLoading', 'err'],
};

const hotelDetailsPersistConfig = {
  key: persistKeys.hotelDetailsState,
  storage: AsyncStorage,
  blackList: ['hotelDetailsData', 'isLoading', 'err'],
};

const roomReservePersistConfig = {
  key: persistKeys.roomReserveState,
  storage: AsyncStorage,
  blackList: ['roomReserveData', 'isLoading', 'err'],
};
const hotelPaymentPersistConfig = {
  key: persistKeys.hotelPaymentState,
  storage: AsyncStorage,
  blackList: ['response', 'isLoading', 'err'],
};

const awsLoginPersistConfig = {
  key: persistKeys.awsLoginState,
  storage: AsyncStorage,
  blackList: ['awsResponse'],
};

// Combine Reducers and persisting
export default combineReducers({
  app: persistReducer(appSlicePersistConfig, appReducer),
  flight: persistReducer(flightPersistConfig, flightReducer),
  onewayFlightSearch: persistReducer(oneWayPersistConfig, oneWayFlightReducer),
  roundTripFlightSearch: persistReducer(
    roundTripPersistConfig,
    roundTripReducer,
  ),
  login: loginReducer,
  signUp: signUpReducer,
  checkout: persistReducer(checkoutPersistConfig, checkoutReducer),
  seatMaps: persistReducer(seatMapPersistConfig, seatMapReducer),
  hotelSearch: persistReducer(hotelSearchPersistConfig, hotelSearchReducer),
  submit: persistReducer(submitPersistConfig, submitReducer),
  nationality: persistReducer(nationalityPersistConfig, nationalityReducer),
  roomRatesData: persistReducer(roomRatesPersistConfig, roomRatesReducer),
  hotelDetailsData: persistReducer(
    hotelDetailsPersistConfig,
    hotelDetailsReducer,
  ),
  roomReserveData: persistReducer(roomReservePersistConfig, roomReserveReducer),
  hotelPayment: persistReducer(hotelPaymentPersistConfig, hotelPaymentReducer),
  awsLogin: persistReducer(awsLoginPersistConfig, awsReducer),
});
