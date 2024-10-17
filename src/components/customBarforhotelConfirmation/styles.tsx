/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
import {Fonts} from '@src/assets';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
  pricetxt: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: Fonts.ROBOTO_REGULAR,
    color: colors.color_0094E6,
  },
  numTxt: {
    color: colors.color_B2B2B2,
    fontWeight: '700',
    fontSize: 12,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  refundableViewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: responsiveWidth(100),
    // marginHorizontal:15,
    position: 'absolute',
    bottom: 0,
    // height: responsiveHeight(12),
    backgroundColor: colors.color_fff,
    paddingVertical: 20,
    elevation: 5,
  },
  buttonStyle: {
    width: responsiveWidth(40),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
  },
  custombuttonStyle: {
    width: responsiveWidth(40),
    alignItems: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
    backgroundColor: colors.color_F9F9F9,
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 16,
  },
  priceTxtSecond: {
    fontSize: 18,
    fontWeight: '800',
  },
  labelStyle1: {
    fontSize: 12,
    color: colors.color_9F9F9F,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  labelStyle2: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.color_0094E6,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
});
