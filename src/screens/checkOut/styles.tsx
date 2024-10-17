/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {Platform, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  keyBoardAwareStyle: {
    backgroundColor: colors.color_fff,
    flexGrow: 1,
  },
  checkOutHeaderContainerStyle: {
    position: 'absolute',
    width: responsiveWidth(100),
    alignItems: 'center',
  },
  nodataTextStyle:{
    color:colors.color_000,
    marginLeft: responsiveHeight(1),
    marginTop: responsiveHeight(-2),
    marginBottom: responsiveHeight(1),
      },
  checkOutBackGroundImageStyle: {
    height: responsiveHeight(27),
    width: responsiveWidth(100),
    alignSelf: 'center',
    borderBottomLeftRadius: responsiveWidth(4),
    borderBottomRightRadius: responsiveWidth(4),
  },
  iosPlatformFlightBackground: {
    height: responsiveHeight(31),
  },
  checkOutTicketContainer: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerLeftIconStyle: {
    height: 35,
    width: 35,
  },
  headerLabelStyle: {
    color: colors.color_fff,
    fontWeight: '500',
    fontSize: 16,
    flexShrink: 0,
  },
  stepfromStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(36.1),
  },
  checkOutTicketStyle: {
    marginTop: responsiveHeight(-13),
  },
  checkOutDetailedLineStyle: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(3),
  },
  roundViewStyles: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: colors.color_EBEBEB,
  },
  ticketAirlinesContainer: {
    flexDirection: 'row',
    width: responsiveWidth(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarStyle: {
    height: responsiveHeight(9),
    width: responsiveWidth(95),
    alignSelf: 'center',
    marginTop: 5,
    marginHorizontal: Platform.OS === 'android' ? 0 : 10,
    marginBottom: Platform.OS === 'android' ? responsiveHeight(0.5) : 20,
    borderRadius: 25,
    backgroundColor: colors.color_fff,
    shadowColor: colors.color_000,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  userDetailsContainerStyle: {
    width: responsiveWidth(90),
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
    borderRadius: 16,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  priceContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceTextStyle: {
    color: colors.color_000,
    fontSize: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '500',
  },
  nonRefTextStyle: {
    backgroundColor: colors.color_FFD4D4,
    height: 25,
    width: 113,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.color_FF4D4D,
    borderRadius: 5,
    fontFamily: Fonts.ROBOTO_REGULAR,
    letterSpacing: 0.26,
    fontSize: 14,
  },
  checkOutLineStyle: {
    width: responsiveWidth(82),
    marginTop: 10,
  },
  genderContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(82),
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  UnCheckedView: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color_BBBBBB,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkedView: {
    width: 12,
    height: 12,
    backgroundColor: colors.color_0094E6,
    borderRadius: 3,
  },

  genderButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: responsiveWidth(18),
  },
  seatMapButtonContainerStyle: {
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(5),
  },
  seatMapButtonStyle: {
    width: 81,
    height: 31,
    borderRadius: 7,
    alignSelf: 'flex-end',
  },
  seatMapButtonLabelStyle: {
    fontSize: 13,
  },
  genderTextStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 14,
    letterSpacing: 0.26,
    fontWeight: '400',
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  calendarStyle: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
  },
  flightSessionContainerStyle: {
    height: 48,
    width: responsiveWidth(85),
    alignSelf: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    borderColor: colors.color_FF4D4D,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningImageContainerStyle: {
    height: 44,
    width: 50,
    backgroundColor: colors.color_FF7A7A,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 0.4,
  },
  warningImageStyle: {
    opacity: 1,
  },
  unfortunatelySessionTextStyle: {
    color: colors.color_EC3F3F,
    marginRight: 10,
  },
  priceDetailsContainerStyle: {
    width: responsiveWidth(100),
    backgroundColor: colors.color_fff,
    height: responsiveHeight(25),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0.5,
    elevation: 10,
  },
  priceSubContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  bottomPriceTextStyle: {
    color: colors.color_000,
    fontWeight: '500',
    letterSpacing: 0.28,
    fontSize: 14,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  priceNextButtonStyle: {
    width: 188,
    height: 43,
    justifyContent: 'center',
  },
  mainPriceTextStyle: {
    fontSize: 25,
    color: colors.color_0094E6,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  mainPriceSubTextStyle: {
    fontSize: 13,
    color: colors.color_B2B2B2,
  },
  mainPriceContainer: {
    alignItems: 'center',
  },
  seatMapLoaderStyle: {
    marginRight: 15,
  },
  errorLabelStyle: {
    alignSelf: 'center',
    width: responsiveWidth(80),
    fontSize: responsiveFontSize(1.5),
    color: colors.color_red,
    fontWeight: '500',
    marginLeft: 10,
  },
  selectTicketModalContainerStyle: {
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(-13),
  },
  ticketFlightNamesContainer: {
    flexDirection: 'row',
    width: responsiveWidth(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketDetailedLineStyle: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(3),
  },
  roundTripLineContainer: {
    position: 'absolute',
    marginLeft: responsiveWidth(25),
    top: responsiveHeight(40),
  },
  roundTripTodestination: {
    marginTop: responsiveHeight(3),
  },
  viewColor: {},
  textInputIosStyle: {
    bottom: -10,
  },
  textInputIosSecStyle: {
    bottom: -15,
  },
  customLoaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
  nationalityInputStyle: {
    marginLeft: responsiveWidth(-1.5),
  },
  countryFlagStyle: {
    marginTop: 15,
    marginRight: responsiveWidth(-2),
  },
});
