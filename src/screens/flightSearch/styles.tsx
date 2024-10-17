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
  keyboardAwareCustomStyle: {
    marginVertical: responsiveHeight(0),
    paddingVertical: responsiveHeight(1),
  },
  flightBackground: {
    height: responsiveHeight(27),
    width: responsiveWidth(102),
    alignSelf: 'center',
    borderBottomLeftRadius: responsiveWidth(4),
    borderBottomRightRadius: responsiveWidth(4),
    flexShrink: 0,
  },
  flightBackgroundContent: {
    position: 'absolute',
    alignSelf: 'center',
  },
  iosPlatformFlightBackground: {
    height: responsiveHeight(31),
  },
  brownPlaneBgStyle: {
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: responsiveHeight(0.5),
    zIndex: 1,
  },
  brownPlaneStyle: {
    height: 21.185,
    width: 23.126,
  },
  headerLeftIconStyle: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    marginTop: 1,
  },
  headerLabelStyle: {
    color: colors.color_fff,
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  headerRightIconStyle: {
    tintColor: colors.color_fff,
  },
  headerDashedLineContainer: {
    height: responsiveHeight(10),
    width: responsiveWidth(80),
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  headerDashedLinePlaneStyle: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    top: 3,
  },
  headerDashedLineStyle: {
    height: responsiveWidth(12),
    width: responsiveWidth(70),
    alignSelf: 'center',
  },
  headerLocationsLabelContainer: {
    height: responsiveHeight(4),
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabelsStyle: {
    color: colors.color_fff,
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '500',
  },
  headerCodesLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerCodesStyle: {
    color: colors.color_fff,
    fontSize: responsiveFontSize(3),
    fontFamily: Fonts.ROBOTO_REGULAR,
    textAlign: 'left',
    width: responsiveWidth(20),
  },
  customDateStyle: {
    fontSize: responsiveFontSize(1.5),
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  tooCodeTextStyle: {
    width: responsiveWidth(20),
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  greenDotStyle: {
    position: 'absolute',
    top: 0,
    right: -0.1,
  },
  filterButton: {
    height: responsiveWidth(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.color_D9D9D9,
    borderRadius: 11,
    width: responsiveWidth(20),
    backgroundColor: colors.color_fff,
  },
  selectionButtonGradientStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(30),
    borderRadius: 8,
  },
  selectionButtonStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(30),
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
  unSelectedButtonStyle: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.color_E6E6E6,
  },
  unselectedButtonText: {
    color: colors.color_ABABAB,
  },
  filterTextStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.24,
    marginLeft: responsiveWidth(0.5),
  },
});
