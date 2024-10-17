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
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.color_transpShadow,
    height: responsiveHeight(6),
    width: responsiveWidth(45),
    borderRadius: responsiveWidth(8),
    justifyContent: 'space-evenly',
  },
  iconStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
  },
  textStyle: {
    color: colors.color_fff,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
});
