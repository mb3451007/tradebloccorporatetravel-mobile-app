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
  barContainer: {
    flexDirection: 'row',
    width: responsiveWidth(91),
    marginTop: responsiveHeight(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //calling a function to get value of state in styleSheet..
  barLabelContainer: {
    height: responsiveWidth(30),
    width: responsiveWidth(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(5),
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: colors.color_fff,
    borderColor: colors.color_E9E9E9,
    marginTop: responsiveHeight(1),
  },
  barLabelsStyle: {
    fontSize: responsiveFontSize(2),
    margin: responsiveWidth(2),
    color: colors.color_000,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight:'600',
    letterSpacing:0.32,
    textTransform:'uppercase',
  },
  imageStyle: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
  },
});
