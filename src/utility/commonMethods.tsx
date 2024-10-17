/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import Snackbar from 'react-native-snackbar';
import {facilitiesCodes} from './enums/HotelFacilities';
import {HOTELSLIDES} from './staticData/staticData';

// snackbar library to show messages..
const showSnackBar = (text: string, bgColor: any) => {
  Snackbar.show({
    text: text,
    textColor: colors.color_fff,
    backgroundColor: bgColor,
    duration: Snackbar.LENGTH_LONG,
  });
};

// Method to for the null undefined values
const isNullUndefined = (value: any) => {
  if (
    value === false ||
    value === null ||
    value === undefined ||
    Object.keys(value).length < 0
  ) {
    return true;
  } else {
    return false;
  }
};

// Method to format the data and month
const dateFormatterMethod = (date: any, month: boolean) => {
  if (month) {
    return date >= 9 ? date + 1 : `0${date + 1}`;
  }
  return date > 9 ? date : `0${date}`;
};

// Method to format the year
const yearFormattedMethod = (year: any) => {
  return year.slice(-2);
};

// Method to show the flash messages
const flashMessage = (message: string, type: any) => {
  return showMessage({
    message: message,
    type: type,
    duration: 500,
  });
};

// Method to format the durations
const getDuration = (minutes: number) => {
  if (minutes) {
    const duration: any = moment.duration(minutes, 'minutes');
    const days = duration?._data?.days > 0 ? `${duration?._data?.days}d` : '';
    const hours =
      duration?._data?.hours > 0 ? `${duration?._data?.hours}h` : '';
    const mint =
      duration?._data?.minutes > 0 ? `${duration?._data?.minutes}m` : '';
    return `${days} ${hours} ${mint}`;
  }
  return minutes;
};

// Method to format the time format in AM or PM
const getTimeFormat = (time: string) => {
  if (time) {
    const hours = time.slice(0, 2);
    const minutes: any = time.slice(2, 4);
    if (minutes >= 59) {
      var min: any = minutes % 60;
      return moment(`${hours}:${min}`, 'HH:mm').format('hh:mm A');
    } else {
      return moment(`${hours}:${minutes}`, 'HH:mm').format('hh:mm A');
    }
  }
  return time;
};

// Method to get the airport details
const getAirportDetails = (airport: any) => {
  if (airport) {
    const name = airport.name;
    const cityName = airport.cityName;
    const countryName = airport.countryName;
    return `${name}, ${cityName}, ${countryName}`;
  }
  return airport;
};

// Method to get the month day format
const getMonthDayFormat = (date: string) => {
  if (date) {
    const day = parseInt(date.slice(0, 2), 10);
    const month = parseInt(date.slice(2, 4), 10);
    const year = parseInt(`20${date.slice(4, 6)}`, 10);
    const formattedDate = new Date(year, month - 1, day); // 2009-11-10
    const formattedMonth = formattedDate.toLocaleString('default', {
      month: 'short',
    });
    const formattedDay = formattedDate.toLocaleString('default', {
      weekday: 'short',
    });
    const updatedDate = day >= 10 ? day : `0${day}`;

    return `${formattedDay}, ${formattedMonth} ${updatedDate}`;
  }
  return date;
};

// To find the particular segment data..
const findSegments = (item: any, segments: any) => {
  const segmentId = item?.segments[0];
  const segmentData = segments?.flat();
  const findedSegment = segmentData?.find((el: any, index: number) => {
    if (index === segmentId) {
      return el;
    }
  });
  return findedSegment;
};

// To Find the round trip segments
const findRoundTripSegments = (segmentId: any, segment: any) => {
  const gotSegmentData = segment?.find((el: any, index: number) => {
    if (index === segmentId) {
      return el;
    }
  });
  return gotSegmentData;
};

// methods for Stops filter..
const isStop = (item: any) => {
  return item?.flights?.length - 1;
};

// Method to find flight operating carrier
const tripOperatingCarrier = (item?: any) => {
  return item?.map((el: any) => {
    return el?.operatingCarrier;
  });
};
// Method to find flight marketing carrier
const tripMarketingCarrier = (item?: any) => {
  return item?.map((el: any) => {
    return el?.marketingCarrier;
  });
};
// To find the particular carrier name..
const findCarrierName = (data?: any) => {
  const gotName = data?.map((el: any) => {
    return el?.name;
  });
  return gotName?.[0];
};

function sleep(seconds: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, seconds * 1000);
  });
}
//Method for hotel slider information
const findHotelInfo = (hotelDetailsResult: any, roomRatesResult: any) => {
  const getRoomData =
    hotelDetailsResult?.hotelAvailablity?.HotelDescriptiveContents
      ?.HotelDescriptiveContent;
  const hotelInoformation = roomRatesResult?.hotelsData?.hotels[0];
  const hotelImages =
    hotelInoformation?.BasicPropertyInfo?.VendorMessages?.VendorMessage
      ?.SubSection?.Paragraph;

  const hotelImageSlide = hotelImages?.slice(2, hotelImages.length);
  const hotelImageFiltered = hotelImageSlide?.filter((obj: any) =>
    obj.URL?.endsWith('J.JPEG'),
  );

  const hotelRoomsInoformation = roomRatesResult?.hotelsData?.rooms;
  const hotelRoomEndPriceIndex = hotelRoomsInoformation?.length - 1;
  const roomEndPrice = hotelRoomsInoformation[hotelRoomEndPriceIndex];
  const hotelImagesSlider =
    hotelImageFiltered?.length > 0 ? hotelImageFiltered : HOTELSLIDES;

  const HotelServicesCodeArray =
    hotelInoformation?.BasicPropertyInfo?.HotelAmenity;

  const hotelServicedata: any = Array.isArray(HotelServicesCodeArray)
    ? HotelServicesCodeArray?.map(
        (data: any) => facilitiesCodes[data?._Code - 1],
      )
    : facilitiesCodes[HotelServicesCodeArray?._code - 1];

  const hotelFilteredData: any = hotelServicedata?.filter(
    (data: any) => data !== undefined,
  );
  return {
    getRoomData,
    hotelImages,
    hotelInoformation,
    roomEndPrice,
    hotelImagesSlider,
    hotelRoomsInoformation,
    hotelFilteredData,
  };
};

export default {
  showSnackBar,
  dateFormatterMethod,
  yearFormattedMethod,
  flashMessage,
  getDuration,
  getTimeFormat,
  getAirportDetails,
  getMonthDayFormat,
  isNullUndefined,
  findSegments,
  findRoundTripSegments,
  isStop,
  tripOperatingCarrier,
  tripMarketingCarrier,
  findCarrierName,
  sleep,
  findHotelInfo,
};
