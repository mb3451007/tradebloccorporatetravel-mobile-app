/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  priceDetailsContainerStyle: {
    width: responsiveWidth(100),
    backgroundColor: colors.color_fff,
    height: responsiveHeight(20),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 0.5,
    elevation: 10,
    justifyContent: 'space-around',
    borderColor: colors.color_E8E8E8,
  },
  priceSubContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomPriceTextStyle: {
    color: colors.color_000,
    fontWeight: '500',
    letterSpacing: 0.28,
    fontSize: 14,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  priceNextButtonStyle: {
    width: 188,
    height: 43,
    justifyContent: 'center',
  },
  mainPriceTextStyle: {
    fontSize: 25,
    color: colors.color_0094E6,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  mainPriceSubTextStyle: {
    fontSize: 13,
    color: colors.color_B2B2B2,
  },
  mainPriceContainer: {
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 16,
  },
});
