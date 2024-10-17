/* eslint-disable prettier/prettier */
import {Icons} from '@src/assets';
import appConstants from '@src/constants/appConstants';

// Static Enums Data.
export const buttons = [
  {
    id: 1,
    title: appConstants.cheapest,
  },
  {
    id: 2,
    title: appConstants.quickest,
  },
];

export const cabinClass = [
  {
    id: 1,
    class: appConstants.byPriceLowest,
    cabin: '',
  },
  {
    id: 2,
    class: appConstants.first,
    cabin: 'F',
  },
  {
    id: 3,
    class: appConstants.business,
    cabin: 'C',
  },
  {
    id: 4,
    class: appConstants.ecoPremAndPrem,
    cabin: 'Y',
  },
  {
    id: 5,
    class: appConstants.ecoPremium,
    cabin: 'W',
  },
  {
    id: 6,
    class: appConstants.economy,
    cabin: 'M',
  },
];

export const mealPlanEnum = [
  {
    id: 1,
    value: 'Breakfast',
    code: '3',
  },
  {
    id: 2,
    value: 'Half Board',
    code: '12',
  },
  {
    id: 3,
    value: 'Full Board',
    code: '10',
  },
  {
    id: 4,
    value: 'All Inclusive',
    code: '1',
  },
  {
    id: 5,
    value: 'Room Only',
    code: '14',
  },
];

export const hotelCategoryEnum = [
  {
    key: 1,
    value: 'First Class',
    open: false,
    code: '7',
  },
  {
    key: 2,
    value: 'Luxury',
    open: false,
    code: '8',
  },
  {
    key: 3,
    value: 'Tourist Area',
    open: false,
    code: '13',
  },
  {
    key: 4,
    value: 'Standard Class',
    open: false,
    code: '16',
  },
];

export const byAreaEnum = [
  {
    key: 1,
    value: 'North',
    open: false,
    code: '9',
  },
  {
    key: 2,
    value: 'South',
    open: false,
    code: '12',
  },
  {
    key: 3,
    value: 'East',
    open: false,
    code: '5',
  },
  {
    key: 4,
    value: 'West',
    open: false,
    code: '14',
  },
  {
    key: 5,
    value: 'Airport',
    open: false,
    code: '1',
  },
  {
    key: 6,
    value: 'Downtown',
    open: false,
    code: '4',
  },
  {
    key: 7,
    value: 'Resort',
    open: false,
    code: '10',
  },
];

export const facilitiesEnum = [
  {
    key: 1,
    value: 'AC',
    open: false,
    code: 2,
  },
  {
    key: 2,
    value: 'WIFI',
    open: false,
    code: 123,
  },
  {
    key: 3,
    value: 'Family Room',
    open: false,
    code: 185,
  },
  {
    key: 4,
    value: 'Pets Friendly',
    open: false,
    code: 140,
  },
  {
    key: 5,
    value: 'Free Newspaper',
    open: false,
    code: 205,
  },
  {
    key: 6,
    value: 'Smoking',
    open: false,
    code: 101,
  },
  {
    key: 7,
    value: 'Non-Smoking',
    open: false,
    code: 74,
  },
  {
    key: 8,
    value: 'Computer',
    open: false,
    code: 21,
  },
  {
    key: 9,
    value: 'Work Area',
    open: false,
    code: 65,
  },
];

export const CardCode = [
  {
    _CardCode: 'VI',
    _CardName: 'Credit card',
  },
  {
    _CardCode: 'DC',
    _CardName: 'Visa',
  },
  {
    _CardCode: 'DS',
    _CardName: 'Diners Club',
  },
  {
    _CardCode: 'AX',
    _CardName: 'American Express',
  },
  {
    _CardCode: 'JC',
    _CardName: 'JCB',
  },
  {
    _CardCode: 'MC',
    _CardName: 'MasterCard ',
  },
];

export const room_types: any = {
  H: 'ACCESSIBLE',
  I: 'BUDGET',
  B: 'BUSINESS',
  G: 'COMFORT',
  D: 'DELUXE',
  X: 'DUPLEX',
  E: 'EXECUTIVE',
  C: 'EXECUTIVE SUITE',
  F: 'FAMILY',
  S: 'JUNIOR SUITE',
  P: 'PENTHOUSE',
  R: 'RESIDENTIAL APARTMENT',
  M: 'STANDARD',
  L: 'STUDIO',
  A: 'SUPERIOR',
  V: 'VILLA',
};

export const bed_types: any = {
  K: 'KING',
  Q: 'QUEEN',
  D: 'DOUBLE',
  P: 'SOFA',
  S: 'SINGLE',
  T: 'TWIN',
  W: 'WATERBED',
};

export const typeOfRooms = [
  'classic',
  'standard',
  'budget',
  'deluxe',
  'penthouse',
  'superiror',
  'villa',
  'studio',
  'executive',
  'duplex',
  'residential',
  'business',
  'comfort',
  'junior',
  'accessible',
  'double',
  'single',
  'suite',
  'room',
];

export const bedTypeCode: any = {
  1: 'Double',
  2: 'Futon',
  3: 'King',
  4: 'Murphy bed',
  5: 'Queen',
  6: 'Sofa bed',
  7: 'Tatami mats',
  8: 'Twin',
  9: 'Single',
  10: 'Full',
  11: 'Run of the house',
  12: 'Dorm bed',
  13: 'Water bed',
};

export const genderText = [
  {
    id: 'F',
    option: 'Female',
  },
  {
    id: 'M',
    option: 'Male',
  },
];

export const travelBookingsText = [
  {
    bookingName: appConstants.flights,
    img: Icons.travelPlane,
  },
  {
    bookingName: appConstants.stays,
    img: Icons.travelHotel,
  },
  {
    bookingName: appConstants.cars,
    img: Icons.travelCar,
  },
];
