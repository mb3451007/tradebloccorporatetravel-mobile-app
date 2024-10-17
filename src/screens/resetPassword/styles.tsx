/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  OTPTextHeader: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: '600',
    color: colors.color_fff,
    marginTop: responsiveHeight(3),
    fontFamily: Fonts.JAKARTA_BOLD,
  },
  OTPTextSubHeader: {
    fontSize: responsiveFontSize(2.2),
    width: responsiveWidth(90),
    color: colors.color_fff,
    marginTop: responsiveWidth(2),
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  codeHasSentTextContainer: {
    backgroundColor: colors.color_fff,
    height: responsiveHeight(8),
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(4),
  },
  codeHasSentText: {
    fontSize: responsiveFontSize(2.2),
    color: colors.color_green,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  emailTextStyle: {
    color: colors.color_000,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  otpInputFields: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    marginTop: responsiveHeight(5),
  },
  codeInputFiledStyle: {
    backgroundColor: colors.color_transpShadow,
    borderRadius: responsiveWidth(2),
    borderWidth: responsiveWidth(0.1),
    marginLeft: responsiveWidth(3.5),
    color: colors.color_fff,
    fontSize: responsiveFontSize(2.5),
  },
  notRecieveOTPstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: responsiveWidth(85),
    marginTop: responsiveHeight(4),
    alignItems: 'center',
  },
  notReceiveOTPText: {
    fontSize: responsiveFontSize(2),
    color: colors.color_fff,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  resendButton: {
    width: responsiveWidth(30),
    backgroundColor: colors.color_transpShadow,
    borderWidth: responsiveWidth(0.1),
    borderColor: colors.color_fff,
    height: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
  },
  resendButtonLabel: {
    fontSize: responsiveFontSize(2),
    color: colors.color_yellow,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  inputFieldStyle: {
    backgroundColor: colors.color_transpShadow,
    marginTop: responsiveHeight(6),
    borderColor: colors.color_fff,
  },
  passwordinputFieldStyle: {
    backgroundColor: colors.color_transpShadow,
    borderColor: colors.color_fff,
  },
  submitButton: {
    margin: responsiveHeight(2),
    height: responsiveHeight(6),
  },
  timerStyle: {
    fontSize: responsiveFontSize(2.2),
    color: colors.color_fff,
  },
  submitButtonStyle: {
    marginBottom: responsiveHeight(2),
  },
});
