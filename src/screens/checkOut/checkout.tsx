/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {Icons, Images} from '@src/assets';
import colors from '@src/constants/colors';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  ActivityIndicator,
  AppState,
} from 'react-native';
import styles from './styles';
import CustomHeader from '@src/components/customHeader/customHeader';
import appConstants, {
  carriersURL,
  flagURL,
  statusCode,
  validations,
} from '@src/constants/appConstants';
import commonStyles from '@src/utility/commonStyles';
import commonMethods from '@src/utility/commonMethods';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '@src/components/customButton/customButton';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import {CountryPicker} from 'react-native-country-codes-picker';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import regex from '@src/utility/regex';
import {clearCheckout} from './slice/checkoutSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {back, navigate} from '@src/navigation/navigationMethods';
import CustomModal from '@src/components/customModal/customModal';
import {fetchSeatMap, seatMapResponseMapping} from './slice/seatMapSlice';
import navigationConstants from '@src/constants/navigationConstants';
import SeatMap from '@src/components/seatmap/seatmap';
import FlightBottomPriceBar from '@src/components/flightBottomPriceBar/flightBottomPriceBar';
import {clearSubmit} from '../payment/slice/submitSlice';
import {
  clearNationality,
  fetchNationality,
} from '@src/redux/appSlice/nationalitySlice';
import NationalityDropDown from '@src/components/nationalityDropDown/nationalityDropDown';
import CustomLoader from '@src/components/customLoader/customLoader';

// Global object for the input fields
const obj = {
  firstName: '',
  lastName: '',
  dob: '',
  nationality: '',
  passportNum: '',
  passportExp: '',
  phone: '',
  email: '',
  countryCode: '+1',
  countryFlag: '',
  open: false,
  gender: '',
  seatMap: false,
  dobCalendarOpen: false,
  passExpCalendarOpen: false,
  nationalityPicker: false,
  nationFlag: '',
  openAdult: true,
  openChild: false,
  openInfant: false,
  genderErrMsg: ' ',
  firstNameErrMsg: ' ',
  lastNameErrMsg: ' ',
  dobErrMsg: ' ',
  countryCodeErrMsg: '',
  nationalityErrMsg: ' ',
  passportNumErrMsg: '',
  passportExpErrMsg: '',
  phoneErrMsg: ' ',
  emailErrMsg: ' ',
  nationFlagErrMsg: ' ',
};

const CheckOut = () => {
  const dispatch = useDispatch();
  const checkoutScreenData = useSelector(
    (state: RootState) => state?.app?.checkoutData,
  );

  // fetching Navigation data from last screen.
  const navigation = useNavigation();
  // const tripNum = props?.route?.params?.trip;
  const tripNum = checkoutScreenData?.trip;
  const indexs = checkoutScreenData?.index;
  // const oneWayData = props?.route?.params?.oneWayData;
  const {
    oneWayData,
    segmentData,
    item,
    cabinClass,
    adultCount,
    childCount,
    infantCount,
    particularSegmentData,
    setIsTicketSelected,
    particularIndex,
    selectedFlight,
    roundTripFlightData,
    setIsTicketSelectorModal,
  } = checkoutScreenData;
  const {locations} = oneWayData?.data
    ? oneWayData?.data
    : roundTripFlightData?.data;

  // State of component
  const [heightInc, setHeightInc] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [totalAdults, setTotalAdults] = useState<any>([]);
  const [totalChildrens, setTotalChildren] = useState<any>([]);
  const [totalInfants, setTotalInfants] = useState<any>([]);
  const [sessionOutTimer, setSessionOutTimer] = useState<any>(840);
  const [seatmap, setSeatmap] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [noAvailableSeatMap, setNoAvailableSeatMap] = useState<any>(false);
  const [selectedSeats, setSelectedSeats] = useState<any>([]);
  const clubAccess = 7.95;
  const maxDate = new Date();
  // One Way Seatmap state data..
  const [seatCurrentIndex, setSeatCurrentIndex] = useState(0);
  const [seatCabinDetails, setSeatCabinDetails] = useState<any>([]);
  const [seatRowDetails, setSeatRowDetails] = useState<any>([]);
  const [rowCharacterSticks, setRowCharacterSticks] = useState<any>();
  const [seatCharacteristics, setSeatCharacteristics] = useState<any>();
  const [seatRowNumber, setSeatRowNumber] = useState<any>();
  const [selectedSeatModal, setSelectedSeatModal] = useState<any>(false);
  const [flightIndex, setFlightIndex] = useState<any>();
  const [flightId, setFlightId] = useState<any>();
  const [isAlreadySelectedSeat, setIsAlreadySelectedSeat] =
    useState<any>(false);
  const [seatmapLoader, setSeatmapLoader] = useState<boolean>(false);
  const [seatDetailsModal, setSeatDetailsModal] = useState<any>(false);
  const [internationalFlight, setInternationalFlight] = useState<any>();
  // Round trip seat map state..

  const seatMapData = useSelector((state: RootState) => state?.seatMaps);
  const nationalityData: any = useSelector(
    (state: RootState) => state?.nationality?.nationalityData,
  );
  const nationalityLoader = useSelector(
    (state: RootState) => state?.nationality?.isLoading,
  );
  const [nationalityLoading, setNationalityLoading] = useState(false);

  useEffect(() => {
    setNationalityLoading(nationalityLoader);
  }, [nationalityLoader]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (segmentData !== undefined) {
        setIsTicketSelectorModal(false);
      } else {
        setIsTicketSelected(false);
      }
    });
    return unsubscribe;
  }, []);

  const getCountryCode = (code: any) => {
    if (oneWayData !== undefined) {
      const locData = locations?.[code];
      return locData?.countryCode;
    } else {
      const roundLocData = locations?.[code];
      return roundLocData?.countryCode;
    }
  };

  useEffect(() => {
    if (segmentData !== undefined) {
      const arrCountryCode = getCountryCode(segmentData?.arrival?.airportCode);
      const depCountryCode = getCountryCode(
        segmentData?.departure?.airportCode,
      );
      const data = {
        arrCountryCode,
        depCountryCode,
      };
      setInternationalFlight(data);
    } else {
      const arrCountryCode = getCountryCode(
        particularSegmentData?.firstTrip?.departure?.airportCode,
      );
      const depCountryCode = getCountryCode(
        particularSegmentData?.secondTrip?.departure?.airportCode,
      );
      const data = {
        arrCountryCode,
        depCountryCode,
      };
      setInternationalFlight(data);
    }
  }, []);

  // Background App timer
  useEffect(() => {
    let interval: any;

    if (
      AppState.currentState === appConstants.active &&
      sessionOutTimer !== 0
    ) {
      interval = setInterval(() => {
        setSessionOutTimer((prevSec: any) => prevSec - 1);
      }, 10000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [AppState.currentState === appConstants.active, sessionOutTimer !== 0]);

  useEffect(() => {
    setIsLoading(seatMapData?.isLoading);
  }, [seatMapData]);

  // Method to find the airport name.
  const getAirportName = useCallback(
    (airportCode: string) => {
      return locations?.[airportCode];
    },
    [locations],
  );

  // Common method to get the carrier name
  const carrierName = commonMethods.findCarrierName(segmentData?.airlines);

  // Common method to get the operating carrier name
  const operatingCarriers = commonMethods.tripOperatingCarrier(
    segmentData?.flights
      ? segmentData?.flights
      : particularSegmentData?.firstTrip?.flights,
  );

  // Common method to get the marketing carrier name
  const marketingCarriers = commonMethods.tripMarketingCarrier(
    segmentData?.flights
      ? segmentData?.flights
      : particularSegmentData?.firstTrip?.flights,
  );
  // Hook to hide the bottom tab bar
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: styles.tabBarStyle,
      });
  }, []);

  // Hook to know the keyboard is opened or not.
  useEffect(() => {
    const keyBoardOpen = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyBoardClosed = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyBoardOpen.remove();
      keyBoardClosed.remove();
    };
  }, []);

  // hoook for back press
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackHandlerPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackHandlerPress);
  }, []);

  // Hook to handle the methods of passengar counts
  useEffect(() => {
    setTotalAdults(handleAdultCount());
    setTotalChildren(handleChildCount());
    setTotalInfants(handleInfantCount());
  }, [adultCount, childCount, infantCount]);

  // method for back button
  const onBackHandlerPress = () => {
    back();
    dispatch(clearCheckout());
    if (item === undefined) {
      setIsTicketSelected(false);
    }
    return true;
  };

  const handleOnBackIconPress = () => {
    back();
    dispatch(clearCheckout());
    if (item === undefined) {
      setIsTicketSelected(false);
    }
  };

  // fetch the data of the one way checkout.
  const findedOneWayCheckoutData = useSelector(
    (state: RootState) =>
      state?.checkout?.searchedData?.data?.['soapenv:Envelope']?.[
        'soapenv:Body'
      ]?.Fare_InformativeBestPricingWithoutPNRReply?.mainGroup,
  );

  const getPassengerCount = () => {
    const totalPassenger = [];
    if (item !== undefined) {
      if (item?.stops) {
        for (let i = 0; i <= item?.stops; i++) {
          totalPassenger.push({
            stop: i,
            adultCount: adultCount,
            childCount: childCount,
            infantCount: infantCount,
            totalCount: adultCount + childCount + infantCount,
          });
        }
      } else {
        totalPassenger.push({
          stop: 0,
          adultCount: adultCount,
          childCount: childCount,
          infantCount: infantCount,
          totalCount: adultCount + childCount + infantCount,
        });
      }
    } else {
      const roundTripStops = selectedFlight?.flights.length - 1;
      if (roundTripStops > 1) {
        for (let i = 0; i <= roundTripStops; i++) {
          totalPassenger.push({
            stop: i,
            adultCount: adultCount,
            childCount: childCount,
            infantCount: infantCount,
            totalCount: adultCount + childCount + infantCount,
          });
        }
      } else {
        totalPassenger.push({
          stop: 0,
          adultCount: adultCount,
          childCount: childCount,
          infantCount: infantCount,
          totalCount: adultCount + childCount + infantCount,
        });
      }
    }

    return totalPassenger;
  };

  // Method to fetch all the comparable data from oneway checkout API
  const dataToCompare = findedOneWayCheckoutData?.pricingGroupLevelGroup;

  // All comparable data from onewaycheckout API
  const compareData = () => {
    if (Array.isArray(dataToCompare)) {
      const findedComparableData = dataToCompare?.map((el: any) => {
        const fareInfoGrp = el?.fareInfoGroup;
        var confirmedPrice = Array.isArray(
          fareInfoGrp?.fareAmount?.otherMonetaryDetails,
        )
          ? fareInfoGrp?.fareAmount?.otherMonetaryDetails?.[1]?.amount
          : fareInfoGrp?.fareAmount?.otherMonetaryDetails?.amount;

        const numPaxForPrice =
          el?.numberOfPax?.segmentControlDetails?.numberOfUnits;
        return {
          price: confirmedPrice * numPaxForPrice,
          numberOfPax: numPaxForPrice,
          ptcSegment: Array.isArray(fareInfoGrp?.segmentLevelGroup)
            ? fareInfoGrp?.segmentLevelGroup?.map(
                (an: any) => an?.ptcSegment?.quantityDetails?.unitQualifier,
              )
            : fareInfoGrp?.segmentLevelGroup?.ptcSegment?.quantityDetails
                ?.unitQualifier,
          flightIdnt: Array.isArray(fareInfoGrp?.segmentLevelGroup)
            ? fareInfoGrp?.segmentLevelGroup?.map(
                (it: any) => it?.segmentInformation?.flightIdentification,
              )
            : fareInfoGrp?.segmentLevelGroup?.segmentInformation
                ?.flightIdentification,
        };
      });
      return findedComparableData;
    } else {
      const numOfUnits =
        dataToCompare?.numberOfPax?.segmentControlDetails?.numberOfUnits;
      const findedObjectDataToCompare = {
        price: Array.isArray(
          dataToCompare?.fareInfoGroup?.fareAmount?.otherMonetaryDetails,
        )
          ? dataToCompare?.fareInfoGroup?.fareAmount?.otherMonetaryDetails?.[1]
              ?.amount * numOfUnits
          : dataToCompare?.fareInfoGroup?.fareAmount?.otherMonetaryDetails
              ?.amount * numOfUnits,
        ptcSegment: Array.isArray(
          dataToCompare?.fareInfoGroup?.segmentLevelGroup,
        )
          ? dataToCompare?.fareInfoGroup?.segmentLevelGroup.map(
              (an: any) => an?.ptcSegment?.quantityDetails?.unitQualifier,
            )
          : dataToCompare?.fareInfoGroup?.segmentLevelGroup?.ptcSegment
              ?.quantityDetails?.unitQualifier,
        numberOfPax:
          dataToCompare?.numberOfPax?.segmentControlDetails?.numberOfUnits,
        flightIdnt: Array.isArray(
          dataToCompare?.fareInfoGroup?.segmentLevelGroup,
        )
          ? dataToCompare?.fareInfoGroup?.segmentLevelGroup?.map(
              (it: any) => it?.segmentInformation?.flightIdentification,
            )
          : dataToCompare?.fareInfoGroup?.segmentLevelGroup?.segmentInformation
              ?.flightIdentification,
      };
      return findedObjectDataToCompare;
    }
  };
  const checkoutFetchedData: any = compareData();

  // Seat map end point
  useEffect(() => {
    const seatMapObj: any = {};
    segmentData
      ? segmentData?.flights.forEach((_el: any, index: number) => {
          seatMapObj[`${index}`] = {};
        })
      : selectedFlight?.flights.forEach((_el: any, index: number) => {
          seatMapObj[`${index}`] = {};
        });
    dispatch(seatMapResponseMapping(seatMapObj));
    const el = segmentData
      ? segmentData.flights?.[0]
      : selectedFlight?.flights?.[0];
    const dataToDispatch: any = {
      departure: {
        location: el?.departure?.airportCode,
        date: Number(el?.departure?.date),
      },
      arrival: {
        location: el?.arrival?.airportCode,
      },
      flightNumber: el?.flightOrtrainNumber,
      marketingCompany: el?.marketingCarrier,
      bookingClass: Array.isArray(checkoutFetchedData)
        ? checkoutFetchedData[0]?.flightIdnt[0]?.bookingClass
        : Array.isArray(checkoutFetchedData?.flightIdnt)
        ? checkoutFetchedData?.flightIdnt[0]?.bookingClass
        : checkoutFetchedData?.flightIdnt?.bookingClass,
    };
    dispatch(fetchSeatMap({result: dataToDispatch, key: 0}));
  }, []);

  const priceInArray: any =
    Array.isArray(checkoutFetchedData) &&
    checkoutFetchedData?.map((el: any) => el.price);

  // Method to open and close the passenger fields.
  const handlePassengerFields: any = (ind: any, id: any) => {
    if (id === appConstants.adult) {
      setTotalAdults(
        totalAdults.map((itm: any, index: any) => {
          if (index === ind) {
            return {
              ...itm,
              openAdult: !itm.openAdult,
            };
          } else {
            return itm;
          }
        }),
      );
    } else if (id === appConstants.child) {
      setTotalChildren(
        totalChildrens.map((itm: any, index: any) => {
          if (index === ind) {
            return {
              ...itm,
              openChild: !itm.openChild,
            };
          } else {
            return itm;
          }
        }),
      );
    } else {
      setTotalInfants(
        totalInfants.map((itm: any, index: any) => {
          if (index === ind) {
            return {
              ...itm,
              openInfant: !itm.openInfant,
            };
          } else {
            return itm;
          }
        }),
      );
    }
  };

  // Method to handle the total number of adult selected
  const handleAdultCount: any = () => {
    const adults = adultCount;
    const getAllAdults: any = [];
    if (Array.isArray(dataToCompare)) {
      const adultFareAmount = dataToCompare.map((el: any) => {
        if (
          Array.isArray(el?.fareInfoGroup?.fareAmount?.otherMonetaryDetails)
        ) {
          return el?.fareInfoGroup?.fareAmount?.otherMonetaryDetails?.[1]
            ?.amount;
        } else {
          return el?.fareInfoGroup?.fareAmount?.otherMonetaryDetails?.amount;
        }
      });

      for (let adt = 1; adt <= adults; adt++) {
        getAllAdults.push({
          price: adultFareAmount[0],
          id: adt,
          name: appConstants.adult,
          ...obj,
        });
      }
    } else {
      for (let adt = 1; adt <= adults; adt++) {
        getAllAdults.push({
          id: adt,
          price: Array.isArray(
            dataToCompare?.fareInfoGroup?.fareAmount?.otherMonetaryDetails,
          )
            ? dataToCompare?.fareInfoGroup?.fareAmount
                ?.otherMonetaryDetails?.[1]?.amount
            : dataToCompare?.fareInfoGroup?.fareAmount?.otherMonetaryDetails
                ?.amount,
          name: appConstants.adult,
          ...obj,
        });
      }
    }
    return getAllAdults;
  };

  // Method to handle the total child count.
  const handleChildCount: any = () => {
    const childs = childCount;
    const getAllChilds = [];
    if (Array.isArray(dataToCompare)) {
      const childFareAmount = dataToCompare?.map(
        (el: any) =>
          el?.fareInfoGroup?.fareAmount?.otherMonetaryDetails?.amount,
      );
      for (let chd = 1; chd <= childs; chd++) {
        getAllChilds.push({
          id: chd,
          price: childFareAmount[1],
          name: appConstants.child,
          ...obj,
        });
      }
    }
    return getAllChilds;
  };

  // Method to handle the total infants count.
  const handleInfantCount: any = () => {
    const infants = infantCount;
    const getAllInfants = [];
    if (Array.isArray(dataToCompare)) {
      const infantsFareAmount = dataToCompare?.map(
        (el: any) =>
          el?.fareInfoGroup?.fareAmount?.otherMonetaryDetails?.amount,
      );
      for (let inf = 1; inf <= infants; inf++) {
        getAllInfants.push({
          id: inf,
          price: infantsFareAmount[2],
          name: appConstants.infant,
          ...obj,
        });
      }
    }
    return getAllInfants;
  };

  // Method to set the values in object
  const setAdultFields: any = (
    text: string,
    index: number,
    constants: string,
    errMsg: string,
  ) => {
    return totalAdults.map((el: any, i: number) => {
      if (i === index && constants === appConstants.firstName) {
        return {
          ...el,
          firstName: text,
          firstNameErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.lastName) {
        return {
          ...el,
          lastName: text,
          lastNameErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.dob) {
        return {
          ...el,
          dob: text,
          // dob: `${text.substring(0,2)}/${text.substring(3,5)}/${text.substring(6)}`,
          dobCalendarOpen: false,
          dobErrMsg: errMsg,
          dobFormat: text,
        };
      } else if (i === index && constants === appConstants.nationality) {
        const params: any = {
          term: text,
          locale: appConstants.en_US,
          location_types: appConstants.countryAPI,
          active_only: false,
          sort: appConstants.nameAPI,
        };
        dispatch(fetchNationality(params));
        return {
          ...el,
          nationality: text,
          nationalityErrMsg: errMsg,
          nationalityPicker: true,
          nationFlag: '',
        };
      } else if (i === index && constants === appConstants.passNumber) {
        return {
          ...el,
          passportNum: text,
          passportNumErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.passExp) {
        return {
          ...el,
          passportExp: text,
          passExpCalendarOpen: false,
          passportExpErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.phone) {
        return {
          ...el,
          phone: text,
          phoneErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.email) {
        return {
          ...el,
          email: text,
          emailErrMsg: errMsg,
        };
      } else {
        return el;
      }
    });
  };

  // Method to set the child input fields.
  const setChildFields: any = (
    text: any,
    index: any,
    constants: any,
    errMsg: string,
  ) => {
    return totalChildrens.map((el: any, i: number) => {
      if (i === index && constants === appConstants.firstName) {
        return {
          ...el,
          firstName: text,
          firstNameErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.lastName) {
        return {
          ...el,
          lastName: text,
          lastNameErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.dob) {
        return {
          ...el,
          dob: text,
          dobCalendarOpen: false,
          dobErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.nationality) {
        const params: any = {
          term: text,
          locale: appConstants.en_US,
          location_types: appConstants.countryAPI,
          active_only: false,
          sort: appConstants.nameAPI,
        };
        dispatch(fetchNationality(params));
        return {
          ...el,
          nationality: text,
          nationalityErrMsg: errMsg,
          nationalityPicker: true,
          nationFlag: '',
        };
      } else if (i === index && constants === appConstants.passNumber) {
        return {
          ...el,
          passportNum: text,
          passportNumErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.passExp) {
        return {
          ...el,
          passportExp: text,
          passExpCalendarOpen: false,
          passportExpErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.phone) {
        return {
          ...el,
          phone: text,
          phoneErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.email) {
        return {
          ...el,
          email: text,
          emailErrMsg: errMsg,
        };
      } else {
        return el;
      }
    });
  };

  // Method to set the infants input fields.
  const setInfantsFields: any = (
    text: any,
    index: any,
    constants: any,
    errMsg: string,
  ) => {
    return totalInfants.map((el: any, i: number) => {
      if (i === index && constants === appConstants.firstName) {
        return {
          ...el,
          firstName: text,
          firstNameErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.lastName) {
        return {
          ...el,
          lastName: text,
          lastNameErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.dob) {
        return {
          ...el,
          dob: text,
          dobCalendarOpen: false,
          dobErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.nationality) {
        const params: any = {
          term: text,
          locale: appConstants.en_US,
          location_types: appConstants.countryAPI,
          active_only: false,
          sort: appConstants.nameAPI,
        };
        dispatch(fetchNationality(params));
        return {
          ...el,
          nationality: text,
          nationalityErrMsg: errMsg,
          nationalityPicker: true,
          nationFlag: '',
        };
      } else if (i === index && constants === appConstants.passNumber) {
        return {
          ...el,
          passportNum: text,
          passportNumErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.passExp) {
        return {
          ...el,
          passportExp: text,
          passExpCalendarOpen: false,
          passportExpErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.phone) {
        return {
          ...el,
          phone: text,
          phoneErrMsg: errMsg,
        };
      } else if (i === index && constants === appConstants.email) {
        return {
          ...el,
          email: text,
          emailErrMsg: errMsg,
        };
      } else {
        return el;
      }
    });
  };

  // Method to handle the gender of the adults
  const handleGender = (index: any, constants: any, id: any) => {
    if (id === appConstants.adult) {
      setTotalAdults(
        totalAdults.map((el: any, ind: any) => {
          if (ind === index && constants === appConstants.male) {
            return {
              ...el,
              gender: appConstants.male,
              genderErrMsg: '',
            };
          } else if (ind === index && constants === appConstants.female) {
            return {
              ...el,
              gender: appConstants.female,
              genderErrMsg: '',
            };
          } else {
            return el;
          }
        }),
      );
    } else if (id === appConstants.child) {
      setTotalChildren(
        totalChildrens.map((el: any, ind: any) => {
          if (ind === index && constants === appConstants.male) {
            return {
              ...el,
              gender: appConstants.male,
              genderErrMsg: '',
            };
          } else if (ind === index && constants === appConstants.female) {
            return {
              ...el,
              gender: appConstants.female,
              genderErrMsg: '',
            };
          } else {
            return el;
          }
        }),
      );
    } else {
      setTotalInfants(
        totalInfants.map((el: any, ind: any) => {
          if (ind === index && constants === appConstants.male) {
            return {
              ...el,
              gender: appConstants.male,
              genderErrMsg: '',
            };
          } else if (ind === index && constants === appConstants.female) {
            return {
              ...el,
              gender: appConstants.female,
              genderErrMsg: '',
            };
          } else {
            return el;
          }
        }),
      );
    }
  };

  // Method for first name.
  const handleFirstName = (
    text: any,
    index: number,
    constants: string,
    id: any,
  ) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.enterFirstName),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.enterFirstName),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.enterFirstName),
        );
      }
      return;
    } else if (text.length <= 1) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.tooShort),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.tooShort),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.tooShort),
        );
      }
      return;
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, index, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, index, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, index, constants, ''));
    }
  };

  // Method for last name
  const handleLastName = (text: any, ind: any, constants: string, id: any) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, ind, constants, validations.enterLastName),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, ind, constants, validations.enterLastName),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, ind, constants, validations.enterLastName),
        );
      }
      return;
    } else if (text.length <= 1) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, ind, constants, validations.tooShort),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, ind, constants, validations.tooShort),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, ind, constants, validations.tooShort),
        );
      }
      return;
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, ind, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, ind, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, ind, constants, ''));
    }
  };

  // Method to handle the manually input data of birth
  const handleDateOfBirth = (
    text: any,
    ind: any,
    constants: string,
    id: any,
  ) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, ind, constants, validations.selectDate),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, ind, constants, validations.selectDate),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, ind, constants, validations.selectDate),
        );
      }
      return;
    } else if (text.length < 10) {
      if (text.length > 10) {
        text = text.substring(0, 10);
      }
      switch (text.length) {
        case 1:
          if (text > 3) {
            text = '3';
          }
          break;
        case 2:
          if (text > 12) {
            text = '12';
          }
          break;
        case 3:
        case 4:
          if (text[2] !== '/') {
            text = text.substr(0, 2) + '/' + text[2];
          }
          if (text[3] > 3) {
            text = text.substr(0, 3) + '3';
          }
          break;
        case 5:
          if (text.substr(3, 2) > 31) {
            text = text.substr(0, 3) + '31';
          }
          break;
        case 6:
        case 7:
          if (text[5] !== '/') {
            text = text.substr(0, 5) + '/' + text[5];
          }
          if (text[6] < 1) {
            text = text.substr(0, 6) + '1';
          }
          break;
        default:
          break;
      }
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      }
    } else if (!regex.dateFormatRegex.test(text)) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      }
      return;
    } else if (!moment(text, 'MM/DD/YYYY').isBefore(moment())) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      }
      return;
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, ind, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, ind, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, ind, constants, ''));
    }
  };

  // Method to open the calendar
  const handleCalendarOpen = (ind: any, constants: any, id: any) => {
    if (id === appConstants.adult) {
      setTotalAdults(
        totalAdults.map((el: any, i: any) => {
          if (i === ind && constants === appConstants.dob) {
            return {
              ...el,
              dobCalendarOpen: !totalAdults[i].dobCalendarOpen,
              passExpCalendarOpen: false,
            };
          } else if (i === ind && constants === appConstants.passExp) {
            return {
              ...el,
              passExpCalendarOpen: !totalAdults[i]?.passExpCalendarOpen,
              dobCalendarOpen: false,
            };
          } else {
            return el;
          }
        }),
      );
    } else if (id === appConstants.child) {
      setTotalChildren(
        totalChildrens.map((el: any, i: any) => {
          if (i === ind && constants === appConstants.dob) {
            return {
              ...el,
              dobCalendarOpen: !totalChildrens[i].dobCalendarOpen,
              passExpCalendarOpen: false,
            };
          } else if (i === ind && constants === appConstants.passExp) {
            return {
              ...el,
              passExpCalendarOpen: !totalChildrens[i].passExpCalendarOpen,
              dobCalendarOpen: false,
            };
          } else {
            return el;
          }
        }),
      );
    } else {
      setTotalInfants(
        totalInfants.map((el: any, i: any) => {
          if (i === ind && constants === appConstants.dob) {
            return {
              ...el,
              dobCalendarOpen: !totalInfants[i].dobCalendarOpen,
              passExpCalendarOpen: false,
            };
          } else if (i === ind && constants === appConstants.passExp) {
            return {
              ...el,
              passExpCalendarOpen: !totalInfants[i].passExpCalendarOpen,
              dobCalendarOpen: false,
            };
          } else {
            return el;
          }
        }),
      );
    }
  };

  // To select the date from the calendar.
  const handleCalendarPicker = (
    text: any,
    index: any,
    constants: any,
    id: any,
  ) => {
    if (constants === appConstants.dob) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            moment(text).format(appConstants.MMDDYYY),
            index,
            constants,
            '',
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            moment(text).format(appConstants.MMDDYYY),
            index,
            constants,
            '',
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            moment(text).format(appConstants.MMDDYYY),
            index,
            constants,
            '',
          ),
        );
      }
    } else {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            moment(text).format(appConstants.MMDDYYY),
            index,
            constants,
            '',
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            moment(text).format(appConstants.MMDDYYY),
            index,
            constants,
            '',
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            moment(text).format(appConstants.MMDDYYY),
            index,
            constants,
            '',
          ),
        );
      }
    }
  };

  // Method to handle the nationality.
  const handleNationality = (
    text: any,
    ind: any,
    constants: string,
    id: any,
  ) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, ind, constants, validations.enterNationality),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, ind, constants, validations.enterNationality),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, ind, constants, validations.enterNationality),
        );
      }
      return;
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, ind, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, ind, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, ind, constants, ''));
    }
  };

  const handleOpenNationalityPick = (it: any, ind: any, id: any) => {
    if (id === appConstants.adult) {
      setTotalAdults(
        totalAdults.map((el: any, index: any) => {
          if (index === ind) {
            return {
              ...el,
              nationalityPicker: false,
              nationality: it?.name,
              nationalityErrMsg: '',
              nationFlag: it?.code,
            };
          } else {
            return el;
          }
        }),
      );
    } else if (id === appConstants.child) {
      setTotalChildren(
        totalChildrens.map((el: any, index: any) => {
          if (index === ind) {
            return {
              ...el,
              nationalityPicker: false,
              nationality: it?.name,
              nationalityErrMsg: '',
              nationFlag: it?.code,
            };
          } else {
            return el;
          }
        }),
      );
    } else {
      setTotalInfants(
        totalInfants.map((el: any, index: any) => {
          if (index === ind) {
            return {
              ...el,
              nationalityPicker: false,
              nationality: it?.name,
              nationalityErrMsg: '',
              nationFlag: it?.code,
            };
          } else {
            return el;
          }
        }),
      );
    }
  };

  // // Method to open the nationality picker.
  // const handleOpenNationalityPicker = (ind: any, id: any) => {
  //   if (id === appConstants.adult) {
  //     setTotalAdults(
  //       totalAdults.map((el: any, index: any) => {
  //         if (index === ind) {
  //           return {
  //             ...el,
  //             nationalityPicker: true,
  //           };
  //         } else {
  //           return el;
  //         }
  //       }),
  //     );
  //   } else if (id === appConstants.child) {
  //     setTotalChildren(
  //       totalChildrens.map((el: any, index: any) => {
  //         if (index === ind) {
  //           return {
  //             ...el,
  //             nationalityPicker: true,
  //           };
  //         } else {
  //           return el;
  //         }
  //       }),
  //     );
  //   } else {
  //     setTotalInfants(
  //       totalInfants.map((el: any, index: any) => {
  //         if (index === ind) {
  //           return {
  //             ...el,
  //             nationalityPicker: true,
  //           };
  //         } else {
  //           return el;
  //         }
  //       }),
  //     );
  //   }
  // };

  // Method to select the nationality.
  // const handleCountryPicker = (it: any, index: any, id: any) => {
  //   if (id === appConstants.adult) {
  //     setTotalAdults(
  //       totalAdults.map((el: any, ind: any) => {
  //         if (ind === index) {
  //           return {
  //             ...el,
  //             nationality: it.name.en,
  //             nationFlag: it.flag,
  //             nationalityPicker: false,
  //             nationalityErrMsg: '',
  //           };
  //         } else {
  //           return el;
  //         }
  //       }),
  //     );
  //   } else if (id === appConstants.child) {
  //     setTotalChildren(
  //       totalChildrens.map((el: any, ind: any) => {
  //         if (ind === index) {
  //           return {
  //             ...el,
  //             nationality: it.name.en,
  //             nationFlag: it.flag,
  //             nationalityPicker: false,
  //             nationalityErrMsg: '',
  //           };
  //         } else {
  //           return el;
  //         }
  //       }),
  //     );
  //   } else {
  //     setTotalInfants(
  //       totalInfants.map((el: any, ind: any) => {
  //         if (ind === index) {
  //           return {
  //             ...el,
  //             nationality: it.name.en,
  //             nationFlag: it.flag,
  //             nationalityPicker: false,
  //             nationalityErrMsg: '',
  //           };
  //         } else {
  //           return el;
  //         }
  //       }),
  //     );
  //   }
  // };

  // To handle the passport number
  const handlePassportNumber = (
    text: any,
    index: any,
    constants: any,
    id: any,
  ) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.enterPassNumber),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.enterPassNumber),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.enterPassNumber),
        );
      }
      return;
    } else if (text.length <= 2) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.tooShort),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.tooShort),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.tooShort),
        );
      }
      return;
    } else if (!regex.passportRegex.test(text)) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            index,
            constants,
            validations.enterValidPassportNumber,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            index,
            constants,
            validations.enterValidPassportNumber,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            index,
            constants,
            validations.enterValidPassportNumber,
          ),
        );
      }
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, index, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, index, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, index, constants, ''));
    }
  };

  // Method to handle the passport expiration
  const handlePassportExpiration = (
    text: any,
    ind: any,
    constants: string,
    id: any,
  ) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, ind, constants, validations.enterPassExpiry),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, ind, constants, validations.enterPassExpiry),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, ind, constants, validations.enterPassExpiry),
        );
      }
      return;
    } else if (text.length > 2 && text.charAt(2) !== '/') {
      text = text.slice(0, 2) + '/' + text.slice(2);
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      }
    } else if (text.length > 5 && text.charAt(5) !== '/') {
      text = text.slice(0, 5) + '/' + text.slice(5);
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      }
    } else if (!regex.dateFormatRegex.test(text)) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      } else {
        setTotalInfants(
          setInfantsFields(
            text,
            ind,
            constants,
            validations.enterValidDateFormat,
          ),
        );
      }
      return;
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, ind, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, ind, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, ind, constants, ''));
    }
  };

  // To select the phone number
  const handlePhoneNumber = (
    text: any,
    index: any,
    constants: any,
    id: any,
  ) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.enterPhone),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.enterPhone),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.enterPhone),
        );
      }
      return;
    }
    if (!regex.phoneRegex.test(text)) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.enterValidPhone),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.enterValidPhone),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.enterValidPhone),
        );
      }
      return;
    }
    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, index, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, index, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, index, constants, ''));
    }
  };

  // Method to open the country code picker modal
  const openCodePicker = (i: number, id: any) => {
    if (id === appConstants.adult) {
      setTotalAdults(
        totalAdults.map((el: any, ind: any) => {
          if (ind === i) {
            return {
              ...el,
              open: true,
            };
          } else {
            return el;
          }
        }),
      );
    } else if (id === appConstants.child) {
      setTotalChildren(
        totalChildrens.map((el: any, ind: any) => {
          if (ind === i) {
            return {
              ...el,
              open: true,
            };
          } else {
            return el;
          }
        }),
      );
    } else {
      setTotalInfants(
        totalInfants.map((el: any, ind: any) => {
          if (ind === i) {
            return {
              ...el,
              open: true,
            };
          } else {
            return el;
          }
        }),
      );
    }
  };

  // Method to set the values in country code picker.
  const handleCountryCodePicker = (it: any, index: any, id: any) => {
    if (id === appConstants.adult) {
      setTotalAdults(
        totalAdults.map((el: any, ind: any) => {
          if (ind === index) {
            return {
              ...el,
              open: false,
              countryFlag: it.code,
              countryCode: it.dial_code,
              countryCodeErrMsg: '',
            };
          } else {
            return el;
          }
        }),
      );
    } else if (id === appConstants.child) {
      setTotalChildren(
        totalChildrens.map((el: any, ind: any) => {
          if (ind === index) {
            return {
              ...el,
              open: false,
              countryFlag: it.code,
              countryCode: it.dial_code,
              countryCodeErrMsg: '',
            };
          } else {
            return el;
          }
        }),
      );
    } else {
      setTotalInfants(
        totalInfants.map((el: any, ind: any) => {
          if (ind === index) {
            return {
              ...el,
              open: false,
              countryFlag: it.code,
              countryCode: it.dial_code,
              countryCodeErrMsg: '',
            };
          } else {
            return el;
          }
        }),
      );
    }
  };

  // Method to validate userEmail id..
  const handleEmail = (text: string, index: any, constants: any, id: any) => {
    if (text === '') {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.enterEmail),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.enterEmail),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.enterEmail),
        );
      }
      return;
    }

    if (!regex.emailRegex.test(text)) {
      if (id === appConstants.adult) {
        setTotalAdults(
          setAdultFields(text, index, constants, validations.enterValidEmail),
        );
      } else if (id === appConstants.child) {
        setTotalChildren(
          setChildFields(text, index, constants, validations.enterValidEmail),
        );
      } else {
        setTotalInfants(
          setInfantsFields(text, index, constants, validations.enterValidEmail),
        );
      }
      return;
    }

    if (id === appConstants.adult) {
      setTotalAdults(setAdultFields(text, index, constants, ''));
    } else if (id === appConstants.child) {
      setTotalChildren(setChildFields(text, index, constants, ''));
    } else {
      setTotalInfants(setInfantsFields(text, index, constants, ''));
    }
    return;
  };

  // Method for the seat map button
  const handleSeatMap = useCallback(() => {
    if (
      seatMapData.response[0]?.statusCode === statusCode.Code_200 &&
      seatMapData?.response[0]?.data?.errorInformation?.errorDetails?.code ===
        statusCode.code_102 &&
      seatMapData?.response[0]?.data?.seatmapInformation?.cabin === undefined
    ) {
      setNoAvailableSeatMap(true);
    } else {
      setSeatmap(true);
    }
  }, []);

  // Method to handle the next button..
  const handleNextButton = () => {
    dispatch(clearSubmit());
    dispatch(clearNationality());
    // Validation on the total adults inputs next button
    if (totalAdults.length > 0) {
      totalAdults.forEach((el: any, i: number) => {
        if (el.gender === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  genderErrMsg: validations.selectGender,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.genderErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  genderErrMsg: el.genderErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.firstName === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  firstNameErrMsg: validations.enterFirstName,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.firstNameErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  firstNameErrMsg: el.firstNameErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.lastName === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  lastNameErrMsg: validations.enterLastName,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.lastNameErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  lastNameErrMsg: el.lastNameErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.dob === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  dobErrMsg: validations.selectDate,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.dobErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  dobErrMsg: el.dobErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.nationality === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: validations.enterNationality,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.nationalityPicker === true) {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: validations.enterNationality,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.nationalityErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: el.nationalityErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode &&
          el.passportNum === ''
        ) {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportNumErrMsg: validations.enterPassNumber,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportNumErrMsg !== '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportNumErrMsg: el.passportNumErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportExp === '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportExpErrMsg: validations.enterPassExpiry,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportExpErrMsg !== '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportExpErrMsg: el.passportErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.phone === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  phoneErrMsg: validations.enterPhone,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.countryCode === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  countryCodeErrMsg: validations.selectCountryCode,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.phoneErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  phoneErrMsg: el.phoneErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.countryCodeErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  countryCodeErrMsg: el.countryCodeErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.email === '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  emailErrMsg: validations.enterEmail,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.emailErrMsg !== '') {
          setTotalAdults(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  emailErrMsg: el.emailErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else {
          setTotalAdults(
            totalAdults.map((it: any) => {
              return {
                ...it,
                genderErrMsg: '',
                firstNameErrMsg: '',
                lastNameErrMsg: '',
                dobErrMsg: '',
                nationalityErrMsg: '',
                nationalityPicker: false,
                passportNumErrMsg: '',
                passportExpErrMsg: '',
                phoneErrMsg: '',
                emailErrMsg: '',
              };
            }),
          );
        }
      });
    }
    // Validations for the total childrens inputs next button
    if (totalChildrens.length > 0) {
      totalChildrens.forEach((el: any, i: number) => {
        if (el.gender === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  genderErrMsg: validations.selectGender,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.genderErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  genderErrMsg: el.genderErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.firstName === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  firstNameErrMsg: validations.enterFirstName,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.firstNameErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  firstNameErrMsg: el.firstNameErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.lastName === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  lastNameErrMsg: validations.enterLastName,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.lastNameErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  lastNameErrMsg: el.lastNameErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.dob === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  dobErrMsg: validations.selectDate,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.dobErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  dobErrMsg: el.dobErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.nationality === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: validations.enterNationality,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.nationalityPicker === true) {
          setTotalChildren(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: validations.enterNationality,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.nationalityErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: el.nationalityErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (
          el.passportNum === '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportNumErrMsg: validations.enterPassNumber,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportNumErrMsg !== '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalChildren(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportNumErrMsg: el.passportNumErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (
          el.passportExp === '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportExpErrMsg: validations.enterPassExpiry,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportExpErrMsg !== '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportExpErrMsg: el.passportExpErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.phone === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  phoneErrMsg: validations.enterPhone,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.countryCode === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  countryCodeErrMsg: validations.selectCountryCode,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.countryCodeErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  countryCodeErrMsg: el.countryCodeErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.phoneErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  phoneErrMsg: el.phoneErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.email === '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  emailErrMsg: validations.enterEmail,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.emailErrMsg !== '') {
          setTotalChildren(
            totalChildrens.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  emailErrMsg: el.emailErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else {
          setTotalChildren(
            totalChildrens.map((it: any) => {
              return {
                ...it,
                genderErrMsg: '',
                firstNameErrMsg: '',
                lastNameErrMsg: '',
                dobErrMsg: '',
                nationalityErrMsg: '',
                nationalityPicker: false,
                passportNumErrMsg: '',
                passportExpErrMsg: '',
                phoneErrMsg: '',
                emailErrMsg: '',
              };
            }),
          );
        }
      });
    }
    // Validation of the total infants inputs next button
    if (totalInfants.length > 0) {
      totalInfants.forEach((el: any, i: number) => {
        if (el.gender === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  genderErrMsg: validations.selectGender,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.genderErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  genderErrMsg: el.genderErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.firstName === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  firstNameErrMsg: validations.enterFirstName,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.firstNameErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  firstNameErrMsg: el.firstNameErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.lastName === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  lastNameErrMsg: validations.enterLastName,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.lastNameErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  lastNameErrMsg: el.lastNameErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.dob === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  dobErrMsg: validations.selectDate,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.dobErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  dobErrMsg: el.dobErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.nationality === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: validations.enterNationality,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.nationalityPicker === true) {
          setTotalInfants(
            totalAdults.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: validations.enterNationality,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.nationalityErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  nationalityErrMsg: el.nationalityErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (
          el.passportNum === '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportNumErrMsg: validations.enterPassNumber,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportNumErrMsg !== '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportNumErrMsg: el.passportNumErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.passportExp === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportExpErrMsg: validations.enterPassExpiry,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (
          el.passportExpErrMsg !== '' &&
          internationalFlight?.arrCountryCode !==
            internationalFlight?.depCountryCode
        ) {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  passportExpErrMsg: el.passportExpErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.phone === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  phoneErrMsg: validations.enterPhone,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.countryCode === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  countryCodeErrMsg: validations.selectCountryCode,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.countryCodeErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  countryCodeErrMsg: el.countryCodeErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.phoneErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  phoneErrMsg: el.phoneErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else if (el.email === '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  emailErrMsg: validations.enterEmail,
                };
              } else {
                return it;
              }
            }),
          );
          return;
        } else if (el.emailErrMsg !== '') {
          setTotalInfants(
            totalInfants.map((it: any, index: number) => {
              if (index === i) {
                return {
                  ...it,
                  emailErrMsg: el.emailErrMsg,
                };
              } else {
                return it;
              }
            }),
          );
        } else {
          setTotalInfants(
            totalInfants.map((it: any) => {
              return {
                ...it,
                genderErrMsg: '',
                firstNameErrMsg: '',
                lastNameErrMsg: '',
                dobErrMsg: '',
                nationalityErrMsg: '',
                nationalityPicker: false,
                passportNumErrMsg: '',
                passportExpErrMsg: '',
                phoneErrMsg: '',
                emailErrMsg: '',
              };
            }),
          );
        }
      });
    }

    const adultErr = totalAdults.find((it: any) => {
      console.log(it, 'itrtertertertte');

      if (
        it.firstNameErrMsg !== '' ||
        it.lastNameErrMsg !== '' ||
        it.dobErrMsg !== '' ||
        it.nationalityErrMsg !== '' ||
        it.nationalityPicker !== false ||
        it.passportNumErrMsg !== '' ||
        it.passportExpErrMsg !== '' ||
        it.phoneErrMsg !== '' ||
        it.emailErrMsg !== '' ||
        it.genderErrMsg !== ''
      ) {
        return it;
      }
    });

    const childErr = totalChildrens.find((it: any) => {
      if (
        it.firstNameErrMsg !== '' ||
        it.lastNameErrMsg !== '' ||
        it.dobErrMsg !== '' ||
        it.nationalityErrMsg !== '' ||
        it.nationalityPicker !== false ||
        it.passportNumErrMsg !== '' ||
        it.passportExpErrMsg !== '' ||
        it.phoneErrMsg !== '' ||
        it.emailErrMsg !== '' ||
        it.genderErrMsg !== ''
      ) {
        return it;
      }
    });

    const infantErr = totalInfants.find((it: any) => {
      if (
        it.firstNameErrMsg !== '' ||
        it.lastNameErrMsg !== '' ||
        it.dobErrMsg !== '' ||
        it.nationalityErrMsg !== '' ||
        it.nationalityPicker !== false ||
        it.passportNumErrMsg !== '' ||
        it.passportExpErrMsg !== '' ||
        it.phoneErrMsg !== '' ||
        it.emailErrMsg !== '' ||
        it.genderErrMsg !== ''
      ) {
        return it;
      }
    });
    console.log(adultErr, 'adulteerere');

    if (
      adultErr === undefined &&
      childErr === undefined &&
      infantErr === undefined
    ) {
      if (segmentData !== undefined) {
        navigate(navigationConstants.PAYMENT, {
          checkoutFetchedData,
          priceInArray,
          clubAccess,
          segmentData,
          itemData: segmentData.price === undefined ? item : '',
          totalAdults,
          totalChildrens,
          totalInfants,
          selectedSeats,
          selectedFlight,
        });
      } else {
        navigate(navigationConstants.PAYMENT, {
          checkoutFetchedData,
          priceInArray,
          clubAccess,
          selectedFlight,
          totalAdults,
          totalChildrens,
          totalInfants,
          selectedSeats,
        });
      }
    }
  };

  return (
    <>
      <View style={styles.mainContainerStyle}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.keyBoardAwareStyle}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={colors.color_0094E6}
          />
          <Image
            style={[
              styles.checkOutBackGroundImageStyle,
              Platform.OS === 'ios' && styles.iosPlatformFlightBackground,
            ]}
            source={Images.APP_FLIGHT_SEARCHBG}
          />
          <View style={styles.checkOutHeaderContainerStyle}>
            <CustomHeader
              leftIcon={Icons.BACK_LOGO}
              lefticonOnPress={handleOnBackIconPress}
              leftIconStyle={styles.headerLeftIconStyle}
              headerLabel={appConstants.flightCheckOut}
              headerLabelStyle={styles.headerLabelStyle}
            />
            <Image
              style={styles.stepfromStyle}
              source={Icons.STEPFORM_CHECKOUT}
            />
          </View>
          {tripNum === 1 ? (
            <View
              key={indexs}
              style={[
                commonStyles.ticketContainer_1,
                styles.checkOutTicketStyle,
              ]}>
              <View style={commonStyles.codeStyle}>
                <View style={commonStyles.codeStyleSubView}>
                  <Text style={commonStyles.codeTextStyle}>
                    {segmentData?.departure?.airportCode}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text style={commonStyles.codeTextStyle}>
                    {segmentData?.arrival?.airportCode}
                  </Text>
                </View>
              </View>

              <View style={commonStyles.cityNamesStyle}>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.airportDepartureTextStyle,
                    ]}>
                    {segmentData?.departureAirportName?.cityName}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.cityTimeTextStyle,
                    ]}>
                    {commonMethods.getDuration(segmentData?.durationInMinutes)}
                  </Text>
                </View>
                <View style={commonStyles.codeStyleSubView}>
                  <Text
                    numberOfLines={1}
                    style={[
                      commonStyles.cityTextStyle,
                      commonStyles.arrivalCityTextStyle,
                    ]}>
                    {segmentData?.arrivalAirportName?.cityName}
                  </Text>
                </View>
              </View>
              <View style={commonStyles.timeLineStyle}>
                <Text style={commonStyles.timeTextStyle}>
                  {commonMethods.getTimeFormat(segmentData?.departure?.time)}
                </Text>
                <View style={commonStyles.timeLineContainer}>
                  <Image source={Icons.TICKET_TIMEDOT} />
                  <Image
                    style={commonStyles.ticketTimeLineStyle}
                    source={Icons.TICKET_TIMELINE}
                  />
                  <Image
                    style={commonStyles.ticketTimePlaneStyle}
                    source={Icons.TICKET_TIMELINEPLANE}
                  />
                  <Image source={Icons.TICKET_TIMEDOT} />
                </View>
                <Text style={commonStyles.timeTextStyle}>
                  {commonMethods.getTimeFormat(segmentData?.arrival?.time)}
                </Text>
              </View>
              <View style={styles.ticketAirlinesContainer}>
                <Image
                  style={commonStyles.ticketAirwaysLogo}
                  source={{
                    uri: `${carriersURL.imgURL}${
                      marketingCarriers[0] || operatingCarriers[1]
                    }${carriersURL.png}`,
                  }}
                />
                <Text numberOfLines={1} style={commonStyles.airwaysTextStyle}>
                  {carrierName}
                </Text>
              </View>
              <View style={commonStyles.buttonContainer}>
                <View>
                  <Text style={commonStyles.priceTextStyle}>{`${
                    appConstants.usd
                  } ${
                    Array.isArray(checkoutFetchedData)
                      ? priceInArray
                          ?.reduce((a: any, b: any) => a + b, 0)
                          ?.toFixed(2)
                      : checkoutFetchedData?.price?.toFixed(2)
                  }`}</Text>
                  <Text style={commonStyles.tripFareTextStyle}>
                    {appConstants.onewaytripfare}
                  </Text>
                </View>
              </View>
              {heightInc === indexs && (
                <>
                  {/* Arrival Details */}
                  <Image
                    style={styles.checkOutDetailedLineStyle}
                    source={Icons.TICKETBOTTOM_LINE}
                  />
                  <Text
                    style={
                      commonStyles.departureTextStyle
                    }>{`${appConstants.to} ${segmentData?.arrivalAirportName?.cityName}:`}</Text>
                  <Text
                    style={[
                      commonStyles.timeTextStyle,
                      commonStyles.departureTimeStyle,
                    ]}>
                    {commonMethods.getDuration(segmentData?.durationInMinutes)}
                  </Text>
                  <View style={[commonStyles.departureLineContainer]}>
                    <Image
                      style={[
                        commonStyles.ticketDepartureLineStyle,
                        {
                          height:
                            segmentData?.flights?.length === 1
                              ? responsiveHeight(30)
                              : segmentData?.flights?.length === 2
                              ? responsiveHeight(48)
                              : segmentData?.flights?.length === 3
                              ? responsiveHeight(71)
                              : responsiveHeight(10),
                        },
                      ]}
                      source={Icons.TICKET_DEPARTURELINE}
                    />
                  </View>

                  <View style={commonStyles.ticketCalendarContainer}>
                    <Image source={Icons.TICKET_DEPARTURECALENDAR} />
                    <Text style={commonStyles.dateTextStyle}>
                      {commonMethods.getMonthDayFormat(
                        segmentData?.departure?.date,
                      )}
                    </Text>
                  </View>

                  {/* Airport Details */}
                  {segmentData?.flights.map((el: any, elId: any) => {
                    const airportNameDeparture = getAirportName(
                      el.departure.airportCode,
                    );
                    const airportNameArrival = getAirportName(
                      el.arrival.airportCode,
                    );

                    return (
                      <View
                        key={elId}
                        style={commonStyles.flightStationContainer}>
                        <View style={commonStyles.busStationContainer}>
                          <Text style={commonStyles.stationTimeTextStyle}>
                            {commonMethods.getTimeFormat(el.departure.time)}
                          </Text>
                          <Image
                            style={commonStyles.downPlaneStyle}
                            source={Icons.TICKET_DEPARTUREDOWNPLANE}
                          />
                          <Text
                            numberOfLines={2}
                            style={commonStyles.stationTextStyle}>
                            {commonMethods.getAirportDetails(
                              airportNameDeparture,
                            )}
                          </Text>
                        </View>
                        <View style={commonStyles.cabinContainer}>
                          <Text style={commonStyles.cabinTextStyle}>
                            {cabinClass === appConstants.byPriceLowest
                              ? appConstants.economy
                              : cabinClass}
                          </Text>
                        </View>
                        <View style={commonStyles.flightContainer}>
                          <Image
                            style={commonStyles.flightLogoStyle}
                            source={{
                              uri: `${carriersURL.imgURL}${
                                el?.operatingCarrier || el?.marketingCarrier
                              }${carriersURL.png}`,
                            }}
                          />
                          <Image source={Icons.TICKET_DEPARTUREHORPLANE} />
                          {segmentData &&
                            segmentData?.airlines?.map(
                              (air: any, airIndex: any) => {
                                return (
                                  <Text
                                    key={airIndex}
                                    style={commonStyles.flightTextStyle}>
                                    {air.name}
                                  </Text>
                                );
                              },
                            )}
                          <Text
                            style={
                              commonStyles.flightTextStyle
                            }>{`${appConstants.flights} ${el.flightOrtrainNumber}`}</Text>
                        </View>
                        <View style={commonStyles.busStationContainer}>
                          <Text style={commonStyles.stationTimeTextStyle}>
                            {commonMethods.getTimeFormat(el.arrival.time)}
                          </Text>
                          <Image
                            style={commonStyles.downPlaneStyle}
                            source={Icons.TICKET_DEPARTUREDOWNPLANE}
                          />
                          <Text
                            numberOfLines={2}
                            style={commonStyles.stationTextStyle}>
                            {commonMethods.getAirportDetails(
                              airportNameArrival,
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={commonStyles.arriveDestinationContainer}>
                    <Image
                      style={commonStyles.ticketArriveLocationStyle}
                      source={Icons.TICKET_ARRIVELOCATION}
                    />
                    <View style={commonStyles.destinationTextContainer}>
                      <Text style={commonStyles.arriveAtDestiStyle}>
                        {appConstants.arriveAtDestination}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={commonStyles.destinationTextStyle}>
                        {segmentData?.arrivalAirportName?.name}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              <View
                style={[
                  commonStyles.roundView,
                  commonStyles.subRoundViewStyle,
                  styles.roundViewStyles,
                ]}
              />
              <View style={[commonStyles.roundView, styles.roundViewStyles]} />
              <Image
                style={commonStyles.lineStyle}
                source={Icons.TICKETBOTTOM_LINE}
              />
              {heightInc !== indexs ? (
                <TouchableOpacity
                  onPress={() => setHeightInc(indexs)}
                  style={[commonStyles.ticketDropdownContainerStyle]}>
                  <Image
                    style={commonStyles.ticketDropdownStyle}
                    source={Icons.TICKET_DROPDOWN}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setHeightInc('')}
                  style={[commonStyles.ticketDropupContainerStyle]}>
                  <Image
                    style={commonStyles.ticketDropupStyle}
                    source={Icons.TICKET_DROPUPICON}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            // Round Trip Ticket
            <View
              style={[
                styles.selectTicketModalContainerStyle,
                styles.checkOutTicketStyle,
              ]}>
              <View style={[commonStyles.ticketContainer_1]}>
                <View style={commonStyles.codeStyle}>
                  <View style={commonStyles.codeStyleSubView}>
                    <Text style={commonStyles.codeTextStyle}>
                      {particularSegmentData.firstTrip?.departure.airportCode}
                    </Text>
                  </View>
                  <View style={commonStyles.codeStyleSubView}>
                    <Text style={commonStyles.codeTextStyle}>
                      {particularSegmentData.secondTrip?.departure.airportCode}
                    </Text>
                  </View>
                </View>

                {/* Departure and arrival city name */}
                <View style={commonStyles.cityNamesStyle}>
                  <View style={commonStyles.codeStyleSubView}>
                    <Text
                      style={[
                        commonStyles.cityTextStyle,
                        commonStyles.airportDepartureTextStyle,
                      ]}>
                      {
                        particularSegmentData.firstTripdepartureAirportName
                          ?.cityName
                      }
                    </Text>
                  </View>
                  <View style={commonStyles.codeStyleSubView}>
                    <Text
                      style={[
                        commonStyles.cityTextStyle,
                        commonStyles.cityTimeTextStyle,
                      ]}>
                      {commonMethods.getDuration(
                        particularSegmentData?.firstTrip.durationInMinutes,
                      )}
                    </Text>
                  </View>
                  <View style={commonStyles.codeStyleSubView}>
                    <Text
                      numberOfLines={1}
                      style={[
                        commonStyles.cityTextStyle,
                        commonStyles.arrivalCityTextStyle,
                      ]}>
                      {
                        particularSegmentData.secTripDepartureAirportName
                          ?.cityName
                      }
                    </Text>
                  </View>
                </View>
                {/* trip departure and arrival time in AM or PM */}
                <View style={commonStyles.timeLineStyle}>
                  <Text style={commonStyles.timeTextStyle}>
                    {commonMethods.getTimeFormat(
                      particularSegmentData.firstTrip?.departure.time,
                    )}
                  </Text>
                  <View style={commonStyles.timeLineContainer}>
                    <Image source={Icons.TICKET_TIMEDOT} />
                    <Image
                      style={commonStyles.ticketTimeLineStyle}
                      source={Icons.TICKET_TIMELINE}
                    />
                    <Image
                      style={commonStyles.ticketTimePlaneStyle}
                      source={Icons.TICKET_TIMELINEPLANE}
                    />
                    <Image source={Icons.TICKET_TIMEDOT} />
                  </View>
                  <Text style={commonStyles.timeTextStyle}>
                    {commonMethods.getTimeFormat(
                      particularSegmentData.firstTrip?.arrival.time,
                    )}
                  </Text>
                </View>

                {/* container of flight name and logo */}
                <View style={styles.ticketFlightNamesContainer}>
                  <Image
                    style={commonStyles.ticketAirwaysLogo}
                    source={{
                      uri: `${carriersURL.imgURL}${
                        marketingCarriers[0] || operatingCarriers[1]
                      }${carriersURL.png}`,
                    }}
                  />
                  <Text style={commonStyles.airwaysTextStyle}>
                    {carrierName}
                  </Text>
                </View>

                {/* Container for select button and price of the ticket */}
                <View style={commonStyles.buttonContainer}>
                  <View>
                    <Text style={commonStyles.priceTextStyle}>{`${
                      appConstants.usd
                    } ${
                      Array.isArray(checkoutFetchedData)
                        ? priceInArray
                            ?.reduce((a: any, b: any) => a + b, 0)
                            ?.toFixed(2)
                        : checkoutFetchedData?.price?.toFixed(2)
                    }`}</Text>
                    <Text style={commonStyles.tripFareTextStyle}>
                      {appConstants.roundTripFare}
                    </Text>
                  </View>
                </View>

                {heightInc === particularIndex && (
                  <>
                    {/* Arrival Details */}
                    <Image
                      style={styles.ticketDetailedLineStyle}
                      source={Icons.TICKETBOTTOM_LINE}
                    />
                    <Text
                      style={
                        commonStyles.departureTextStyle
                      }>{`${appConstants.to} ${particularSegmentData.firstTripArrivalAirportName?.cityName}:`}</Text>
                    <Text
                      style={[
                        commonStyles.timeTextStyle,
                        commonStyles.departureTimeStyle,
                      ]}>
                      {commonMethods.getDuration(
                        particularSegmentData?.firstTrip.durationInMinutes,
                      )}
                    </Text>

                    {/* container for background dot line */}
                    <View style={commonStyles.departureLineContainer}>
                      <Image
                        style={[
                          commonStyles.ticketDepartureLineStyle,
                          {
                            height:
                              particularSegmentData?.firstTrip?.flights
                                ?.length === 1
                                ? responsiveHeight(30)
                                : particularSegmentData?.firstTrip?.flights
                                    ?.length === 2
                                ? responsiveHeight(42)
                                : particularSegmentData?.firstTrip?.flights
                                    ?.length === 3
                                ? responsiveHeight(100)
                                : responsiveHeight(10),
                          },
                        ]}
                        source={Icons.TICKET_DEPARTURELINE}
                      />
                    </View>

                    {/* container of calendar and date of out bound trip */}
                    <View style={commonStyles.ticketCalendarContainer}>
                      <Image source={Icons.TICKET_DEPARTURECALENDAR} />
                      <Text style={commonStyles.dateTextStyle}>
                        {commonMethods.getMonthDayFormat(
                          particularSegmentData?.firstTrip.departure?.date,
                        )}
                      </Text>
                    </View>

                    {/* out bound flights Details */}
                    {particularSegmentData?.firstTrip?.flights.map(
                      (el: any) => {
                        const airportNameDeparture = getAirportName(
                          el.departure.airportCode,
                        );
                        const airportNameArrival = getAirportName(
                          el.arrival.airportCode,
                        );

                        return (
                          // flights main container
                          <View style={commonStyles.flightStationContainer}>
                            <View style={commonStyles.busStationContainer}>
                              <Text style={commonStyles.stationTimeTextStyle}>
                                {commonMethods.getTimeFormat(el.departure.time)}
                              </Text>
                              <Image
                                style={commonStyles.downPlaneStyle}
                                source={Icons.TICKET_DEPARTUREDOWNPLANE}
                              />
                              <Text
                                numberOfLines={2}
                                style={commonStyles.stationTextStyle}>
                                {commonMethods.getAirportDetails(
                                  airportNameDeparture,
                                )}
                              </Text>
                            </View>

                            <View style={commonStyles.cabinContainer}>
                              <Text style={commonStyles.cabinTextStyle}>
                                {particularSegmentData.cabinClass ===
                                appConstants.byPriceLowest
                                  ? appConstants.economy
                                  : particularSegmentData.cabinClass}
                              </Text>
                            </View>
                            <View style={commonStyles.flightContainer}>
                              <Image
                                style={commonStyles.flightLogoStyle}
                                source={{
                                  uri: `${carriersURL.imgURL}${
                                    el?.operatingCarrier || el?.marketingCarrier
                                  }${carriersURL.png}`,
                                }}
                              />
                              <Image source={Icons.TICKET_DEPARTUREHORPLANE} />
                              {particularSegmentData &&
                                particularSegmentData.firstAirlines?.map(
                                  (air: any) => {
                                    return (
                                      <Text
                                        style={commonStyles.flightTextStyle}>
                                        {air.name}
                                      </Text>
                                    );
                                  },
                                )}
                              <Text
                                style={
                                  commonStyles.flightTextStyle
                                }>{`${appConstants.flights} ${el.flightOrtrainNumber}`}</Text>
                            </View>
                            <View style={commonStyles.busStationContainer}>
                              <Text style={commonStyles.stationTimeTextStyle}>
                                {commonMethods.getTimeFormat(el.arrival.time)}
                              </Text>
                              <Image
                                style={commonStyles.downPlaneStyle}
                                source={Icons.TICKET_DEPARTUREDOWNPLANE}
                              />
                              <Text
                                numberOfLines={2}
                                style={commonStyles.stationTextStyle}>
                                {commonMethods.getAirportDetails(
                                  airportNameArrival,
                                )}
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}

                    {/* reached destination view */}
                    <View style={commonStyles.arriveDestinationContainer}>
                      <Image
                        style={commonStyles.ticketArriveLocationStyle}
                        source={Icons.TICKET_ARRIVELOCATION}
                      />
                      <View style={commonStyles.destinationTextContainer}>
                        <Text style={commonStyles.arriveAtDestiStyle}>
                          {appConstants.arriveAtDestination}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={commonStyles.destinationTextStyle}>
                          {
                            particularSegmentData.firstTripArrivalAirportName
                              ?.name
                          }
                        </Text>
                      </View>
                    </View>

                    {/* Round Trip details */}
                    <Text
                      style={[
                        commonStyles.departureTextStyle,
                        styles.roundTripTodestination,
                      ]}>{`${appConstants.to} ${particularSegmentData.secTripArrivalAirportName?.cityName}:`}</Text>
                    <Text
                      style={[
                        commonStyles.timeTextStyle,
                        commonStyles.departureTimeStyle,
                      ]}>
                      {commonMethods.getDuration(
                        particularSegmentData?.secondTrip.durationInMinutes,
                      )}
                    </Text>

                    {/* in bound dot line container */}
                    <View style={styles.roundTripLineContainer}>
                      <Image
                        style={[
                          commonStyles.ticketDepartureLineStyle,
                          {
                            height:
                              particularSegmentData?.secondTrip?.flights
                                ?.length === 1
                                ? responsiveHeight(30)
                                : particularSegmentData?.secondTrip?.flights
                                    ?.length === 2
                                ? responsiveHeight(48)
                                : particularSegmentData?.secondTrip?.flights
                                    ?.length === 3
                                ? responsiveHeight(100)
                                : responsiveHeight(10),
                          },
                          {
                            top:
                              particularSegmentData?.firstTrip?.flights
                                ?.length === 1
                                ? responsiveHeight(2)
                                : particularSegmentData?.firstTrip?.flights
                                    ?.length === 2
                                ? responsiveHeight(22)
                                : particularSegmentData?.firstTrip?.flights
                                    ?.length === 3
                                ? responsiveHeight(100)
                                : responsiveHeight(10),
                          },
                        ]}
                        source={Icons.TICKET_DEPARTURELINE}
                      />
                    </View>

                    {/* in bound calendar image and date container */}
                    <View style={commonStyles.ticketCalendarContainer}>
                      <Image source={Icons.TICKET_DEPARTURECALENDAR} />
                      <Text style={commonStyles.dateTextStyle}>
                        {commonMethods.getMonthDayFormat(
                          particularSegmentData?.secondTrip.departure?.date,
                        )}
                      </Text>
                    </View>

                    {/* in bound flights details container */}
                    {particularSegmentData?.secondTrip.flights.map(
                      (el: any) => {
                        const airportNameDeparture = getAirportName(
                          el.departure.airportCode,
                        );
                        const airportNameArrival = getAirportName(
                          el.arrival.airportCode,
                        );

                        return (
                          <View style={commonStyles.flightStationContainer}>
                            <View style={commonStyles.busStationContainer}>
                              <Text style={commonStyles.stationTimeTextStyle}>
                                {commonMethods.getTimeFormat(el.departure.time)}
                              </Text>
                              <Image
                                style={commonStyles.downPlaneStyle}
                                source={Icons.TICKET_DEPARTUREDOWNPLANE}
                              />
                              <Text
                                numberOfLines={2}
                                style={commonStyles.stationTextStyle}>
                                {commonMethods.getAirportDetails(
                                  airportNameDeparture,
                                )}
                              </Text>
                            </View>
                            <View style={commonStyles.cabinContainer}>
                              <Text style={commonStyles.cabinTextStyle}>
                                {particularSegmentData.cabinClass ===
                                appConstants.byPriceLowest
                                  ? appConstants.economy
                                  : particularSegmentData.cabinClass}
                              </Text>
                            </View>
                            <View style={commonStyles.flightContainer}>
                              <Image
                                style={commonStyles.flightLogoStyle}
                                source={{
                                  uri: `${carriersURL.imgURL}${
                                    el?.operatingCarrier || el?.marketingCarrier
                                  }${carriersURL.png}`,
                                }}
                              />
                              <Image source={Icons.TICKET_DEPARTUREHORPLANE} />
                              {particularSegmentData &&
                                particularSegmentData.firstAirlines?.map(
                                  (air: any) => {
                                    return (
                                      <Text
                                        style={commonStyles.flightTextStyle}>
                                        {air.name}
                                      </Text>
                                    );
                                  },
                                )}
                              <Text
                                style={
                                  commonStyles.flightTextStyle
                                }>{`${appConstants.flights} ${el.flightOrtrainNumber}`}</Text>
                            </View>
                            <View style={commonStyles.busStationContainer}>
                              <Text style={commonStyles.stationTimeTextStyle}>
                                {commonMethods.getTimeFormat(el.arrival.time)}
                              </Text>
                              <Image
                                style={commonStyles.downPlaneStyle}
                                source={Icons.TICKET_DEPARTUREDOWNPLANE}
                              />
                              <Text
                                numberOfLines={2}
                                style={commonStyles.stationTextStyle}>
                                {commonMethods.getAirportDetails(
                                  airportNameArrival,
                                )}
                              </Text>
                            </View>
                          </View>
                        );
                      },
                    )}
                    <View style={commonStyles.arriveDestinationContainer}>
                      <Image
                        style={commonStyles.ticketArriveLocationStyle}
                        source={Icons.TICKET_ARRIVELOCATION}
                      />
                      <View style={commonStyles.destinationTextContainer}>
                        <Text style={commonStyles.arriveAtDestiStyle}>
                          {appConstants.arriveAtDestination}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={commonStyles.destinationTextStyle}>
                          {
                            particularSegmentData.secTripArrivalAirportName
                              ?.name
                          }
                        </Text>
                      </View>
                    </View>
                  </>
                )}

                {/* side roundview one*/}
                <View
                  style={[
                    commonStyles.roundView,
                    commonStyles.subRoundViewStyle,
                    styles.viewColor,
                  ]}
                />

                {/* side roundview second*/}
                <View style={[commonStyles.roundView, styles.viewColor]} />

                <Image
                  style={commonStyles.lineStyle}
                  source={Icons.TICKETBOTTOM_LINE}
                />

                {/* ticket close and open button */}
                {heightInc !== particularIndex ? (
                  <TouchableOpacity
                    onPress={() => setHeightInc(particularIndex)}
                    style={[commonStyles.ticketDropdownContainerStyle]}>
                    <Image
                      style={commonStyles.ticketDropdownStyle}
                      source={Icons.TICKET_DROPDOWN}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setHeightInc('')}
                    style={[commonStyles.ticketDropupContainerStyle]}>
                    <Image
                      style={commonStyles.ticketDropupStyle}
                      source={Icons.TICKET_DROPUPICON}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          <View style={styles.seatMapButtonContainerStyle}>
            {isLoading ? (
              <ActivityIndicator
                style={styles.seatMapLoaderStyle}
                size={'large'}
                color={colors.color_0094E6}
              />
            ) : (
              <CustomButton
                gradientStyle={styles.seatMapButtonStyle}
                customButtonStyle={styles.seatMapButtonStyle}
                label={appConstants.seatMap}
                labelStyle={styles.seatMapButtonLabelStyle}
                onPress={handleSeatMap}
              />
            )}
          </View>
          {totalAdults.length > 0 &&
            totalAdults.map((adt: any, index: number) => {
              return (
                <View style={styles.userDetailsContainerStyle}>
                  <TouchableOpacity
                    onPress={() => handlePassengerFields(index, adt.name)}
                    activeOpacity={appConstants.activeOpacity}
                    style={styles.priceContainerStyle}>
                    <Text style={styles.priceTextStyle}>
                      {`${adt.name} - $ ${adt.price}`}
                    </Text>
                    <Text style={styles.nonRefTextStyle}>
                      {item?.isRefundable || segmentData?.isRefundable === true
                        ? appConstants.refundable
                        : appConstants.nonRefundable}
                    </Text>
                    <Image
                      source={
                        adt.openAdult
                          ? Icons.DROPDUP_ARROW
                          : Icons.DROPDOWN_ARROW
                      }
                    />
                    {/* <Text>{sessionOutTimer}</Text> */}
                  </TouchableOpacity>
                  {adt.openAdult && (
                    <>
                      <Image
                        style={styles.checkOutLineStyle}
                        source={Icons.CHECKOUTLINE}
                      />
                      <View style={styles.genderContainerStyle}>
                        <TouchableOpacity
                          onPress={() =>
                            handleGender(index, appConstants.male, adt.name)
                          }
                          style={styles.genderButtonStyle}>
                          <View style={styles.UnCheckedView}>
                            {adt.gender === appConstants.male && (
                              <View style={styles.checkedView} />
                            )}
                          </View>
                          <Text style={styles.genderTextStyle}>
                            {appConstants.male}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleGender(index, appConstants.female, adt.name)
                          }
                          style={styles.genderButtonStyle}>
                          <View style={styles.UnCheckedView}>
                            {adt.gender === appConstants.female && (
                              <View style={styles.checkedView} />
                            )}
                          </View>
                          <Text style={styles.genderTextStyle}>
                            {appConstants.female}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.errorLabelStyle}>
                          {totalAdults[index]?.genderErrMsg}
                        </Text>
                      </View>
                      <CustomMainStackInput
                        label={`${appConstants.first} ${appConstants.name}`}
                        value={totalAdults[index]?.firstName}
                        onChangeText={(text: string) =>
                          handleFirstName(
                            text,
                            index,
                            appConstants.firstName,
                            adt.name,
                          )
                        }
                        source={Icons.USERLOGO}
                        error={totalAdults[index]?.firstNameErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      <CustomMainStackInput
                        label={`${appConstants.last} ${appConstants.name}`}
                        value={totalAdults[index]?.lastName}
                        onChangeText={(text: string) =>
                          handleLastName(
                            text,
                            index,
                            appConstants.lastName,
                            adt.name,
                          )
                        }
                        error={totalAdults[index]?.lastNameErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosSecStyle
                        }
                      />
                      <CustomMainStackInput
                        label={appConstants.dob}
                        value={totalAdults[index]?.dob}
                        source={Icons.CALENDER_LOGO}
                        placeholder={appConstants.MMDDYYY}
                        placeholderTextColor={colors.color_BBBBBB}
                        rightIconTintColor={colors.color_BBBBBB}
                        customRightIconStyle={styles.calendarStyle}
                        rightIconOnPress={() =>
                          handleCalendarOpen(index, appConstants.dob, adt.name)
                        }
                        onChangeText={(text: any) =>
                          handleDateOfBirth(
                            text,
                            index,
                            appConstants.dob,
                            adt.name,
                          )
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                        error={totalAdults[index]?.dobErrMsg}
                      />
                      {/* <CustomDateSelector
                        showRight={true}
                        heading={appConstants.dob}
                        onPress={() =>
                          handleCalendarOpen(index, appConstants.dob, adt.name)
                        }
                        date={totalAdults[index]?.dob}
                      /> */}
                      {adt.dobCalendarOpen && (
                        <CalendarPicker
                          onDateChange={(text: any) =>
                            handleCalendarPicker(
                              text,
                              index,
                              appConstants.dob,
                              adt.name,
                            )
                          }
                          width={responsiveWidth(90)}
                          startFromMonday={true}
                          maxDate={maxDate}
                          textStyle={{color: colors.color_000}}
                          previousTitleStyle={commonStyles.calendarTextStyle}
                          nextTitleStyle={commonStyles.calendarTextStyle}
                        />
                        // <DateTimePicker
                        //   value={new Date()}
                        //   maximumDate={new Date()}
                        //   onChange={(text, date) =>
                        //     handleCalendarPicker(
                        //       date,
                        //       index,
                        //       appConstants.dob,
                        //       adt.name,
                        //     )
                        //   }
                        // />
                      )}
                      <CustomMainStackInput
                        label={appConstants.nationality}
                        value={totalAdults[index]?.nationality}
                        leftIcon={Icons.DROPDOWN_ARROW}
                        leftIconTintColor={colors.color_fff}
                        flag={`https://flagcdn.com/h20/${adt.nationFlag.toLowerCase()}.webp`}
                        countryCode={' '}
                        onChangeText={(text: any) =>
                          handleNationality(
                            text,
                            index,
                            appConstants.nationality,
                            adt.name,
                          )
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios'
                            ? styles.textInputIosStyle
                            : styles.nationalityInputStyle
                        }
                        source={Icons.SMALLPLANE}
                        error={totalAdults[index]?.nationalityErrMsg}
                      />
                      {adt.nationalityPicker &&
                      adt.nationality.length &&
                      nationalityData?.data?.length > 0 ? (
                        <NationalityDropDown
                          data={nationalityData?.data}
                          onPress={(it: any) =>
                            handleOpenNationalityPick(it, index, adt.name)
                          }
                        />
                      ) : null}
                      {adt?.nationalityPicker &&
                        adt?.nationality.length &&
                        nationalityData?.data?.length === 0 && (
                          <Text style={styles.nodataTextStyle}>
                            Result not found
                          </Text>
                        )}
                      {/* <CountryPicker
                        // enableModalAvoiding={true}
                        disableBackdrop={true}
                        show={adt.nationalityPicker}
                        searchMessage="search"
                        pickerButtonOnPress={(it: any) =>
                          handleCountryPicker(it, index, adt.name)
                        }
                        lang={'en'}
                        style={{
                          dialCode: {
                            color: colors.color_F5F5F5,
                          },
                          modal: {
                            flex: 1,
                            marginTop:
                              Platform.OS === 'ios' ? responsiveHeight(5) : 1,
                          },
                        }}
                      /> */}
                      {internationalFlight?.arrCountryCode !==
                      internationalFlight?.depCountryCode ? (
                        <>
                          <CustomMainStackInput
                            label={appConstants.passNumber}
                            value={totalAdults[index]?.passportNum}
                            onChangeText={(text: any) =>
                              handlePassportNumber(
                                text,
                                index,
                                appConstants.passNumber,
                                adt.name,
                              )
                            }
                            error={totalAdults[index]?.passportNumErrMsg}
                            textInputCustomStyle={
                              Platform.OS === 'ios' &&
                              styles.textInputIosSecStyle
                            }
                          />
                          <CustomMainStackInput
                            label={appConstants.passExp}
                            value={totalAdults[index]?.passportExp}
                            source={Icons.CALENDER_LOGO}
                            placeholder={appConstants.MMDDYYY}
                            placeholderTextColor={colors.color_BBBBBB}
                            customRightIconStyle={styles.calendarStyle}
                            rightIconTintColor={colors.color_BBBBBB}
                            rightIconOnPress={() =>
                              handleCalendarOpen(
                                index,
                                appConstants.passExp,
                                adt.name,
                              )
                            }
                            onChangeText={(text: any) =>
                              handlePassportExpiration(
                                text,
                                index,
                                appConstants.passExp,
                                adt.name,
                              )
                            }
                            textInputCustomStyle={
                              Platform.OS === 'ios' && styles.textInputIosStyle
                            }
                            error={totalAdults[index]?.passportExpErrMsg}
                          />
                        </>
                      ) : null}
                      {adt.passExpCalendarOpen && (
                        <CalendarPicker
                          onDateChange={(text: any) =>
                            handleCalendarPicker(
                              text,
                              index,
                              appConstants.passExp,
                              adt.name,
                            )
                          }
                          width={responsiveWidth(90)}
                          startFromMonday={true}
                          textStyle={{color: colors.color_000}}
                          previousTitleStyle={commonStyles.calendarTextStyle}
                          nextTitleStyle={commonStyles.calendarTextStyle}
                        />
                      )}
                      <CustomMainStackInput
                        label={appConstants.phone}
                        value={totalAdults[index]?.phone}
                        maxlength={12}
                        leftIcon={Icons?.DROPDOWN_ARROW}
                        leftIconOnPress={() => openCodePicker(index, adt.name)}
                        leftIconTintColor={colors.color_BBBBBB}
                        onChangeText={(text: any) =>
                          handlePhoneNumber(
                            text,
                            index,
                            appConstants.phone,
                            adt.name,
                          )
                        }
                        flag={
                          adt.countryFlag === ''
                            ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                            : `${
                                flagURL.flaghhtp
                              }${adt.countryFlag.toLowerCase()}${flagURL.wedp}`
                        }
                        error={
                          totalAdults[index]?.phoneErrMsg ||
                          totalAdults[index]?.countryCodeErrMsg
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      <CountryPicker
                        enableModalAvoiding={true}
                        show={adt.open}
                        disableBackdrop={true}
                        initialState={'+1'}
                        popularCountries={['en', 'ua', 'pl']}
                        pickerButtonOnPress={(it: any) =>
                          handleCountryCodePicker(it, index, adt.name)
                        }
                        lang={'en'}
                        style={{
                          modal: {
                            flex: 1,
                            marginTop:
                              Platform.OS === 'ios' ? responsiveHeight(5) : 1,
                          },
                          dialCode: {
                            color: colors.color_000,
                          },
                          countryName: {
                            color: colors.color_000,
                          },
                          textInput: {
                            color: colors.color_000,
                          },
                        }}
                      />
                      <CustomMainStackInput
                        label={appConstants.email}
                        value={totalAdults[index]?.email}
                        onChangeText={(text: any) =>
                          handleEmail(text, index, appConstants.email, adt.name)
                        }
                        source={Icons.Email_LOGO}
                        rightIconTintColor={colors.color_BBBBBB}
                        error={totalAdults[index]?.emailErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                        keyboardType={'email-address'}
                      />
                    </>
                  )}
                </View>
              );
            })}
          {totalChildrens.length > 0 &&
            totalChildrens.map((ch: any, index: any) => {
              return (
                <View style={styles.userDetailsContainerStyle}>
                  <TouchableOpacity
                    activeOpacity={appConstants.activeOpacity}
                    onPress={() => handlePassengerFields(index, ch.name)}
                    style={styles.priceContainerStyle}>
                    <Text style={styles.priceTextStyle}>
                      {`${ch.name} - $ ${ch.price}`}
                    </Text>
                    <Text style={styles.nonRefTextStyle}>
                      {item?.isRefundable || segmentData?.isRefundable === true
                        ? appConstants.refundable
                        : appConstants.nonRefundable}
                    </Text>
                    <Image
                      source={
                        ch.openChild
                          ? Icons.DROPDUP_ARROW
                          : Icons.DROPDOWN_ARROW
                      }
                    />
                  </TouchableOpacity>
                  {ch.openChild && (
                    <>
                      <Image
                        style={styles.checkOutLineStyle}
                        source={Icons.CHECKOUTLINE}
                      />
                      <View style={styles.genderContainerStyle}>
                        <TouchableOpacity
                          onPress={() =>
                            handleGender(index, appConstants.male, ch.name)
                          }
                          style={styles.genderButtonStyle}>
                          <View style={styles.UnCheckedView}>
                            {ch.gender === appConstants.male && (
                              <View style={styles.checkedView} />
                            )}
                          </View>
                          <Text style={styles.genderTextStyle}>
                            {appConstants.male}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleGender(index, appConstants.female, ch.name)
                          }
                          style={styles.genderButtonStyle}>
                          <View style={styles.UnCheckedView}>
                            {ch.gender === appConstants.female && (
                              <View style={styles.checkedView} />
                            )}
                          </View>
                          <Text style={styles.genderTextStyle}>
                            {appConstants.female}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.errorLabelStyle}>
                          {totalChildrens[index]?.genderErrMsg}
                        </Text>
                      </View>
                      <CustomMainStackInput
                        label={`${appConstants.first} ${appConstants.name}`}
                        value={totalChildrens[index]?.firstName}
                        onChangeText={(text: any) =>
                          handleFirstName(
                            text,
                            index,
                            appConstants.firstName,
                            ch.name,
                          )
                        }
                        source={Icons.USERLOGO}
                        error={totalChildrens[index]?.firstNameErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      <CustomMainStackInput
                        label={`${appConstants.last} ${appConstants.name}`}
                        value={totalChildrens[index]?.lastName}
                        onChangeText={(text: any) =>
                          handleLastName(
                            text,
                            index,
                            appConstants.lastName,
                            ch.name,
                          )
                        }
                        error={totalChildrens[index]?.lastNameErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosSecStyle
                        }
                      />
                      <CustomMainStackInput
                        label={appConstants.dob}
                        value={totalChildrens[index]?.dob}
                        source={Icons.CALENDER_LOGO}
                        placeholder={appConstants.MMDDYYY}
                        placeholderTextColor={colors.color_BBBBBB}
                        rightIconTintColor={colors.color_BBBBBB}
                        customRightIconStyle={styles.calendarStyle}
                        rightIconOnPress={() =>
                          handleCalendarOpen(index, appConstants.dob, ch.name)
                        }
                        onChangeText={(text: any) =>
                          handleDateOfBirth(
                            text,
                            index,
                            appConstants.dob,
                            ch.name,
                          )
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                        error={totalChildrens[index]?.dobErrMsg}
                      />
                      {ch.dobCalendarOpen && (
                        <CalendarPicker
                          onDateChange={(text: any) =>
                            handleCalendarPicker(
                              text,
                              index,
                              appConstants.dob,
                              ch.name,
                            )
                          }
                          width={responsiveWidth(90)}
                          startFromMonday={true}
                          maxDate={maxDate}
                          textStyle={{color: colors.color_000}}
                          previousTitleStyle={commonStyles.calendarTextStyle}
                          nextTitleStyle={commonStyles.calendarTextStyle}
                        />
                      )}
                      <CustomMainStackInput
                        label={appConstants.nationality}
                        value={totalChildrens[index]?.nationality}
                        leftIcon={Icons.DROPDOWN_ARROW}
                        flag={`${
                          flagURL.flaghhtp
                        }${ch.nationFlag.toLowerCase()}${flagURL.wedp}`}
                        countryCode={' '}
                        onChangeText={(text: any) =>
                          handleNationality(
                            text,
                            index,
                            appConstants.nationality,
                            ch.name,
                          )
                        }
                        source={Icons.SMALLPLANE}
                        error={totalChildrens[index]?.nationalityErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios'
                            ? styles.textInputIosStyle
                            : styles.nationalityInputStyle
                        }
                        customFlagStyle={
                          Platform.OS === 'ios' && styles.countryFlagStyle
                        }
                      />
                      {ch.nationalityPicker &&
                      ch.nationality.length &&
                      nationalityData?.data?.length > 0 ? (
                        <View style={{marginTop: responsiveHeight(2)}}>
                          <NationalityDropDown
                            data={nationalityData?.data}
                            onPress={(it: any) =>
                              handleOpenNationalityPick(it, index, ch.name)
                            }
                          />
                        </View>
                      ) : null}
                      {ch?.nationalityPicker &&
                        ch?.nationality.length &&
                        nationalityData?.data?.length === 0 && (
                          <Text style={styles.nodataTextStyle}>
                            Result not found
                          </Text>
                        )}
                      {/* <CountryPicker
                        enableModalAvoiding={true}
                        show={ch.nationalityPicker}
                        pickerButtonOnPress={(it: any) =>
                          handleCountryPicker(it, index, ch.name)
                        }
                        lang={'en'}
                        style={{
                          dialCode: {
                            color: colors.color_F5F5F5,
                          },
                          modal: {
                            flex: 1,
                            marginTop:
                              Platform.OS === 'ios' ? responsiveHeight(5) : 1,
                          },
                        }}
                      /> */}
                      <CustomMainStackInput
                        label={appConstants.passNumber}
                        value={totalChildrens[index]?.passportNum}
                        onChangeText={(text: any) =>
                          handlePassportNumber(
                            text,
                            index,
                            appConstants.passNumber,
                            ch.name,
                          )
                        }
                        error={totalChildrens[index]?.passportNumErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosSecStyle
                        }
                      />
                      <CustomMainStackInput
                        label={appConstants.passExp}
                        value={totalChildrens[index]?.passportExp}
                        placeholder={appConstants.MMDDYYY}
                        placeholderTextColor={colors.color_BBBBBB}
                        source={Icons.CALENDER_LOGO}
                        customRightIconStyle={styles.calendarStyle}
                        rightIconTintColor={colors.color_BBBBBB}
                        rightIconOnPress={() =>
                          handleCalendarOpen(
                            index,
                            appConstants.passExp,
                            ch.name,
                          )
                        }
                        onChangeText={(text: any) =>
                          handlePassportExpiration(
                            text,
                            index,
                            appConstants.passExp,
                            ch.name,
                          )
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                        error={totalChildrens[index]?.passportExpErrMsg}
                      />
                      {ch.passExpCalendarOpen && (
                        <CalendarPicker
                          onDateChange={(text: any) =>
                            handleCalendarPicker(
                              text,
                              index,
                              appConstants.passExp,
                              ch.name,
                            )
                          }
                          width={responsiveWidth(90)}
                          startFromMonday={true}
                          textStyle={{color: colors.color_000}}
                          previousTitleStyle={commonStyles.calendarTextStyle}
                          nextTitleStyle={commonStyles.calendarTextStyle}
                        />
                      )}
                      <CustomMainStackInput
                        label={appConstants.phone}
                        value={totalChildrens[index]?.phone}
                        maxlength={12}
                        leftIcon={Icons.DROPDOWN_ARROW}
                        leftIconOnPress={() => openCodePicker(index, ch.name)}
                        onChangeText={(text: any) =>
                          handlePhoneNumber(
                            text,
                            index,
                            appConstants.phone,
                            ch.name,
                          )
                        }
                        flag={
                          ch.countryFlag === ''
                            ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                            : `${
                                flagURL.flaghhtp
                              }${ch.countryFlag.toLowerCase()}${flagURL.wedp}`
                        }
                        error={
                          totalChildrens[index]?.phoneErrMsg ||
                          totalChildrens[index]?.countryCodeErrMsg
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      <CountryPicker
                        enableModalAvoiding={true}
                        show={ch.open}
                        initialState={'+1'}
                        popularCountries={['en', 'ua', 'pl']}
                        pickerButtonOnPress={(it: any) => {
                          handleCountryCodePicker(it, index, ch.name);
                        }}
                        lang={'en'}
                        style={{
                          modal: {
                            flex: 1,
                          },
                          dialCode: {
                            color: colors.color_000,
                          },
                          countryName: {
                            color: colors.color_000,
                          },
                          textInput: {
                            color: colors.color_000,
                          },
                        }}
                      />
                      <CustomMainStackInput
                        label={appConstants.email}
                        value={totalChildrens[index]?.email}
                        onChangeText={(text: any) =>
                          handleEmail(text, index, appConstants.email, ch.name)
                        }
                        source={Icons.Email_LOGO}
                        rightIconTintColor={colors.color_BBBBBB}
                        error={totalChildrens[index]?.emailErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                        keyboardType={'email-address'}
                      />
                    </>
                  )}
                </View>
              );
            })}
          {totalInfants.length > 0 &&
            totalInfants.map((inf: any, index: any) => {
              return (
                <View style={styles.userDetailsContainerStyle}>
                  <TouchableOpacity
                    activeOpacity={appConstants.activeOpacity}
                    onPress={() => handlePassengerFields(index, inf.name)}
                    style={styles.priceContainerStyle}>
                    <Text style={styles.priceTextStyle}>
                      {`${inf.name} - $ ${inf.price}`}
                    </Text>
                    <Text style={styles.nonRefTextStyle}>
                      {item?.isRefundable || segmentData?.isRefundable === true
                        ? appConstants.refundable
                        : appConstants.nonRefundable}
                    </Text>
                    <Image
                      source={
                        inf.openInfant
                          ? Icons.DROPDUP_ARROW
                          : Icons.DROPDOWN_ARROW
                      }
                    />
                  </TouchableOpacity>
                  {inf.openInfant && (
                    <>
                      <Image
                        style={styles.checkOutLineStyle}
                        source={Icons.CHECKOUTLINE}
                      />
                      <View style={styles.genderContainerStyle}>
                        <TouchableOpacity
                          onPress={() =>
                            handleGender(index, appConstants.male, inf.name)
                          }
                          style={styles.genderButtonStyle}>
                          <View style={styles.UnCheckedView}>
                            {inf.gender === appConstants.male && (
                              <View style={styles.checkedView} />
                            )}
                          </View>
                          <Text style={styles.genderTextStyle}>
                            {appConstants.male}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleGender(index, appConstants.female, inf.name)
                          }
                          style={styles.genderButtonStyle}>
                          <View style={styles.UnCheckedView}>
                            {inf.gender === appConstants.female && (
                              <View style={styles.checkedView} />
                            )}
                          </View>
                          <Text style={styles.genderTextStyle}>
                            {appConstants.female}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.errorLabelStyle}>
                          {totalInfants[index]?.genderErrMsg}
                        </Text>
                      </View>
                      <CustomMainStackInput
                        label={`${appConstants.first} ${appConstants.name}`}
                        value={totalInfants[index]?.firstName}
                        onChangeText={(text: any) =>
                          handleFirstName(
                            text,
                            index,
                            appConstants.firstName,
                            inf.name,
                          )
                        }
                        source={Icons.USERLOGO}
                        error={totalInfants[index]?.firstNameErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      <CustomMainStackInput
                        label={`${appConstants.last} ${appConstants.name}`}
                        value={totalInfants[index]?.lastName}
                        onChangeText={(text: any) =>
                          handleLastName(
                            text,
                            index,
                            appConstants.lastName,
                            inf.name,
                          )
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosSecStyle
                        }
                        error={totalInfants[index]?.lastNameErrMsg}
                      />
                      <CustomMainStackInput
                        label={appConstants.dob}
                        value={totalInfants[index]?.dob}
                        source={Icons.CALENDER_LOGO}
                        placeholder={appConstants.MMDDYYY}
                        placeholderTextColor={colors.color_BBBBBB}
                        rightIconTintColor={colors.color_BBBBBB}
                        customRightIconStyle={styles.calendarStyle}
                        rightIconOnPress={() =>
                          handleCalendarOpen(index, appConstants.dob, inf.name)
                        }
                        onChangeText={(text: any) =>
                          handleDateOfBirth(
                            text,
                            index,
                            appConstants.dob,
                            inf.name,
                          )
                        }
                        error={totalInfants[index]?.dobErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      {inf.dobCalendarOpen && (
                        <CalendarPicker
                          onDateChange={(text: any) =>
                            handleCalendarPicker(
                              text,
                              index,
                              appConstants.dob,
                              inf.name,
                            )
                          }
                          width={responsiveWidth(90)}
                          startFromMonday={true}
                          maxDate={maxDate}
                          textStyle={{color: colors.color_000}}
                          previousTitleStyle={commonStyles.calendarTextStyle}
                          nextTitleStyle={commonStyles.calendarTextStyle}
                        />
                      )}
                      <CustomMainStackInput
                        label={appConstants.nationality}
                        value={totalInfants[index]?.nationality}
                        leftIcon={Icons.DROPDOWN_ARROW}
                        flag={`${
                          flagURL.flaghhtp
                        }${inf.nationFlag.toLowerCase()}${flagURL.wedp}`}
                        countryCode={' '}
                        onChangeText={(text: any) =>
                          handleNationality(
                            text,
                            index,
                            appConstants.nationality,
                            inf.name,
                          )
                        }
                        source={Icons.SMALLPLANE}
                        error={totalInfants[index]?.nationalityErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios'
                            ? styles.textInputIosStyle
                            : styles.nationalityInputStyle
                        }
                      />
                      {inf.nationalityPicker &&
                      inf.nationality.length &&
                      nationalityData?.data?.length > 0 ? (
                        <View style={{marginTop: responsiveHeight(2)}}>
                          <NationalityDropDown
                            data={nationalityData?.data}
                            onPress={(it: any) =>
                              handleOpenNationalityPick(it, index, inf.name)
                            }
                          />
                        </View>
                      ) : null}
                      {inf?.nationalityPicker &&
                        inf?.nationality.length &&
                        nationalityData?.data?.length === 0 && (
                          <Text style={styles.nodataTextStyle}>
                            Result not found
                          </Text>
                        )}
                      {/* <CountryPicker
                        enableModalAvoiding={true}
                        show={inf.nationalityPicker}
                        pickerButtonOnPress={(it: any) =>
                          handleCountryPicker(it, index, inf.name)
                        }
                        lang={'en'}
                        style={{
                          dialCode: {
                            color: colors.color_F5F5F5,
                          },
                          modal: {
                            flex: 1,
                          },
                        }}
                      /> */}
                      <CustomMainStackInput
                        label={appConstants.passNumber}
                        value={totalInfants[index]?.passportNum}
                        onChangeText={(text: any) =>
                          handlePassportNumber(
                            text,
                            index,
                            appConstants.passNumber,
                            inf.name,
                          )
                        }
                        error={totalInfants[index]?.passportNumErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosSecStyle
                        }
                      />
                      <CustomMainStackInput
                        label={appConstants.passExp}
                        value={totalInfants[index]?.passportExp}
                        placeholder={appConstants.MMDDYYY}
                        placeholderTextColor={colors.color_BBBBBB}
                        source={Icons.CALENDER_LOGO}
                        customRightIconStyle={styles.calendarStyle}
                        rightIconTintColor={colors.color_BBBBBB}
                        rightIconOnPress={() =>
                          handleCalendarOpen(
                            index,
                            appConstants.passExp,
                            inf.name,
                          )
                        }
                        onChangeText={(text: any) =>
                          handlePassportExpiration(
                            text,
                            index,
                            appConstants.passExp,
                            inf.name,
                          )
                        }
                        error={totalInfants[index]?.passportExpErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      {inf.passExpCalendarOpen && (
                        <CalendarPicker
                          onDateChange={(text: any) =>
                            handleCalendarPicker(
                              text,
                              index,
                              appConstants.passExp,
                              inf.name,
                            )
                          }
                          width={responsiveWidth(90)}
                          startFromMonday={true}
                          textStyle={{color: colors.color_000}}
                          previousTitleStyle={commonStyles.calendarTextStyle}
                          nextTitleStyle={commonStyles.calendarTextStyle}
                        />
                      )}
                      <CustomMainStackInput
                        label={appConstants.phone}
                        value={totalInfants[index]?.phone}
                        maxlength={12}
                        leftIcon={Icons.DROPDOWN_ARROW}
                        leftIconOnPress={() => openCodePicker(index, inf.name)}
                        onChangeText={(text: any) =>
                          handlePhoneNumber(
                            text,
                            index,
                            appConstants.phone,
                            inf.name,
                          )
                        }
                        flag={
                          inf.countryFlag === ''
                            ? `${flagURL.flaghhtp}${'us'}${flagURL.wedp}`
                            : `${
                                flagURL.flaghhtp
                              }${inf.countryFlag.toLowerCase()}${flagURL.wedp}`
                        }
                        error={
                          totalInfants[index]?.phoneErrMsg ||
                          totalInfants[index]?.countryCodeErrMsg
                        }
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                      />
                      <CountryPicker
                        enableModalAvoiding={true}
                        show={inf.open}
                        initialState={'+1'}
                        popularCountries={['en', 'ua', 'pl']}
                        pickerButtonOnPress={(it: any) => {
                          handleCountryCodePicker(it, index, inf.name);
                        }}
                        lang={'en'}
                        style={{
                          modal: {
                            flex: 1,
                            marginTop:
                              Platform.OS === 'ios' ? responsiveHeight(5) : 1,
                          },
                          dialCode: {
                            color: colors.color_000,
                          },
                          countryName: {
                            color: colors.color_000,
                          },
                          textInput: {
                            color: colors.color_000,
                          },
                        }}
                      />
                      <CustomMainStackInput
                        label={appConstants.email}
                        value={totalInfants[index]?.email}
                        onChangeText={(text: any) =>
                          handleEmail(text, index, appConstants.email, inf.name)
                        }
                        source={Icons.Email_LOGO}
                        rightIconTintColor={colors.color_BBBBBB}
                        error={totalInfants[index]?.emailErrMsg}
                        textInputCustomStyle={
                          Platform.OS === 'ios' && styles.textInputIosStyle
                        }
                        keyboardType={'email-address'}
                      />
                    </>
                  )}
                </View>
              );
            })}
          {sessionOutTimer === 0 && (
            <View style={styles.flightSessionContainerStyle}>
              <View style={styles.warningImageContainerStyle}>
                <Image
                  style={styles.warningImageStyle}
                  source={Icons.WARNING}
                />
              </View>
              <Text style={styles.unfortunatelySessionTextStyle}>
                {appConstants.unfortunatelySession}
              </Text>
            </View>
          )}
        </KeyboardAwareScrollView>
        {!isKeyboardVisible && (
          <FlightBottomPriceBar
            checkoutFetchedData={checkoutFetchedData}
            priceInArray={priceInArray}
            clubAccess={clubAccess}
            label={appConstants.next}
            onPress={handleNextButton}
          />
        )}
      </View>
      {sessionOutTimer === 0 && (
        <CustomModal
          label={appConstants.sessionExpired}
          onPress={() => back()}
        />
      )}
      {seatmap && (
        <SeatMap
          setOnewaySeatMap={setSeatmap}
          totalPassengerCount={getPassengerCount()}
          segmentData={segmentData === undefined ? selectedFlight : segmentData}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          currentIndex={seatCurrentIndex}
          setCurrentIndex={setSeatCurrentIndex}
          cabinDetails={seatCabinDetails}
          setCabinDetails={setSeatCabinDetails}
          rowDetails={seatRowDetails}
          setRowDetails={setSeatRowDetails}
          rowCharacterSticks={rowCharacterSticks}
          setRowCharacterSticks={setRowCharacterSticks}
          seatCharacterSticks={seatCharacteristics}
          setSeatCharacterSticks={setSeatCharacteristics}
          seatRowNumber={seatRowNumber}
          setSeatRowNumber={setSeatRowNumber}
          selectedSeatModal={selectedSeatModal}
          setSelectedSeatModal={setSelectedSeatModal}
          flightIndex={flightIndex}
          setFlightIndex={setFlightIndex}
          isAlreadySelectedSeat={isAlreadySelectedSeat}
          setIsAlreadySelectedSeat={setIsAlreadySelectedSeat}
          seatmapLoader={seatmapLoader}
          setSeatmapLoader={setSeatmapLoader}
          checkoutData={checkoutFetchedData}
          seatDetailsModal={seatDetailsModal}
          setSeatDetailsModal={setSeatDetailsModal}
          flightId={flightId}
          setFlightId={setFlightId}
        />
      )}
      {noAvailableSeatMap && (
        <CustomModal
          label={appConstants.noAvailableSeatMap}
          onPress={() => setNoAvailableSeatMap(false)}
        />
      )}
      {nationalityLoading && (
        <CustomLoader
          isLoading={nationalityLoading}
          customLoaderStyle={styles.customLoaderStyle}
          loaderColor={colors.color_0094E6}
        />
      )}
    </>
  );
};

export default CheckOut;
