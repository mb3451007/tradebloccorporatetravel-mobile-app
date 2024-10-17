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
  inputContainerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: responsiveHeight(7),
    width: responsiveWidth(40),
    borderWidth: 1.5,
    borderRadius: 13,
    borderColor: colors.color_EEEEEE,
    marginBottom: 10,
  },
  headerLabelTextStyle: {
    fontSize: responsiveFontSize(1.8),
    marginBottom: 5,
    color: colors.color_B4B4B4,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  valueImgContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(30),
    alignItems: 'center',
  },
  leftIconImgStyle: {
    resizeMode: 'contain',
    height: responsiveWidth(3.5),
    width: responsiveWidth(3.5),
    marginRight: 8,
  },
  valueTextStyle: {
    color: colors.color_000,
    fontWeight: '600',
  },
});
