/* eslint-disable prettier/prettier */
import appConstants from '@src/constants/appConstants';

export const filterStopsData = [
  {
    id: 1,
    data: appConstants.nonStop,
  },
  {
    id: 2,
    data: appConstants.direct,
  },
  {
    id: 3,
    data: appConstants.connecting,
  },
  {
    id: 4,
    data: appConstants.stop1,
  },
  {
    id: 5,
    data: appConstants.stop2,
  },
];
// Set up our slides
interface Slide {
  id: number;
  url: string;
  title: string;
}

export const SLIDES: Slide[] = [
  {
    id: 0,
    url: 'https://travelclubiq.com/assets/images/hotel-mock.PNG',
    title: 'Dahlia',
  },
];



export const HOTELSLIDES = [
  {
    id: 0,
    URL: 'https://travelclubiq.com/assets/images/hotel-mock.PNG',
  },
];


export const images = [
  'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
  'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
  'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
];


export const hotelButtonData = [
  {
    id: 1,
    title: appConstants.hotelSummary,
  },
  {
    id: 2,
    title: appConstants.hotelDetails,
  },
  {
    id: 3,
    title: appConstants.roomsRates,
  },
];
