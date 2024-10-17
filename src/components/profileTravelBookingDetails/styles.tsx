/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  flightContainerStyle: {
    backgroundColor: colors.color_fff,
    height: responsiveHeight(30),
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 15,
    paddingVertical: 15,
  },
  bookingDateContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  calendarLogoStyle: {
    height: responsiveWidth(3.5),
    width: responsiveWidth(3.5),
  },
  calendarImgContainerStyle: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // width: responsiveWidth(28),
    alignItems: 'center',
  },
  bookingDateTextStyle: {
    color: colors.color_000,
    marginLeft: 5,
  },
  bookingDateStyle: {
    color: colors.color_000,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: responsiveFontSize(1.8),
    marginTop: 5,
  },
  separateLineStyle: {
    width: responsiveWidth(80),
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderColor: colors.color_ABA0A0,
    borderRadius: 10,
  },
  locationDepContainerStyle: {
    flexDirection: 'row',
    // width: responsiveWidth(20),
    // justifyContent: 'space-between',
  },
  locationImgStyle: {
    height: responsiveWidth(4.5),
    width: responsiveWidth(4.5),
  },
  departureDateTextStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  locationDateContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  flightDetailsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(80),
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  flightDetailsViewStyle: {
    marginTop: 8,
  },
  locationTextStyle: {
    color: colors.color_000,
    fontWeight: '500',
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginTop: 5,
  },
  locationStyle: {
    color: colors.color_000,
    marginLeft: 5,
  },
  costStatusTextStyle: {
    marginTop: responsiveHeight(4),
    color: colors.color_000,
    fontSize: responsiveFontSize(1.6),
  },
  priceTextStyle: {
    fontWeight: '500',
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginTop: 2,
  },
  paymentTextStyle: {
    color: colors.color_FF4D4D,
    backgroundColor: colors.color_FFD4D4,
    textAlign: 'center',
    borderRadius: 3,
    marginTop: 2,
  },
  viewDetailsLinearStyle: {
    width: responsiveWidth(85),
    height: responsiveHeight(5),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  viewDetailsButtonContainerStyle: {
    width: responsiveWidth(85),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  viewDetailsTextStyle: {
    color: colors.color_fff,
    marginLeft: 5,
    fontSize: responsiveFontSize(1.9),
  },
  DepDateContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(29),
  },
});
