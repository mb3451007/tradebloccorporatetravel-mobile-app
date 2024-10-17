/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomHeader from '@src/components/customHeader/customHeader';
import colors from '@src/constants/colors';
import {Icons, Images} from '@src/assets';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeaderLabel from '@src/components/customHeaderLabel/customHeaderLabel';
import styles from './styles';
import BlogBanner from '@src/components/blogBanner/blogBanner';
import appConstants, {
  flashMessageConstants,
  validations,
} from '@src/constants/appConstants';
import CustomMainStackInput from '@src/components/customTextInput(mainStack)/customMainStackInput';
import CustomDropdown from '@src/components/customDropdown/customDropdown';
import {RootState} from '@src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import commonMethods from '@src/utility/commonMethods';
import regex from '@src/utility/regex';
import {fetchLocations} from '../flight/slice/flightSlice';
import CustomLoader from '@src/components/customLoader/customLoader';
import CarInputs from '@src/components/carInputs/carInputs';
import CalendarPicker from 'react-native-calendar-picker';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Car = () => {
  const navigations: any = useNavigation();
  // const dispatch = useDispatch();
  // const [isDiscountApplied, setIsDiscountApplied] = useState<boolean>(false);
  // const [pickupDropdown, setPickupDropdown] = useState<boolean>(false);
  // const [pickupLocation, setPickupLocation] = useState<string>('');
  // const [pickupLocationLoader, setPickupLocationLoader] =
  //   useState<boolean>(false);
  // const [locCode, setLocCode] = useState<string>('');
  // const [dates, setDates] = useState<any>({
  //   departureDate: '',
  //   returnDate: '',
  //   depCalendarOpen: false,
  //   retCalendarOpen: false,
  // });
  // const [time, setTime] = useState<any>({
  //   departureTime: '',
  //   returnTime: '',
  //   depTimeSelector: false,
  //   retTimeSelector: false,
  // });
  // const [discount, setDiscount] = useState<any>({
  //   discountType: '',
  //   discountCompany: '',
  //   discountCode: '',
  // });
  // const locationsData: any = useSelector(
  //   (state: RootState) => state.flight.locationsData,
  // );

  // Loader for the location data
  // const locationLoader: any = useSelector(
  //   (state: RootState) => state.flight.isLoading,
  // );

  // useEffect(() => {
  //   setPickupLocationLoader(locationLoader);
  // }, [locationLoader]);

  // method to fetch the from location date..
  // const handlePickupLocations = (text: string) => {
  //   setLocCode('');
  //   if (text === '') {
  //     commonMethods.flashMessage(
  //       validations.selectLocation,
  //       flashMessageConstants.danger,
  //     );
  //     setPickupLocation(text);
  //     return;
  //   } else if (!regex.stringRegex.test(text)) {
  //     commonMethods.flashMessage(
  //       validations.onlyCharacters,
  //       flashMessageConstants.danger,
  //     );
  //     return;
  //   } else {
  //     const params: any = {
  //       term: text,
  //       locale: appConstants.en_US,
  //       city: appConstants.city,
  //       airport: appConstants.airport,
  //       activeOnly: false,
  //       sort: appConstants.nameAPI,
  //     };
  //     setPickupLocationLoader(false);
  //     dispatch(fetchLocations(params));
  //     setPickupLocation(text);
  //     setPickupDropdown(true);
  //   }
  // };

  // const handleSelectLocation = (item: any, code: any) => {
  //   console.log(item, code, 'item, code');
  //   setPickupLocation(item);
  //   setLocCode(code);
  //   setPickupDropdown(false);
  // };

  // const handleTouchableWithoutFeedback = () => {
  //   console.log('--');

  //   setDates(prevState => {
  //     return {
  //       ...prevState,
  //       depCalendarOpen: false,
  //       retCalendarOpen: false,
  //     };
  //   });
  // };

  return (
    <>
      <SafeAreaView>
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
        <KeyboardAwareScrollView>
          <CustomHeaderLabel />
          <BlogBanner />
          <View style={styles.comingSoonViewStyle}>
            <Text style={styles.comingSoonTextStyle}>Coming Soon</Text>
          </View>
          {/* <View style={styles.carInputContainerStyle}> */}
          {/* checks container */}
          {/* <View style={styles.checksContainerStyle}>
              <View style={styles.checksSubContainerStyle}>
                <ImageBackground
                  style={styles.circleImgBgContainerStyle}
                  source={Icons.carBlueCheckBg}>
                  <Image source={Icons.carRightImg} />
                </ImageBackground>
                <Text style={styles.checksTextStyle}>
                  {appConstants.sameAsPickup}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsDiscountApplied(!isDiscountApplied)}
                activeOpacity={appConstants.activeOpacity}
                style={styles.checksSubContainerStyle}>
                {isDiscountApplied ? (
                  <ImageBackground
                    style={styles.circleImgBgContainerStyle}
                    source={Icons.carBlueCheckBg}>
                    <Image source={Icons.carRightImg} />
                  </ImageBackground>
                ) : (
                  <View style={styles.circleViewStyle} />
                )}

                <Text style={styles.checksTextStyle}>
                  {appConstants.discountCode}
                </Text>
              </TouchableOpacity>
            </View> */}
          {/* car pickup input field */}
          {/* <CustomMainStackInput
              label={appConstants.pickup}
              leftIcon={Icons.carLocLogo}
              value={pickupLocation}
              leftIconStyle={styles.pickupLeftIconStyle}
              flag={''}
              countryCode={''}
              onChangeText={handlePickupLocations}
            /> */}

          {/* {pickupLocation.length && pickupDropdown ? (
              <CustomDropdown
                locationsData={locationsData}
                onDropdownItemPress={(item: any, code: any) =>
                  handleSelectLocation(item, code)
                }
              />
            ) : null} */}
          {/* <View>
              <View style={styles.carInputSubContainerStyle}>
                <View>
                  <CarInputs
                    headerLabel={appConstants.deppartureDate}
                    leftIcon={Icons.CALENDER_LOGO}
                    value={'Value'}
                  />
                  <CarInputs
                    headerLabel={appConstants.returnDate}
                    leftIcon={Icons.CALENDER_LOGO}
                    value={'Value'}
                  />
                  {isDiscountApplied && (
                    <CarInputs
                      headerLabel={appConstants.discountType}
                      leftIcon={Icons.DROPDOWN_ARROW}
                      customLeftIconImgStyle={styles.discountLeftIconImgStyle}
                      value={'Value'}
                    />
                  )}
                </View>

                <View>
                  <CarInputs
                    headerLabel={appConstants.deppartureTime}
                    leftIcon={Icons.carTimeLogo}
                    value={'Value'}
                  />
                  <CarInputs
                    headerLabel={appConstants.returnTime}
                    leftIcon={Icons.carTimeLogo}
                    value={'Value'}
                  />
                  {isDiscountApplied && (
                    <CarInputs
                      headerLabel={appConstants.discountCompany}
                      leftIcon={Icons.DROPDOWN_ARROW}
                      customLeftIconImgStyle={styles.discountLeftIconImgStyle}
                      value={'Value'}
                    />
                  )}
                </View>
              </View>
            </View> */}
          {/* {isDiscountApplied && (
              <CustomMainStackInput
                leftIcon={Icons.carDiscountCodeImg}
                leftIconTintColor={colors.color_0094E6}
                flag={''}
                label={appConstants.discountCode}
              />
            )} */}
          {/* </View> */}
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {/* {pickupLocationLoader && (
        <CustomLoader
          loaderColor={colors.color_0094E6}
          customLoaderStyle={styles.loaderStyle}
          isLoading={pickupLocationLoader}
        />
      )} */}
      {/* {!dates.depCalendarOpen && (
        <TouchableWithoutFeedback onPress={handleTouchableWithoutFeedback}>
          <View
            style={[
              styles.calendarViewContainerStyle,
              StyleSheet.absoluteFillObject,
            ]}>
            <View style={styles.calendarViewStyle}>
              <CalendarPicker
                // onDateChange={handleDepratureDatePicker}
                todayBackgroundColor={colors.color_fff}
                // todayTextStyle={styles.todayDateStyle}
                width={responsiveWidth(80)}
                startFromMonday={true}
                // minDate={minDate}
                // selectedRangeStartStyle={styles.selectedRangeDateStyle}
                // selectedRangeEndStyle={styles.selectedRangeDateStyle}
                // selectedRangeStyle={styles.rangeStyle}
                // selectedRangeStartTextStyle={styles.selectedRangeTextStyle}
                // selectedRangeEndTextStyle={styles.selectedRangeTextStyle}
                // previousTitleStyle={commonStyles.calendarTextStyle}
                // nextTitleStyle={commonStyles.calendarTextStyle}
                textStyle={{color: colors.color_000}}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )} */}
    </>
  );
};

export default Car;
