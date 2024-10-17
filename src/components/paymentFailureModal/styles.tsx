/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconStyle: {
    tintColor: colors.color_000,
    width: 36,
    height: 38,
    backgroundColor: colors.color_fff,
  },
  thankYouImageStyle: {
    marginVertical: 10,
    alignSelf: 'center',
    height: responsiveHeight(30),
    width: responsiveWidth(70),
  },
  thankyouTextStyle: {
    fontWeight: '700',
    alignSelf: 'center',
    color: colors.color_000,
    letterSpacing: 0.48,
    fontSize: 24,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  detailsTextStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: colors.color_8E8E8E,
    maxWidth: 400,
    letterSpacing: 0.26,
    fontFamily: Fonts.JAKARTA_REGULAR,
    textAlign: 'center',
  },
});
