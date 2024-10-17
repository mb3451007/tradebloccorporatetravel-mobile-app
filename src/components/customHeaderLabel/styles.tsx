/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  headerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smartWayTextStyle: {
    fontSize: responsiveFontSize(2),
    color: colors.color_000000,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    letterSpacing: 0.23,
    marginTop: responsiveHeight(1),
  },
});
