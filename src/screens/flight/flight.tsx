/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import {Icons, Images} from '@src/assets';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '@src/constants/colors';
import commonStyles from '@src/utility/commonStyles';
import CustomHeader from '@src/components/customHeader/customHeader';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import CustomHeaderLabel from '@src/components/customHeaderLabel/customHeaderLabel';
import CustomRadioButtons from '@src/components/customRadioButtons/customRadioButtons';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import appConstants, {
  flashMessageConstants,
  statusCode,
  validations,
} from '@src/constants/appConstants';
import CalendarPicker from 'react-native-calendar-picker';
import CustomDropdown from '@src/components/customDropdown/customDropdown';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {RootState} from '@src/redux/store';
import {fetchLocations} from './slice/flightSlice';
import styles from './styles';
import CustomButton from '@src/components/customButton/customButton';
import PassengarSelector from '@src/components/passengersSelector/passengarSelector';
import moment from 'moment';
import commonMethods from '@src/utility/commonMethods';
import {clearOneWayFlight, fetchOneWayFlight} from './slice/oneWayFlightSlice';
import {
  clearRoundTrip,
  fetchRoundTripFlight,
} from './slice/roundTripFlightSlice';
import CustomDateSelector from '@src/components/customDateSelector/customDateSelector';
import CustomLoader from '@src/components/customLoader/customLoader';
import CustomModal from '@src/components/customModal/customModal';
import customHooks from '@src/utility/customHooks';
import {clearFilter, currentSorting} from '@src/redux/appSlice/appSlice';
import {clearCheckout} from '../checkOut/slice/checkoutSlice';

import BlogBanner from '@src/components/blogBanner/blogBanner';

const Flight = () => {
  const navigations: any = useNavigation();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [barSelectorId, setBarSelectorId] = useState<number>(1);
  const [radio, setRadio] = useState(1);
  const [fromLocation, setFromLocation] = useState('');
  const [fromDropdown, setFromDropdown] = useState(false);
  const [fromLocationError, setFromLocationError] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [toDropdown, setToDropdown] = useState(false);
  const [toLocationError, setToLocationError] = useState('');
  const [showOneWayCalender, setShowOneWayCalender] = useState(false);
  const [oneWaydepartureDate, setOneWaydepartureDate] = useState('');
  const [roundTripDepDate, setRoundTripDepDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  // const [showReturnDateCalendar, setShoWReturnDateCalendar] = useState(false);
  const [isPassengerSelector, setIsPassengerSelector] = useState(false);
  const [adult, setAdult] = useState<any>(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinItems, setCabinItems] = useState(appConstants.byPriceLowest);
  const [cabin, setCabin] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLabel, setModalLabel] = useState('');

  const [showRtDepDateCalendar, setShowRtDepDateCalendar] = useState(false);
  const [showRtRetDateCalendar, setShowRtRetDateCalendar] = useState(false);

  const minDate = new Date();
  const currentTab = useSelector((state: RootState) => state.app.selectedTab);

  // Stored data of locations FROM and TO
  const locationsData: any = useSelector(
    (state: RootState) => state.flight.locationsData,
  );

  // Loader for the location data
  const locationLoader: any = useSelector(
    (state: RootState) => state.flight.isLoading,
  );

  // One way flight data to navigate
  const flightOneWay = useSelector(
    (state: RootState) => state.onewayFlightSearch,
  );

  const prevDataFlightOneWay: any = customHooks.usePrevious(flightOneWay);

  // Round trip flight data to navigate
  const roundTripFlight = useSelector(
    (state: RootState) => state.roundTripFlightSearch,
  );

  const prevDataRoundTripFlight: any = customHooks.usePrevious(roundTripFlight);

  //Hook for hardware press button (Backhandler).
  useEffect(() => {
    const backAction = () => {
      Alert.alert(appConstants.holdOn, appConstants.areYouSureToGoBack, [
        {
          text: appConstants.cancel,
          onPress: () => null,
          style: 'cancel',
        },
        {text: appConstants.yes, onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // hook to navigate on flight search screen..
  useEffect(() => {
    if (flightOneWay.searchedData !== prevDataFlightOneWay?.searchedData) {
      if (flightOneWay.searchedData.statusCode === statusCode.Code_200) {
        setIsLoading(false);
        if (flightOneWay.searchedData?.data?.itineraries) {
          navigate(navigationConstants.FLIGHT_SEARCH, {
            radio,
            fromLocation,
            toLocation,
            origin,
            destination,
            oneWaydepartureDate,
            cabinItems,
            adult,
            children,
            infants,
          });
        } else {
          setShowModal(true);
          setModalLabel(
            `${appConstants.noAvailableFlight}\n\n${appConstants.pleaseModify}`,
          );
          return;
        }
      }
    }

    if (
      roundTripFlight.searchedRoundTripData !==
      prevDataRoundTripFlight?.searchedRoundTripData
    ) {
      if (
        roundTripFlight.searchedRoundTripData.statusCode === statusCode.Code_200
      ) {
        setIsLoading(false);
        if (roundTripFlight?.searchedRoundTripData?.data?.itineraries) {
          navigate(navigationConstants.FLIGHT_SEARCH, {
            radio,
            fromLocation,
            toLocation,
            origin,
            destination,
            roundTripDepDate,
            cabinItems,
            adult,
            children,
            infants,
          });
        } else {
          setShowModal(true);
          setModalLabel(
            `${appConstants.noAvailableFlight}\n\n${appConstants.pleaseModify}`,
          );
          return;
        }
      }
    }

    if (
      flightOneWay?.err?.statusCode === statusCode.code_422 ||
      roundTripFlight?.err?.statusCode === statusCode.code_422
    ) {
      setShowModal(true);
      setIsLoading(false); // locationLoader(false);
      setModalLabel(
        `${appConstants.noAvailableFlight}\n\n${appConstants.pleaseModify}`,
      );
      return;
    }
  }, [flightOneWay, roundTripFlight]);

  // console.log(flightOneWay, 'flightOneWay');

  // Method on OK press of modal
  const handleModalOkPress = () => {
    if (radio === 1) {
      setOneWaydepartureDate('');
      dispatch(clearOneWayFlight());
    } else {
      setRoundTripDepDate('');
      setReturnDate('');
      dispatch(clearRoundTrip());
    }
    setShowModal(false);
    setFromLocation('');
    setToLocation('');
    setAdult(1);
    setChildren(0);
    setInfants(0);
    setCabinItems(appConstants.byPriceLowest);
  };

  useEffect(() => {
    handleBarSelector();
  }, [currentTab]);

  //Method to clear the state on blur..
  const handleClearState = () => {
    setIsLoading(false);
    setBarSelectorId(1);
    setFromDropdown(false);
    setToDropdown(false);
    setShowOneWayCalender(false);
    // setShoWReturnDateCalendar(false);
    setShowRtDepDateCalendar(false);
    setIsPassengerSelector(false);
  };

  // to clear the state data
  useEffect(() => {
    const unsubscribe = navigations.addListener('blur', handleClearState);
    return () => unsubscribe();
  }, [navigations]);

  // Hook for location loader..
  useEffect(() => {
    setIsLoading(locationLoader);
  }, [locationLoader]);

  // method to handle the navigation..
  const handleBarSelector = () => {
    switch (currentTab) {
      case 1:
        setBarSelectorId(1);
        navigate(navigationConstants.FLIGHT_TAB);
        break;
      case 2:
        setBarSelectorId(2);
        navigate(navigationConstants.HOTEL_TAB);
        break;
      case 3:
        setBarSelectorId(3);
        navigate(navigationConstants.CAR_TAB);
        break;
      default:
        setBarSelectorId(1);
        navigate(navigationConstants.HOME);
    }
  };

  // method to handle the radio buttons..
  const handleRadioBtn = (id: any) => {
    setRadio(id);
    if (radio === 1) {
      setShowOneWayCalender(false);
      // setShoWReturnDateCalendar(false);
      setShowRtDepDateCalendar(false);
      setShowRtRetDateCalendar(false);
      setOneWaydepartureDate('');
    } else if (radio === 2) {
      setShowOneWayCalender(false);
      // setShoWReturnDateCalendar(false);
      setShowRtDepDateCalendar(false);
      setShowRtRetDateCalendar(false);
      setRoundTripDepDate('');
      setReturnDate('');
    }
  };

  // method to fetch the from location date..
  const onFromChangeHandler = (text: string) => {
    setOrigin('');
    if (text === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
      setFromLocation(text);
      return;
    }
    // else if (!regex.stringRegex.test(text)) {
    //   console.log(text,'regx text');

    //   commonMethods.flashMessage(
    //     validations.onlyCharacters,
    //     flashMessageConstants.danger,
    //   );
    //   return;
    // }
    else {
      // console.log(text, 'text --- no ');

      const params: any = {
        term: text,
        locale: appConstants.en_US,
        city: appConstants.city,
        airport: appConstants.airport,
        activeOnly: false,
        sort: appConstants.nameAPI,
      };
      setIsLoading(false);
      setFromLocationError('');
      dispatch(fetchLocations(params));
      setFromLocation(text);

      setFromDropdown(true);
    }
  };

  // method to select To-location date..
  const onToChangeHandler = (text: string) => {
    setDestination('');
    if (text === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
      setToLocation(text);
      return;
    }
    // else if (!regex.stringRegex.test(text)) {
    //   commonMethods.flashMessage(
    //     validations.onlyCharacters,
    //     flashMessageConstants.danger,
    //   );
    //   return;
    // }
    else {
      const params: any = {
        term: text,
        locale: appConstants.en_US,
        city: appConstants.city,
        airport: appConstants.airport,
        activeOnly: false,
        sort: appConstants.nameAPI,
      };
      setToLocationError('');
      dispatch(fetchLocations(params));
      setToLocation(text);
      setToDropdown(true);
    }
  };

  //Method to select the select item from drop down..
  const onDropdownItemPress = (item: any, code: any, key: number) => {
    if (key === 1) {
      setFromDropdown(item);
      if (item && code) {
        setFromLocation(item);
        setOrigin(code);
        setFromDropdown(false);
      } else {
        setFromLocation('');
      }
    } else if (key === 2) {
      setToLocation(item);
      if (item && code) {
        setToLocation(item);
        setDestination(code);
        setToDropdown(false);
      }
    }
  };

  // method for one way departure data.
  const handleOneWayDepartureDate = () => {
    setFromDropdown(false);
    setToDropdown(false);
    setShowOneWayCalender(!showOneWayCalender);
  };

  //method to select the one way departure date..
  const handleDepratureDatePicker = (text: any) => {
    setOneWaydepartureDate(text);
    setShowOneWayCalender(false);
  };

  //method to select the return date..
  // const handleReturnDatePicker = (date: any, type: any) => {
  //   if (type === appConstants.end_Date) {
  //     setReturnDate(date);
  //     setShoWReturnDateCalendar(false);
  //   } else {
  //     setReturnDate('');
  //     setRoundTripDepDate(date);
  //   }
  // };

  const handleRountTripDepDate = (date: any) => {
    setShowRtRetDateCalendar(false);
    setRoundTripDepDate(date);
    setShowRtDepDateCalendar(false);
  };

  const handleRountTripRetDate = (date: any) => {
    setShowRtDepDateCalendar(false);
    setReturnDate(date);
    setShowRtRetDateCalendar(false);
  };

  // To select the passengers..
  const handlePassengerSelector = (
    cabinItem: string,
    adultVal: any,
    childrenVal: any,
    infantsVal: any,
    cabinID: any,
  ) => {
    setFromDropdown(false);
    setToDropdown(false);
    setCabinItems(cabinItem);
    setAdult(adultVal);
    setChildren(childrenVal);
    setInfants(infantsVal);
    setCabin(cabinID);
  };

  // Method for search flight button press..
  const handleOnSubmit = () => {
    if (fromLocation === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
    } else if (origin === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
    } else if (toLocation === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
    } else if (destination === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
    } else if (radio === 1 && oneWaydepartureDate === '') {
      commonMethods.flashMessage(
        validations.selectDate,
        flashMessageConstants.danger,
      );
    } else {
      setFromLocationError('');
      setToLocationError('');
      const flightData: any = {
        adults: adult,
        children: children,
        infants: infants,
        origin: origin,
        destination: destination,
        recommendations: 200,
        flightTypes: [appConstants.n, appConstants.d, appConstants.c],
      };
      if (cabin !== '') {
        flightData.cabin = cabin;
      }

      if (radio === 1) {
        setIsLoading(true);
        dispatch(currentSorting(appConstants.cheapest));
        dispatch(clearFilter());
        dispatch(clearCheckout());
        const dateFormatted = new Date(oneWaydepartureDate);
        const date = commonMethods.dateFormatterMethod(
          dateFormatted.getDate(),
          false,
        );
        const month = commonMethods.dateFormatterMethod(
          dateFormatted.getMonth(),
          true,
        );
        const year = commonMethods.yearFormattedMethod(
          dateFormatted.getFullYear().toString(),
        );

        flightData.departure = `${date}${month}${year}`;
        dispatch(fetchOneWayFlight(flightData));
      }

      if (radio === 2) {
        dispatch(currentSorting(appConstants.cheapest));
        dispatch(clearFilter());
        if (roundTripDepDate === '') {
          commonMethods.flashMessage(
            validations.selectDate,
            flashMessageConstants.danger,
          );
        } else if (returnDate === '') {
          commonMethods.flashMessage(
            validations.selectDate,
            flashMessageConstants.danger,
          );
        } else if (roundTripDepDate > returnDate) {
          commonMethods.flashMessage(
            validations.depDateNotGreaterThenRetDate,
            flashMessageConstants.danger,
          );
        } else {
          setIsLoading(true);
          const dateFormatted = new Date(roundTripDepDate);
          const date = commonMethods.dateFormatterMethod(
            dateFormatted.getDate(),
            false,
          );
          const month = commonMethods.dateFormatterMethod(
            dateFormatted.getMonth(),
            true,
          );
          const year = commonMethods.yearFormattedMethod(
            dateFormatted.getFullYear().toString(),
          );
          flightData.departure = `${date}${month}${year}`;
          // Return Date
          const returnDateFormatted = new Date(returnDate);
          const returnDt = commonMethods.dateFormatterMethod(
            returnDateFormatted.getDate(),
            false,
          );
          const returnMonth = commonMethods.dateFormatterMethod(
            returnDateFormatted.getMonth(),
            true,
          );
          const returnYear = commonMethods.yearFormattedMethod(
            returnDateFormatted.getFullYear().toString(),
          );
          flightData.return_date = `${returnDt}${returnMonth}${returnYear}`;
          dispatch(fetchRoundTripFlight(flightData));
        }
      }
    }
  };

  return (
    <>
      <SafeAreaView style={commonStyles.container}>
        <StatusBar
          backgroundColor={
            isPassengerSelector || locationLoader || isLoading
              ? colors.color_whiteTransparent
              : colors.color_f2f2f2
          }
          barStyle={'dark-content'}
        />
        <CustomHeader
          // leftIcon={Icons.DRAWER_LOGO}
          leftText={'Menu'}
          lefticonOnPress={() => navigations.openDrawer()}
          imageSource={Images.APP_LOGO}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={styles.contentContainerStyle}>
          <CustomHeaderLabel />
          {/* BLOG BANNER */}
          <BlogBanner />

          <View style={styles.mainContainer}>
            <CustomRadioButtons handleRadioBtn={handleRadioBtn} />

            <CustomMainStackInput
              label={appConstants.from}
              textInputCustomStyle={
                Platform.OS === 'ios'
                  ? styles.osPlatformInputStyle
                  : styles.item
              }
              error={fromLocationError}
              value={fromLocation}
              onChangeText={onFromChangeHandler}
              onFocus={() => {
                setToDropdown(false);
                // setShoWReturnDateCalendar(false);
                setShowRtDepDateCalendar(false);
                setShowRtRetDateCalendar(false);
                setShowOneWayCalender(false);
              }}
            />
            {fromLocation.length && fromDropdown ? (
              <CustomDropdown
                locationsData={locationsData}
                onDropdownItemPress={(item: any, code: any) =>
                  onDropdownItemPress(item, code, 1)
                }
              />
            ) : null}
            <CustomMainStackInput
              label={appConstants.to}
              value={toLocation}
              textInputCustomStyle={
                Platform.OS === 'ios'
                  ? styles.osPlatformInputStyle
                  : styles.item
              }
              onChangeText={onToChangeHandler}
              error={toLocationError}
              onFocus={() => {
                setFromDropdown(false);
                // setShoWReturnDateCalendar(false);
                setShowRtDepDateCalendar(false);
                setShowRtRetDateCalendar(false);
                setShowOneWayCalender(false);
              }}
            />
            {toLocation.length && toDropdown ? (
              <CustomDropdown
                locationsData={locationsData}
                onDropdownItemPress={(item: any, code: any) =>
                  onDropdownItemPress(item, code, 2)
                }
              />
            ) : null}
            {radio === 2 ? (
              //  round trip Departure  date input..
              <View style={styles.roundTripContainer}>
                <TouchableOpacity
                  onPress={() => {
                    // setShoWReturnDateCalendar(!showReturnDateCalendar);
                    setShowRtDepDateCalendar(!showRtDepDateCalendar);
                    setShowRtRetDateCalendar(false);
                    setToDropdown(false);
                    setFromDropdown(false);
                  }}
                  style={styles.roundTripLabelContainer}>
                  <Text style={styles.roundTripLabelStyle}>
                    {appConstants.deppartureDate}
                  </Text>
                  <View style={styles.roundTripinputLogoContainer}>
                    <Image
                      style={styles.roundTripLogoStyle}
                      source={Icons.CALENDER_LOGO}
                    />
                    <Text style={styles.roundTripInputStyle}>
                      {roundTripDepDate
                        ? moment(roundTripDepDate).format(appConstants.MMDDYYY)
                        : ''}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* round trip Return date input */}
                <TouchableOpacity
                  onPress={() => {
                    // setShoWReturnDateCalendar(!showReturnDateCalendar);
                    setShowRtRetDateCalendar(!showRtRetDateCalendar);
                    setShowRtDepDateCalendar(false);
                    setToDropdown(false);
                    setFromDropdown(false);
                  }}
                  style={styles.roundTripLabelContainer}>
                  <Text style={styles.roundTripLabelStyle}>
                    {appConstants.returnDate}
                  </Text>
                  <View style={styles.roundTripinputLogoContainer}>
                    <Image
                      style={styles.roundTripLogoStyle}
                      source={Icons.CALENDER_LOGO}
                    />
                    <Text style={styles.roundTripInputStyle}>
                      {returnDate
                        ? moment(returnDate).format(appConstants.MMDDYYY)
                        : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              //one way departure date input..
              <CustomDateSelector
                onPress={handleOneWayDepartureDate}
                heading={appConstants.deppartureDate}
                showLeft={true}
                date={
                  oneWaydepartureDate
                    ? moment(oneWaydepartureDate).format(appConstants.MMDDYYY)
                    : ''
                }
              />
            )}
            {showOneWayCalender && (
              <View style={styles.calenderPickerStyle}>
                <CalendarPicker
                  onDateChange={handleDepratureDatePicker}
                  todayBackgroundColor={colors.color_fff}
                  todayTextStyle={styles.todayDateStyle}
                  width={responsiveWidth(90)}
                  startFromMonday={true}
                  minDate={minDate}
                  selectedRangeStartStyle={styles.selectedRangeDateStyle}
                  selectedRangeEndStyle={styles.selectedRangeDateStyle}
                  selectedRangeStyle={styles.rangeStyle}
                  selectedRangeStartTextStyle={styles.selectedRangeTextStyle}
                  selectedRangeEndTextStyle={styles.selectedRangeTextStyle}
                  previousTitleStyle={commonStyles.calendarTextStyle}
                  nextTitleStyle={commonStyles.calendarTextStyle}
                  textStyle={{color: colors.color_000}}
                />
              </View>
            )}
            {/* {showReturnDateCalendar && (
              <View style={styles.calenderPickerStyle}>
                <CalendarPicker
                  onDateChange={handleReturnDatePicker}
                  todayBackgroundColor={colors.color_fff}
                  todayTextStyle={styles.todayDateStyle}
                  width={responsiveWidth(90)}
                  allowRangeSelection={true}
                  minDate={minDate}
                  selectedRangeStartStyle={styles.selectedRangeDateStyle}
                  selectedRangeEndStyle={styles.selectedRangeDateStyle}
                  selectedRangeStyle={styles.rangeStyle}
                  selectedRangeStartTextStyle={styles.selectedRangeTextStyle}
                  selectedRangeEndTextStyle={styles.selectedRangeTextStyle}
                  previousTitleStyle={commonStyles.calendarTextStyle}
                  nextTitleStyle={commonStyles.calendarTextStyle}
                  textStyle={{color: colors.color_000}}
                />
              </View>
            )} */}
            {showRtDepDateCalendar && (
              <View style={styles.calenderPickerStyle}>
                <CalendarPicker
                  onDateChange={handleRountTripDepDate}
                  todayBackgroundColor={colors.color_fff}
                  todayTextStyle={styles.todayDateStyle}
                  width={responsiveWidth(90)}
                  // allowRangeSelection={true}
                  minDate={minDate}
                  selectedRangeStartStyle={styles.selectedRangeDateStyle}
                  selectedRangeEndStyle={styles.selectedRangeDateStyle}
                  selectedRangeStyle={styles.rangeStyle}
                  selectedRangeStartTextStyle={styles.selectedRangeTextStyle}
                  selectedRangeEndTextStyle={styles.selectedRangeTextStyle}
                  previousTitleStyle={commonStyles.calendarTextStyle}
                  nextTitleStyle={commonStyles.calendarTextStyle}
                  textStyle={{color: colors.color_000}}
                />
              </View>
            )}

            {showRtRetDateCalendar && (
              <View style={styles.calenderPickerStyle}>
                <CalendarPicker
                  onDateChange={handleRountTripRetDate}
                  todayBackgroundColor={colors.color_fff}
                  todayTextStyle={styles.todayDateStyle}
                  width={responsiveWidth(90)}
                  // allowRangeSelection={true}
                  minDate={new Date(roundTripDepDate)}
                  selectedRangeStartStyle={styles.selectedRangeDateStyle}
                  selectedRangeEndStyle={styles.selectedRangeDateStyle}
                  selectedRangeStyle={styles.rangeStyle}
                  selectedRangeStartTextStyle={styles.selectedRangeTextStyle}
                  selectedRangeEndTextStyle={styles.selectedRangeTextStyle}
                  previousTitleStyle={commonStyles.calendarTextStyle}
                  nextTitleStyle={commonStyles.calendarTextStyle}
                  textStyle={{color: colors.color_000}}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={() => setIsPassengerSelector(true)}
              style={styles.passengersSelector}>
              <Text style={styles.cabinClassText}>
                {appConstants.cabinClass}
              </Text>
              <Text numberOfLines={1} style={styles.passengerSelectorText}>
                {`${adult}${appConstants.adults}`}
                {children === appConstants.zero
                  ? ''
                  : `, ${children}${appConstants.children}`}
                {infants === appConstants.zero
                  ? ''
                  : `, ${infants}${appConstants.infants}`}
                {cabinItems === appConstants.byPriceLowest
                  ? ''
                  : `, ${cabinItems}`}
              </Text>
            </TouchableOpacity>
            <CustomButton
              label={appConstants.search}
              onPress={handleOnSubmit}
            />
            {isPassengerSelector && (
              <PassengarSelector
                setIsPassengerSelector={setIsPassengerSelector}
                handlePassengerSelector={handlePassengerSelector}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {isLoading && (
        <CustomLoader
          loaderColor={colors.color_0094E6}
          customLoaderStyle={styles.loaderStyle}
          isLoading={isLoading}
        />
      )}
      {showModal && (
        <CustomModal label={modalLabel} onPress={handleModalOkPress} />
      )}
    </>
  );
};

export default Flight;
