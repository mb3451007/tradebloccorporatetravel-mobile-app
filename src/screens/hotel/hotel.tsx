/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
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
import {navigate} from '@src/navigation/navigationMethods';
import navigationConstants from '@src/constants/navigationConstants';
import CustomHeaderLabel from '@src/components/customHeaderLabel/customHeaderLabel';
import {useDispatch, useSelector} from 'react-redux';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import appConstants, {
  errorMessage,
  flashMessageConstants,
  statusCode,
  validations,
} from '@src/constants/appConstants';
import CalendarPicker from 'react-native-calendar-picker';
import CustomDropdown from '@src/components/customDropdown/customDropdown';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {RootState} from '@src/redux/store';
import styles from './styles';
import CustomButton from '@src/components/customButton/customButton';
import moment from 'moment';
import commonMethods from '@src/utility/commonMethods';
import regex from '@src/utility/regex';
import customHooks from '@src/utility/customHooks';
import {fetchLocations} from '../flight/slice/flightSlice';
import HotelRoomSelector from '@src/components/customHotelRoomSelector/hotelRoomSelector';
import {fetchHotels, hotelData} from './slice/hotelSlice';
import CustomLoader from '@src/components/customLoader/customLoader';
import CustomModal from '@src/components/customModal/customModal';
import BlogBanner from '@src/components/blogBanner/blogBanner';

const Hotel = () => {
  const navigations: any = useNavigation();
  const dispatch = useDispatch();
  const [barSelectorId, setBarSelectorId] = useState<number>(1);
  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelLocationDropdown, setHotelLocationDropdown] = useState(false);
  const [hotelLocationError, setHotelLocationError] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [hotelLatLong, setHotelLatLong] = useState('');
  const [dateCalender, setDateCalender] = useState(false);
  const [checkInCalender, setCheckInCalender] = useState(false);
  const [checkOutCalender, setCheckOutCalender] = useState(false);
  const [roomSelector, setRoomSelector] = useState(false);
  const [origin, setOrigin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const minDate = new Date();
  const [roomInfo, setRoomImfo] = useState<any>();

  const [roomCount, setRoomCount] = useState<any>();
  const [adultCount, setAdultCount] = useState<any>();
  const [childrenCount, setChildrenCount] = useState<any>();
  // Stored data of locations FROM and TO
  const locationsData: any = useSelector(
    (state: RootState) => state.flight.locationsData,
  );
  const hotelsData: any = useSelector(
    (state: RootState) => state.hotelSearch.hotelsData,
  );
  const prevDataHotelsData: any = customHooks.usePrevious(hotelsData);

  // Loader for the hotel data
  const hotelSearchLoader: any = useSelector(
    (state: RootState) => state.hotelSearch.isLoading,
  );

  // Loader for the location data
  const locationLoader: any = useSelector(
    (state: RootState) => state.flight.isLoading,
  );

  const hotelErr: any = useSelector(
    (state: RootState) => state.hotelSearch.err,
  );

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

  const startDate = moment(checkInDate).format(appConstants.YYYYMMDD);
  const endDate = moment(checkoutDate).format(appConstants.YYYYMMDD);

  const [isFailure, setIsFailure] = useState(false);
  const [err, setErr] = useState('');

  // hook to navigate on hotel search screen..
  useEffect(() => {
    if (hotelsData.data !== prevDataHotelsData?.data) {
      if (hotelsData.statusCode === statusCode.Code_200) {
        setIsLoading(false);
        if (hotelsData.data) {
          navigate(
            navigationConstants?.HOTEL_LIST,
            //   , {
            //   hotelLocation,
            //   startDate,
            //   endDate,
            //   roomInfo,
            //   origin,
            //   hotelLatLong,
            //   rooms,
            //   checkInDate,
            //   checkoutDate,
            // }
          );

          // const dataToNav = {
          //   hotelLocation,
          //   startDate,
          //   endDate,
          //   roomInfo,
          //   origin,
          //   hotelLatLong,
          //   rooms,
          //   checkInDate,
          //   checkoutDate,
          // };
          const roomsCopydata = JSON.parse(JSON.stringify(rooms));
          dispatch(
            hotelData({
              hotelLocation,
              startDate,
              endDate,
              roomInfo,
              origin,
              hotelLatLong,
              rooms: roomsCopydata,
              checkInDate,
              checkoutDate,
            }),
          );
        }
      }
    }
    if (hotelErr?.statusCode === statusCode.Code_500) {
      setIsFailure(true);
      setErr(
        hotelErr?.errMsg === 'API Failure!'
          ? hotelErr?.error?.Errors?.Error?._ShortText
          : errorMessage?.errorText,
      );
    }
    if (hotelErr?.message === 'Endpoint request timed out') {
      setIsFailure(true);
      setErr('Please try again');
    }
  }, [hotelsData, hotelErr]);

  //Method to clear the state on blur..
  const handleClearState = () => {
    setIsLoading(false);
    setBarSelectorId(1);
    setHotelLocationDropdown(false);
    // setDateCalender(false);
    setCheckInCalender(false);
    setCheckOutCalender(false);
    setRoomSelector(false);
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

  // Hook for hotel loader..
  useEffect(() => {
    setIsLoading(hotelSearchLoader);
  }, [hotelSearchLoader]);

  // method to fetch the from location date..
  // const onFromChangeHandler = (text: string) => {
  const handleLocationChange = (text: string) => {
    setOrigin('');
    if (text === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
      setHotelLocation(text);
      return;
    } else if (!regex.stringRegex.test(text)) {
      commonMethods.flashMessage(
        validations.onlyCharacters,
        flashMessageConstants.danger,
      );
      return;
    } else {
      const params: any = {
        term: text,
        locale: appConstants.en_US,
        city: appConstants.city,
        // airport: appConstants.airport,
        activeOnly: false,
        sort: appConstants.nameAPI,
      };
      setIsLoading(false);
      setHotelLocationError('');
      dispatch(fetchLocations(params));
      setHotelLocation(text);
      setHotelLocationDropdown(true);
    }
  };

  //Method to select the select item from drop down..
  const onDropdownItemPress = (
    item: any,
    code: any,
    key: number,
    location: any,
  ) => {
    if (key === 1) {
      setHotelLocationDropdown(item);
      if (item && code) {
        setHotelLocation(item);
        setOrigin(code);
        setHotelLatLong(location);
        setHotelLocationDropdown(false);
      } else {
        setHotelLocation('');
      }
    }
  };

  const handleCheckInDate = (date: any) => {
    setCheckInDate(date);
    setCheckInCalender(false);
  };

  const handleCheckOutDate = (date: any) => {
    setCheckoutDate(date);
    setCheckOutCalender(false);
  };

  // Method for search hotel button press..
  const handleOnSubmit = () => {
    if (hotelLocation === '') {
      commonMethods.flashMessage(
        validations.selectLocation,
        flashMessageConstants.danger,
      );
    } else if (checkInDate === '') {
      commonMethods.flashMessage(
        validations.selectDate,
        flashMessageConstants.danger,
      );
    } else if (checkoutDate === '') {
      commonMethods.flashMessage(
        validations.selectDate,
        flashMessageConstants.danger,
      );
    } else if (checkInDate > checkoutDate) {
      commonMethods.flashMessage(
        validations.checkInDateNotGreaterThenCheckout,
        flashMessageConstants.danger,
      );
    } else {
      const requestedData = rooms?.map(({id, ...rest}: any) => rest);
      const details = {
        chainCode: '',
        cityCode: origin,
        contents: [6, 19, 22, 15, 23],
        currency: 'USD',
        dateEnd: moment(checkoutDate).format(appConstants.YYYYMMDD),
        dateStart: moment(checkInDate).format(appConstants.YYYYMMDD),
        filters: {},
        hotelCode: '',
        hotelContext: '',
        hotelName: '',
        rooms:
          rooms === undefined
            ? [{adults: 1, children: 0, childrenAge: 7}]
            : requestedData,
      };
      console.log(details, 'details');
      dispatch(fetchHotels({details: details, session: false}));
    }
  };

  const [rooms, setRooms] = useState<any>([
    {id: 1, adults: 1, children: 0, childrenAge: 7},
  ]);
  console.log(rooms, 'rooms');

  const noOfRooms = rooms?.length;

  const noOfAdults = rooms?.reduce((sum: any, obj: any) => sum + obj.adults, 0);

  const noOfChildren = rooms?.reduce(
    (sum: any, obj: any) => sum + obj.children,
    0,
  );

  const handleAddRoom = () => {
    const newRoom = {
      id: rooms[rooms.length - 1]?.id + 1,
      adults: 1,
      children: 0,
      childrenAge: 7,
    };
    setRooms([...rooms, newRoom]);
  };
  const handleCountOfRoomsAdultsChildren = () => {
    setRoomCount(noOfRooms);
    setAdultCount(noOfAdults);
    setChildrenCount(noOfChildren);
  };

  const handleModalConfirm = () => {
    setRoomSelector(false);
    setRoomImfo(rooms);
    handleCountOfRoomsAdultsChildren();
  };

  const handleRemoveRoom = (roomId: number) => {
    const updatedRooms = rooms?.filter((room: any) => room?.id !== roomId);
    setRooms(updatedRooms);
  };

  // Business logic to handle the adult increament numbers
  const handleAdultIncrement = (roomIndex: any) => {
    console.log(roomIndex, 'roomindex');

    // setRooms((prevRoom: any) => {
    //   const updatedRooms = [...prevRoom];
    //   const room = updatedRooms[roomIndex];
    //   console.log(room, 'room');

    //   if (room?.adults + 1 <= 9) {
    //     room.adults += 1;
    //   }
    //   return updatedRooms;
    // });
    setRooms((prevRoom: any) => {
      const updatedRooms = [...prevRoom];
      if (updatedRooms[roomIndex].adults + 1 <= 9) {
        updatedRooms[roomIndex] = {
          ...updatedRooms[roomIndex],
          adults: updatedRooms[roomIndex].adults + 1,
        };
      }
      return updatedRooms;
    });
  };

  // Business logic to handle the adult decreament numbers
  const handleAdultDecrement = (roomIndex: any) => {
    setRooms((prevRoom: any) => {
      const updatedRooms = [...prevRoom];
      if (updatedRooms[roomIndex].adults - 2 >= 0) {
        updatedRooms[roomIndex] = {
          ...updatedRooms[roomIndex],
          adults: updatedRooms[roomIndex].adults - 1,
        };
      }
      return updatedRooms;
    });
    // setRooms((prevRoom: any) => {
    //   const updatedRooms = [...prevRoom];
    //   const room = updatedRooms[roomIndex];
    //   if (room?.adults - 2 >= 0) {
    //     room.adults -= 1;
    //   }
    //   return updatedRooms;
    // });
  };

  // Business logic to handle the child increament numbers
  const handleChildrenIncrement = (roomIndex: any) => {
    // setRooms((prevRoom: any) => {
    //   const updatedRooms = [...prevRoom];
    //   const room = updatedRooms[roomIndex];
    //   console.log(room, 'room');

    //   if (room?.children + 1 <= 9) {
    //     console.log(room?.children + 1 <= 9, 'room?.children + 1 <= 9');

    //     room.children += 1;
    //   }
    //   return updatedRooms;
    // });
    setRooms((prevRoom: any) => {
      const updatedRooms = [...prevRoom];
      if (updatedRooms[roomIndex].children + 1 <= 9) {
        updatedRooms[roomIndex] = {
          ...updatedRooms[roomIndex],
          children: updatedRooms[roomIndex].children + 1,
        };
      }
      return updatedRooms;
    });
  };

  // Business logic to handle the child decreament numbers
  const handleChildrenDecrement = (roomIndex: any) => {
    setRooms((prevRoom: any) => {
      const updatedRooms = [...prevRoom];
      if (updatedRooms[roomIndex].children - 1 >= 0) {
        updatedRooms[roomIndex] = {
          ...updatedRooms[roomIndex],
          children: updatedRooms[roomIndex].children - 1,
        };
      }
      return updatedRooms;
    });
    // setRooms((prevRoom: any) => {
    //   const updatedRooms = [...prevRoom];
    //   const room = updatedRooms[roomIndex];

    //   if (room?.children - 1 >= 0) {
    //     room.children -= 1;
    //   }
    //   return updatedRooms;
    // });
  };

  const handleCancelRoomSelectorModal = () => {
    let result =
      roomInfo &&
      roomInfo?.filter(
        (el: any) => !rooms.some((item: any) => item.id === el.id),
      );
    if (result === undefined) {
      setRooms([{id: 1, adults: 1, children: 0, childrenAge: 7}]);
    } else {
      setRooms([...roomInfo]);
    }
    setRoomSelector(false);
  };
  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar
        backgroundColor={colors.color_E9E9E9}
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
        <BlogBanner />
        <View style={styles.mainContainer}>
          <CustomMainStackInput
            label={appConstants.location}
            leftIcon={Icons.LOCATION_LOGO}
            leftIconStyle={Platform.OS === 'ios' && styles.leftIconStyle}
            textInputCustomStyle={
              Platform.OS === 'ios' ? styles.osPlatformInputStyle : styles.item
            }
            error={hotelLocationError}
            value={hotelLocation}
            flag={''}
            countryCode={''}
            onChangeText={handleLocationChange}
            onFocus={() => {
              // setDateCalender(false);
              setCheckInCalender(false);
              setCheckOutCalender(false);
            }}
          />
          {hotelLocation.length && hotelLocationDropdown ? (
            <CustomDropdown
              locationsData={locationsData}
              onDropdownItemPress={(item: any, code: any, location: any) =>
                onDropdownItemPress(item, code, 1, location)
              }
            />
          ) : null}
          <View style={styles.roundTripContainer}>
            <TouchableOpacity
              onPress={() => {
                // setDateCalender(!dateCalender);
                setCheckInCalender(!checkInCalender);
                setCheckOutCalender(false);
                setHotelLocationDropdown(false);
              }}
              style={styles.roundTripLabelContainer}>
              <Text style={styles.roundTripLabelStyle}>
                {appConstants.checkIn}
              </Text>
              <View style={styles.roundTripinputLogoContainer}>
                <Image
                  style={styles.roundTripLogoStyle}
                  source={Icons.CALENDER_LOGO}
                />
                <Text style={styles.roundTripInputStyle}>
                  {checkInDate
                    ? moment(checkInDate).format(appConstants.MMDDYYY)
                    : ''}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // setDateCalender(!dateCalender);
                setCheckOutCalender(!checkOutCalender);
                setCheckInCalender(false);
                setHotelLocationDropdown(false);
              }}
              style={styles.roundTripLabelContainer}>
              <Text style={styles.roundTripLabelStyle}>
                {appConstants.checkOut}
              </Text>
              <View style={styles.roundTripinputLogoContainer}>
                <Image
                  style={styles.roundTripLogoStyle}
                  source={Icons.CALENDER_LOGO}
                />
                <Text style={styles.roundTripInputStyle}>
                  {checkoutDate
                    ? moment(checkoutDate).format(appConstants.MMDDYYY)
                    : ''}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* {dateCalender && (
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
          {checkInCalender && (
            <View style={styles.calenderPickerStyle}>
              <CalendarPicker
                onDateChange={handleCheckInDate}
                todayBackgroundColor={colors.color_fff}
                todayTextStyle={styles.todayDateStyle}
                width={responsiveWidth(90)}
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

          {checkOutCalender && (
            <View style={styles.calenderPickerStyle}>
              <CalendarPicker
                onDateChange={handleCheckOutDate}
                todayBackgroundColor={colors.color_fff}
                todayTextStyle={styles.todayDateStyle}
                width={responsiveWidth(90)}
                minDate={new Date(checkInDate)}
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
            onPress={() => {
              let result =
                roomInfo &&
                roomInfo?.filter(
                  (el: any) => !rooms.some((item: any) => item.id === el.id),
                );
              if (result?.length > 0) {
                setRooms([...rooms, ...result]);
              }
              setRoomSelector(true);
            }}
            style={styles.passengersSelector}>
            <Text style={styles.cabinClassText}>{appConstants.rooms}</Text>
            {roomInfo === undefined ? (
              <Text numberOfLines={1} style={styles.passengerSelectorText}>
                {appConstants.room} {1}, {appConstants.adult} {1},{''}
                {appConstants.children} {0}
              </Text>
            ) : (
              <Text numberOfLines={1} style={styles.passengerSelectorText}>
                {appConstants.room} {roomCount}, {appConstants.adult}{' '}
                {adultCount}, {appConstants.children} {childrenCount}
              </Text>
            )}
          </TouchableOpacity>
          <CustomButton
            label={appConstants.hotelSearch}
            onPress={handleOnSubmit}
          />
          {roomSelector && (
            <HotelRoomSelector
              setRoomSelector={setRoomSelector}
              rooms={rooms}
              handleAddRoom={handleAddRoom}
              handleRemoveRoom={handleRemoveRoom}
              handleAdultIncrement={handleAdultIncrement}
              handleAdultDecrement={handleAdultDecrement}
              handleChildrenIncrement={handleChildrenIncrement}
              handleChildrenDecrement={handleChildrenDecrement}
              noOfRooms={noOfRooms}
              handleModalConfirm={handleModalConfirm}
              handleRoomSelector={undefined}
              handleCancelRoomSelectorModal={handleCancelRoomSelectorModal}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
      {isLoading && (
        <CustomLoader
          loaderColor={colors.color_0094E6}
          customLoaderStyle={styles.loaderStyle}
          isLoading={isLoading}
        />
      )}
      {isFailure && (
        <CustomModal label={err} onPress={() => setIsFailure(false)} />
      )}
    </SafeAreaView>
  );
};
export default Hotel;
