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
  modalContainer: {
    flex: 1,
  },
  filterButtonContainerStyle: {
    backgroundColor: colors.color_fff,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  filterContainer: {
    flexGrow: 1,
    backgroundColor: colors.color_fff,
    width: '100%',
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftIconStyle: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
  headerLabelStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.36,
  },
  selectionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  selectionButtonGradientStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(95),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  selectionButtonStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(95),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionButtonTextStyle: {
    color: colors.color_fff,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '400',
    letterSpacing: 0.14,
    fontSize: responsiveFontSize(1.8),
  },
  outInBoundContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  boundHeaderTextStyle: {
    fontSize: 16,
    color: colors.color_000,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginBottom: 15,
  },
  boundContainerStyle: {
    alignSelf: 'center',
  },
  activeBoundStyle: {
    backgroundColor: colors.color_0094E6,
    height: 40,
    width: responsiveWidth(40),
    borderTopStartRadius: 11,
    borderTopEndRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inActiveBoundStyle: {
    height: 40,
    width: responsiveWidth(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boundTextStyle: {
    color: colors.color_fff,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.07,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  customPanHeaderTextStyle: {
    color: colors.color_8B8B8B,
    marginLeft: responsiveWidth(3),
  },
});
