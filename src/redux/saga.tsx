/* eslint-disable prettier/prettier */
import {call, put, takeLatest} from 'redux-saga/effects';
import baseModels from '@src/models/baseModels';
import {
  locationsFailure,
  locationsSuccess,
} from '@src/screens/flight/slice/flightSlice';
import {
  signUpFailure,
  signUpSuccess,
} from '@src/screens/signUp/slice/signUpSlice';
import {loginFailure, loginSuccess} from '@src/screens/login/slice/loginSlice';
import {
  oneWayFailure,
  oneWaySuccess,
} from '@src/screens/flight/slice/oneWayFlightSlice';
import {
  roundTripFailure,
  roundTripSuccess,
} from '@src/screens/flight/slice/roundTripFlightSlice';
import {
  checkoutSuccess,
  checkoutFailure,
} from '@src/screens/checkOut/slice/checkoutSlice';
import {
  seatMapFailure,
  seatMapSuccess,
} from '@src/screens/checkOut/slice/seatMapSlice';
import commonMethods from '@src/utility/commonMethods';
import {
  hotelsFailure,
  hotelsSuccess,
} from '@src/screens/hotel/slice/hotelSlice';
import {
  submitFailure,
  submitSuccessful,
} from '@src/screens/payment/slice/submitSlice';
import {
  nationalityFailure,
  nationalitySuccess,
} from './appSlice/nationalitySlice';
import {
  roomRatesFailure,
  roomRatesSuccess,
} from '@src/screens/hotelList/slice/hotelListSlice';
import {
  hotelDetailsFailure,
  hotelDetailsSuccess,
} from '@src/screens/hotelList/slice/hotelDetailsSlice';
import {
  roomReserveFailure,
  roomReserveSuccess,
} from '@src/screens/hotelRating/slice/hotelRoomReserveSlice';
import {
  hotelPaymentFailure,
  hotelPaymentSuccessful,
} from '@src/screens/hotelPayment/slice/hotelPaymentSlice';

// Login..
function* getProfileSaga(item: any): any {
  const result = yield call(() =>
    baseModels.getProfileMethodCall(item.payload),
  );
  if (result.status) {
    yield put(loginSuccess(result.data));
  } else {
    yield put(loginFailure(result.data));
  }
}

// Sign-up..
function* createProfileSaga(item: any): any {
  const result = yield call(() =>
    baseModels.createProfileMethodCall(item.payload),
  );
  if (result.status) {
    yield put(signUpSuccess(result.data));
  } else {
    yield put(signUpFailure(result.data));
  }
}

// Locations..
function* fetchLocationsSaga(item: any): any {
  const result = yield call(() =>
    baseModels.getLocationsMethodCall(item.payload),
  );

  if (result.status) {
    yield put(locationsSuccess(result.data));
  } else {
    yield put(locationsFailure(result.data));
  }
}

// oneway flight search..
function* searchOneWayFlightSaga(item: any): any {
  const result = yield call(() => baseModels.searchFlight(item.payload));
  if (result.status) {
    yield put(oneWaySuccess(result.data));
  } else {
    yield put(oneWayFailure(result.data));
  }
}

// round Trip flight search..
function* searchRoundTripFlightSaga(item: any): any {
  const result = yield call(() => baseModels.searchFlight(item.payload));
  if (result.status) {
    yield put(roundTripSuccess(result.data));
  } else {
    yield put(roundTripFailure(result.data));
  }
}

// one way checkout ..
function* checkoutSaga(item: any): any {
  const result = yield call(() =>
    baseModels.getCheckoutMethodCall(item.payload),
  );
  if (result.status) {
    yield put(checkoutSuccess(result.data));
  } else {
    yield put(checkoutFailure(result.data));
  }
}

// seat map saga
function* seatMapSaga(item: any): any {
  const {payload} = item;
  const result = yield call(() => baseModels.getSeatMapCall(payload.result));
  yield call(() => commonMethods.sleep(0.5));
  if (result.status) {
    yield put(
      seatMapSuccess({
        result: result.data,
        key: payload.key,
      }),
    );
  } else {
    yield put(seatMapFailure(result.data));
  }
}

// Submit saga..
function* submitSaga(item: any): any {
  const result = yield call(() => baseModels.submitMethodCall(item.payload));
  if (result.status) {
    yield put(submitSuccessful(result.data));
  } else {
    yield put(submitFailure(result.data));
  }
}

// Hotel search..
function* hotelSearchSaga(item: any): any {
  const result = yield call(() =>
    baseModels.getHotelSearchMethodCall(item.payload),
  );
  if (result.status) {
    yield put(hotelsSuccess(result.data));
  } else {
    yield put(hotelsFailure(result.data));
  }
}

// nationality..
function* fetchNationalitySaga(item: any): any {
  const result = yield call(() =>
    baseModels.getNationalityMethodCall(item.payload),
  );
  if (result.status) {
    yield put(nationalitySuccess(result.data));
  } else {
    yield put(nationalityFailure(result.data));
  }
}

// Hotel room & Rates..
function* roomRatesSaga(item: any): any {
  const result = yield call(() =>
    baseModels.getroomRatesMethodCall(item.payload),
  );

  if (result.status) {
    yield put(roomRatesSuccess(result.data));
  } else {
    yield put(roomRatesFailure(result.data));
  }
}

// Hotel details..
function* hotelDetailsSaga(item: any): any {
  const result = yield call(() =>
    baseModels.gethotelDetailsMethodCall(item.payload),
  );

  if (result.status) {
    yield put(hotelDetailsSuccess(result.data));
  } else {
    yield put(hotelDetailsFailure(result.data));
  }
}

// Hotel room Reserve..
function* roomReserveSaga(item: any): any {
  const result = yield call(() =>
    baseModels.getRoomReserveMethodCall(item.payload),
  );

  if (result.status) {
    yield put(roomReserveSuccess(result.data));
  } else {
    yield put(roomReserveFailure(result.data));
  }
}

// Submit saga..
function* hotelPaymentSaga(item: any): any {
  const result = yield call(() =>
    baseModels.hotelPaymentMethodCall(item.payload),
  );
  if (result.status) {
    yield put(hotelPaymentSuccessful(result.data));
  } else {
    yield put(hotelPaymentFailure(result.data));
  }
}

// Root Saga Method
function* rootSaga() {
  yield takeLatest('locations/fetchLocations', fetchLocationsSaga);
  yield takeLatest('login/fetchLogin', getProfileSaga);
  yield takeLatest('signUp/fetchSignUp', createProfileSaga);
  yield takeLatest(
    'oneWayFlightSearch/fetchOneWayFlight',
    searchOneWayFlightSaga,
  );
  yield takeLatest(
    'roundTripFlightSearch/fetchRoundTripFlight',
    searchRoundTripFlightSaga,
  );
  yield takeLatest('checkout/fetchCheckout', checkoutSaga);
  yield takeLatest('seatmap/fetchSeatMap', seatMapSaga);
  yield takeLatest('hotels/fetchHotels', hotelSearchSaga);
  yield takeLatest('Submit/sendSubmit', submitSaga);
  yield takeLatest('Nationality/fetchNationality', fetchNationalitySaga);
  yield takeLatest('roomRates/fetchroomRates', roomRatesSaga);
  yield takeLatest('hotelDetails/fetchhotelDetails', hotelDetailsSaga);
  yield takeLatest('roomReserve/fetchroomReserve', roomReserveSaga);
  yield takeLatest('HotelPayment/sendhotelPayment', hotelPaymentSaga);
}

export default rootSaga;
