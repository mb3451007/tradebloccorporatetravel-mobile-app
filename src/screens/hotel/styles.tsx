/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '@src/constants/colors';
import { Fonts } from '@src/assets';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: responsiveWidth(3),
  },
  mainContainer: {
    backgroundColor: colors.color_fff,
    borderRadius: responsiveWidth(4),
    marginTop: responsiveHeight(1),
    padding: 10,
  },
  osPlatformInputStyle: {
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(4),
  },
  item: {
    // paddingBottom: responsiveHeight(1),
  },
  roundTripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginBottom: responsiveWidth(5),
  },
  roundTripLabelStyle: {
    marginLeft: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.5),
    color: colors.color_B4B4B4,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight: '500',
    marginBottom: 6,
  },
  roundTripLogoStyle: {
    marginLeft: responsiveWidth(2.5),
    height: 16.5,
    width: 16.5,
  },
  roundTripLabelContainer: {
    borderWidth: 1.5,
    width: responsiveWidth(40),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
    borderColor: colors.color_EEEEEE,
  },
  roundTripinputLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  roundTripInputStyle: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
    color: colors.color_000,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight: '600',
  },
  calenderPickerStyle: {
    elevation: 0.5,
  },
  todayDateStyle: {
    color: colors.color_0094E6,
  },
  selectedRangeDateStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(5),
    backgroundColor: colors.color_0094E6,
  },
  rangeStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    backgroundColor: colors.color_skyblue,
    borderRadius: responsiveWidth(5),
  },
  selectedRangeTextStyle: {
    color: colors.color_fff,
  },
  passengersSelector: {
    alignSelf: 'center',
    borderWidth: responsiveWidth(0.5),
    width: responsiveWidth(85),
    height: responsiveHeight(9),
    borderRadius: responsiveWidth(2),
    borderColor: colors.color_EEEEEE,
    marginBottom: responsiveHeight(2),
  },
  passengerSelectorText: {
    fontSize: responsiveFontSize(2.1),
    color: colors.color_000,
    marginLeft: responsiveWidth(3),
    textTransform: 'lowercase',
  },
  cabinClassText: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    color: colors.color_9e9e9e,
  },
  loaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
  calendarTextStyle: {
    color: colors.color_000,
  },
  leftIconStyle: {
    top: responsiveHeight(0.8),
    right: responsiveHeight(-0.5),
  }
});
