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
    marginVertical: 10,
    borderRadius: 15,
  },
  bookingDateContainerStyle: {
    width: responsiveWidth(80),
    alignSelf: 'center',
  },
  calendarLogoStyle: {
    marginRight: 5,
    height: responsiveHeight(1.5),
    width: responsiveWidth(3),
  },
  calendarImgContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',

    // left: responsiveHeight(3),
  },
  detailsLogoImgContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    left: responsiveHeight(3),
  },
  bookingDateTextStyle: {
    color: colors.color_000,
    marginLeft: 5,
  },
  noTextStyle: {
    color: colors.color_4F4F4F,
    fontWeight: '300',
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: responsiveFontSize(1.5),
    left: responsiveHeight(3),
  },
  noTextValue: {
    color: colors.color_000,
    fontWeight: '700',
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: responsiveFontSize(1.5),
    left: responsiveHeight(3),
    marginVertical: 5,
  },
  phonenoTextStyle: {
    color: colors.color_4F4F4F,
    fontWeight: '300',
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: responsiveFontSize(1.5),
  },
  bookingDateStyle: {
    color: colors.color_004B74,
    fontWeight: '700',
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: responsiveFontSize(1.5),
    marginTop: 5,
  },
  separateLineStyle: {
    width: responsiveWidth(42.7),
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderColor: colors.color_ABA0A0,
    borderRadius: 10,
  },
  locationDepContainerStyle: {
    flexDirection: 'row',
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: colors.color_F87748,
  },
  viewDetailsButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(75),
    height: responsiveHeight(5),
    alignItems: 'center',
    alignSelf: 'center',
  },
  DetailsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(85),
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: responsiveHeight(2),
    backgroundColor: colors.color_fff,
  },
  flightDateViewStyle: {
    width: responsiveWidth(85),
    backgroundColor: colors.color_fff,
    paddingBottom: 10,
    borderBottomLeftRadius: responsiveHeight(2),
    borderBottomRightRadius: responsiveHeight(2),
  },
  viewDetailsTextStyle: {
    color: colors.color_fff,
    marginLeft: 5,
    fontSize: responsiveFontSize(1.5),
  },
  DepDateContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(29),
  },
});
