/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import { Platform, StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  dropDownContainer: {
    width: responsiveWidth(85),
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(2),
    marginTop: Platform.OS === 'ios' ? responsiveHeight(-1) : responsiveHeight(-2),
    height: responsiveHeight(30),
    alignSelf: 'center',
    borderColor: colors.color_EEEEEE,
    marginBottom: 2,
  },
  dropDownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: responsiveHeight(0.9),
    borderBottomWidth: responsiveWidth(0.1),
    borderBottomColor: colors.color_EEEEEE,
  },

  dropIcons: {
    tintColor: colors.color_EEEEEE,
    height: responsiveWidth(5),
    width: responsiveWidth(5),
  },

  dropListName: {
    fontSize: responsiveFontSize(2.3),
    width: responsiveWidth(65),
    color: colors.color_000,
    marginLeft: responsiveWidth(1),
    opacity: 0.5,
  },
  dropListCode: {
    fontSize: responsiveFontSize(2.3),
    color: colors.color_000,
    opacity: 0.5,
  },
});
