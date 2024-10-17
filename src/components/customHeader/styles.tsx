/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  HeaderContainerStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(95),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(1),
    marginBottom: 5,
  },
  emptyView: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    backgroundColor: colors.transparent,
  },
  logoStyle: {
    // height: responsiveWidth(7),
    // width: responsiveWidth(40),
    height: responsiveWidth(20),
    width: responsiveWidth(30),
  },
  iconStyle: {
    height: responsiveWidth(10),
    width: responsiveWidth(12),
    marginTop: responsiveHeight(0.5),
  },
  leftTextStyle: {
    fontWeight: '500',
    color: colors.color_000,
    letterSpacing: 0.2,
    fontSize: responsiveFontSize(1.8),
  },
});
