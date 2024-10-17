/* eslint-disable prettier/prettier */
import { Fonts } from '@src/assets';
import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  findAccTextHeader: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: '600',
    color: colors.color_fff,
    marginTop: responsiveHeight(3),
    fontFamily: Fonts.JAKARTA_BOLD,
  },
  findAccTextSubHeader: {
    fontSize: responsiveFontSize(2),
    width: responsiveWidth(85),
    color: colors.color_fff,
    marginTop: responsiveWidth(2),
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  welcomeTextContainer: {
    width: responsiveWidth(58.5),
    marginTop: responsiveHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeTextStyle: {
    fontSize: responsiveFontSize(2.2),
    color: colors.color_fff,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  iQTextStyle: {
    fontSize: responsiveFontSize(2.5),
    color: colors.color_darkBlue,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  travelClubTextContainer: {
    backgroundColor: colors.color_transpShadow,
    width: responsiveWidth(32),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  travelClubTextStyle: {
    fontSize: responsiveFontSize(2.2),
    color: colors.color_fff,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  emailInputStyle: {
    marginTop: responsiveHeight(5),
    backgroundColor: colors.color_transpShadow,
    borderColor: colors.color_fff,
    color: colors.color_fff,
    fontSize: responsiveFontSize(2.5),
  },
  submitButtonStyle: {
    marginBottom: responsiveHeight(3.5),
  },
});
