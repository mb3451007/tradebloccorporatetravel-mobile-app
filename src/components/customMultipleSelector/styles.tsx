/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  openingButtonContainerStyle: {
    width: responsiveWidth(85),
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    flexShrink: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.color_F6F6F6,
  },
  openingButtonTextStyle: {
    fontSize: 16,
    color: colors.color_000,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    textTransform: 'capitalize',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
  },
  contentTextStyle: {
    color: colors.color_000,
    fontSize: 14,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '400',
    letterSpacing: 0.07,
  },
  boxStyle: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(95),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
  },
  inputStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 16,
    fontWeight: '500',
  },
  dropDownStyle: {
    width: responsiveWidth(95),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
  },
  checkBoxStyle: {
    height: 19,
    width: 19,
    borderColor: colors.color_E1E1E1,
    backgroundColor: colors.color_0094E6,
  },
  dropDownTextStyle: {
    fontSize: 16,
  },
  includeAllButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(85),
  },
  checkBoxContainerStyle: {
    height: 25,
    width: 25,
    borderWidth: 1,
  },
  includeAllStyle: {
    color: colors.color_000,
  },
});
