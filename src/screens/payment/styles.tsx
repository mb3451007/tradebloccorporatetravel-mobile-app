/* eslint-disable prettier/prettier */
import { Fonts } from '@src/assets';
import colors from '@src/constants/colors';
import { Platform, StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.color_fff,
  },
  paymentBackGroundImageStyle: {
    width: responsiveWidth(100),
    alignSelf: 'center',
    borderBottomLeftRadius: responsiveWidth(4),
    borderBottomRightRadius: responsiveWidth(4),
  },
  keyBoardAwareStyle: {
    backgroundColor: colors.color_fff,
    flexGrow: 1,
  },
  iosPlatformFlightBackground: {
    height: responsiveHeight(31),
  },
  paymentHeaderContainerStyle: {
    position: 'absolute',
    width: responsiveWidth(100),
    alignItems: 'center',
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
  cardStyle: {
    alignSelf: 'center',
    // borderRadius: 50,
    marginTop: responsiveHeight(-12),
    width: responsiveWidth(70),
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
  cardDetailsContainerStyle: {
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
    width: responsiveWidth(92),
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardDetailsTextStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.36,
    marginBottom: 15,
  },
  cardInputFieldsStyle: {
    width: 200,
    alignSelf: 'flex-start',
  },
  expCVCContainerStyle: {
    borderWidth: 1,
    width: responsiveWidth(40),
    height: 55,
    borderRadius: 9,
    borderColor: colors.color_C8C5C5,
  },
  expCVCTextStyle: {
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 3,
    color: colors.color_8B8B8B,
  },
  cvcExpDateContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(85),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  textInputsStyle: {
    fontSize: 15,
    marginTop: responsiveHeight(-0.8),
    marginLeft: 5,
    fontFamily: Fonts.ROBOTO_REGULAR,
    // bottom: Platform.OS === 'ios' && -10
    color: colors.color_000,
  },
  cvcContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvcImageStyle: {
    marginRight: 8,
    marginBottom: 15,
  },
  secondTextInput: {
    flex: 1,
  },
  billingDetailsMainContainerStyle: {
    borderWidth: 1,
    width: responsiveWidth(90),
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 13,
    borderColor: colors.color_F6F6F6,
    marginTop: responsiveHeight(5),
  },
  firstLastNameContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(85),
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  nameContainerStyle: {
    borderWidth: 1,
    width: responsiveWidth(40),
    height: 60,
    borderRadius: 9,
    borderColor: colors.color_C8C5C5,
    marginBottom: 15,
  },
  eTicketContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: responsiveWidth(90),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eTicketTextStyle: {
    fontSize: 14,
    color: colors.color_979797,
  },
  customTextInputStyle: {
    borderColor: colors.color_C8C5C5,
    borderWidth: 1,
  },
  billingDetailsTextStyle: {
    fontSize: 18,
    color: colors.color_000,
    fontWeight: '500',
    letterSpacing: 0.36,
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginBottom: 15,
  },
  textInputCustomStyle: {
    fontSize: 15,
    bottom: Platform.OS === 'ios' ? -10 : null,
  },
  textInputHeaderLabelStyle: {
    color: colors.color_8B8B8B,
    fontSize: 14,
  },
  errorMsgStyle: {
    color: colors.color_red,
    marginLeft: 10,
  },
  inputWrapStyle: {
    width: responsiveWidth(85),
    height: 60,
    borderRadius: 13,
    marginTop: -20,
    alignSelf: 'center',
  },
  inputStyle: {
    fontFamily: 'GT-medium',
    color: '#333',
  },
  customLoaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
  textInputSecStyle: {
    marginLeft: responsiveWidth(-1.5),
    backgroundColor: 'grey',
  },
  countryFlagStyle: {
    marginTop: 0,
    marginRight: responsiveWidth(-2),
  },
});
