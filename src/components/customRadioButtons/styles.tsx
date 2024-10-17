/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(1.5),
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(35),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(10),
    borderWidth: responsiveWidth(0.2),
    borderColor: colors.color_E9E9E9,
    marginLeft: responsiveWidth(1.5),
  },
  radioLabelStyle: {
    fontSize: 16,
    color: colors.color_000,
    fontFamily: Fonts.JAKARTA_REGULAR,
    marginLeft: responsiveWidth(2),
    fontWeight: '600',
    flexShrink: 0,
    marginTop: responsiveHeight(-0.4),
  },
  roundTripLogoContainer: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(1),
  },
  imageStyle: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    borderRadius: responsiveWidth(10),
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
});
