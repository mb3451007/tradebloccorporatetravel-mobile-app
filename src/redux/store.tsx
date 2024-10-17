/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from './saga';
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'app',
    'flight',
    'onewayFlightSearch',
    'roundTripFlightSearch',
    'seatMaps',
    'hotelSearch',
    'submit',
    'roomRatesData',
    'hotelDetailsData',
    'roomReserveData',
    'hotelPayment',
    'awsLogin',
  ],
};

// Persisting reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Getting middleware including logger in development mode
const getMiddleware = () => {
  if (__DEV__) {
    return [sagaMiddleware, logger];
  } else {
    return [sagaMiddleware];
  }
};

// mount it on the Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getMiddleware(),
});

let persistor = persistStore(store);

export {store, persistor};

// then run the saga
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
