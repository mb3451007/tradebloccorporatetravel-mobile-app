/* eslint-disable prettier/prettier */
import { Fonts } from '@src/assets';
import colors from '@src/constants/colors';
import { Platform, StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  MainContainer: {
    width: responsiveWidth(85),
    borderWidth: 1.5,
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(0),
    borderColor: colors.color_EEEEEE,
    marginBottom: responsiveHeight(-0.5),
    height: Platform.OS === 'ios' ? responsiveHeight(8) : null,
  },
  textInputStyle: {
    fontSize: responsiveFontSize(2),
    color: colors.color_000,
    marginLeft: responsiveWidth(2),
    marginVertical: responsiveHeight(-1.0),
    flex: 1,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight: '600',
  },
  labelStyle: {
    fontSize: responsiveFontSize(1.8),
    marginLeft: responsiveWidth(2.5),
    color: colors.color_B4B4B4,
    marginTop: responsiveHeight(0.5),
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight: '500',
  },
  errorLabel: {
    alignSelf: 'center',
    width: responsiveWidth(80),
    fontSize: responsiveFontSize(2),
    color: colors.color_red,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom:5,
  },
  calendarStyle: {
    marginRight: responsiveWidth(2),
  },
  rightIconContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.8),
    justifyContent: 'space-around',
    // width: responsiveWidth(10),
    marginLeft: responsiveWidth(2),
  },
  dropDownStyle: {
    height: 20,
    width: 20,
  },
  countryCodeStyle: {
    fontSize: 17,
    marginTop: Platform.OS === 'ios' ? 10 : null,
  },
  flagStyle: {
    height: responsiveWidth(4),
    width: responsiveWidth(6),
    marginTop: Platform.OS === 'ios' ? 10 : 5,
    marginRight: -2,
  },
  dropDownStyle2: {
    height: 20,
    width: 20,
    tintColor: colors.color_BBBBBB,
    marginTop: 5,
  },
  dropDownStyleforFlag: {
    height: 18,
    width: 20,
  },
  leftIconViewStyle: {
    flexDirection: 'row',
  },
});
