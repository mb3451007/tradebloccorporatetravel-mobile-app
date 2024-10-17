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
  submitButtongradientStyle: {
    width: responsiveWidth(85),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
  },
  buttonStyle:{
    width: responsiveWidth(85),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    color: colors.color_fff,
    fontSize: responsiveFontSize(2.5),
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
});
