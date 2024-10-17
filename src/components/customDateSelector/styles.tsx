/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Fonts} from '@src/assets';

export default StyleSheet.create({
  container: {
    width: responsiveWidth(85),
    justifyContent: 'space-between',
    borderWidth: 1.5,
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
    borderColor: colors.color_EEEEEE,
  },
  headingStyle: {
    marginLeft: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.5),
    color: colors.color_B4B4B4,
    fontWeight: '500',
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  calendarIconStyle: {
    marginLeft: responsiveWidth(2.5),
    height: 16.5,
    width: 16.5,
    flexShrink: 0,
  },
  dateStyle: {
    marginLeft: responsiveWidth(2),
    color: colors.color_000,
    fontWeight: '600',
    fontFamily: Fonts.JAKARTA_REGULAR,
    flex: 1,
  },
  rightIconStyle: {
    marginRight: 10,
    marginLeft: 0,
  },
});
