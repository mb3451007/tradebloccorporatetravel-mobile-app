/* eslint-disable prettier/prettier */
import {GET, POST} from '@utility/config/api';
import {Endpoints} from '@src/utility/endPoints';
import {BASE_URL} from '@env';

// Api Call Method
const getProfileMethodCall = (email: string) => {
  // signing
  return GET(`${Endpoints.getProfile}${email}`);
};

const createProfileMethodCall = (body: any) => {
  // sign up
  return POST(Endpoints.getProfile, body);
};

const getLocationsMethodCall = (params: any) => {
  console.log(
    `${BASE_URL}${Endpoints.flightData_endPont}term=${params.term}&locale=${params.locale}&location_types=${params.city}&location_types=${params.airport}&active_only=${params.activeOnly}&sort=${params.sort}`,
    '------------------Here-------------------',
  );
  let paramsTerm = params.term.toLowerCase();
  return GET(
    `${Endpoints.flightData_endPont}term=${paramsTerm}&locale=${params.locale}&location_types=${params.city}&location_types=${params.airport}&active_only=${params.activeOnly}&sort=${params.sort}`,
  );
};

const searchFlight = (body: any) => {
  return POST(Endpoints.searchFlight, body);
};

const getCheckoutMethodCall = (body: any) => {
  return POST(Endpoints.oneWayCheckout, body);
};

const getSeatMapCall = (body: any) => {
  return POST(Endpoints.seatMap, body);
};

const getHotelSearchMethodCall = (body: any) => {
  return POST(Endpoints.hotelSearch, body);
};

const submitMethodCall = (body: any) => {
  return POST(Endpoints.submit, body);
};

const getNationalityMethodCall = (params: any) => {
  return GET(
    `${Endpoints.flightData_endPont}term=${params.term}&locale=${params.locale}&location_types=${params.location_types}&active_only=${params.active_only}&sort=${params.sort}`,
  );
};
const getroomRatesMethodCall = (body: any) => {
  return POST(Endpoints.hotelSearch, body);
};

const gethotelDetailsMethodCall = (body: any) => {
  return POST(Endpoints.hotelDetails, body);
};

const getRoomReserveMethodCall = (body: any) => {
  return POST(Endpoints.roomReserve, body);
};
const hotelPaymentMethodCall = (body: any) => {
  return POST(Endpoints.hotelPaymentSubmit, body);
};

// const searchRoundTripFlightMethodCall = (body: any) => {
//   return POST(Endpoints.searchOneWayFlight, body);
// };

export default {
  getLocationsMethodCall,
  getProfileMethodCall,
  createProfileMethodCall,
  searchFlight,
  getCheckoutMethodCall,
  getSeatMapCall,
  getHotelSearchMethodCall,
  submitMethodCall,
  getNationalityMethodCall,
  getroomRatesMethodCall,
  gethotelDetailsMethodCall,
  getRoomReserveMethodCall,
  hotelPaymentMethodCall,
};
