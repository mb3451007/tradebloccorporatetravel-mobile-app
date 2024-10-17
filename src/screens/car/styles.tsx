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
  checkBoxContainer: {
    flexDirection: 'row',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(3),
  },
  checkBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(2),
  },
  checkBoxIconStyle: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    tintColor: colors.color_darkBlue,
  },
  checkBoxTitleStyle: {
    color: colors.color_000,
    fontSize: responsiveFontSize(2),
  },
  btnLabelStyle: {
    color: colors.color_fff,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontSize: responsiveFontSize(2),
  },
  btnStyle: {
    // height: responsiveHeight(7),
  },
  comingSoonViewStyle: {
    height: responsiveHeight(60),
    width: responsiveWidth(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonTextStyle: {
    fontWeight: '700',
    color: colors.color_7B7B7B,
    fontSize: responsiveFontSize(2),
  },
  carInputContainerStyle: {
    backgroundColor: colors.color_fff,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
    width: responsiveWidth(95),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 21,
    elevation: 1,
    marginBottom: responsiveHeight(5),
    zIndex: -1,
  },
  checksContainerStyle: {
    height: responsiveHeight(6),
    width: responsiveWidth(90),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  circleViewStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    backgroundColor: colors.color_C0C0C0,
    borderRadius: responsiveWidth(6),
  },
  checksSubContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(40),
    height: responsiveHeight(6),
    justifyContent: 'space-around',
  },
  circleImgBgContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveWidth(8),
    width: responsiveWidth(8),
  },
  checksTextStyle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
    fontFamily: Fonts.JAKARTA_REGULAR,
    color: colors.color_000,
  },
  pickupLeftIconStyle: {
    resizeMode: 'contain',
  },
  loaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
  carInputSubContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(85),
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountLeftIconImgStyle: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    marginRight: 3,
  },
  calendarViewContainerStyle: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: colors.transparent,
    // zIndex:-1
    // justifyContent: 'center',
  },
  calendarViewStyle: {
    height: responsiveHeight(35),
    backgroundColor: 'white',
    width: responsiveWidth(80),
    bottom: responsiveHeight(12),
    position: 'absolute',
    left: responsiveWidth(20),
    borderRadius: 13,
    elevation: 15,
    zIndex: 1,
  },
});
