/* eslint-disable prettier/prettier */
import {Images} from '@src/assets';
import appConstants from '@src/constants/appConstants';

//custom data for selecting different id..
export default [
  {
    id: 1,
    title: appConstants.flights,
    image: Images.APP_FLIGHT,
  },
  {
    id: 2,
    title: appConstants.hotels,
    image: Images.APP_HOTELS,
  },
  {
    id: 3,
    title: appConstants.cars,
    image: Images.APP_CAR,
  },
];
