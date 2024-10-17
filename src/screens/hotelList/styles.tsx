import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  headerLeftIconStyle: {
    height: 20,
    width: 20,
    tintColor: colors.color_000,
  },
  headerLabelStyle: {
    color: colors.color_000,
    fontWeight: '500',
    fontSize: 16,
    flexShrink: 0,
  },
  leftIconViewStyle: {
    // padding: 8,
    // backgroundColor: colors.color_fff,
    // borderRadius: 8,
  },
  osPlatformInputStyle: {
    marginTop: responsiveHeight(1),
  },
  mainContainerCustomStyle: {
    width: responsiveWidth(50),
    height: responsiveHeight(5),
    backgroundColor: colors?.color_fff,
  },
  customdropDownStyle: {
    height: responsiveHeight(3),
  },
  item: {},
  roundTripLabelStyle: {
    marginLeft: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.5),
    color: colors.color_B4B4B4,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight: '500',
    marginBottom: 6,
  },
  roundTripLogoStyle: {
    marginLeft: responsiveWidth(2.5),
    height: responsiveHeight(3),
  },
  roundTripLabelContainer: {
    borderWidth: 1.5,
    width: responsiveWidth(50),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(2),
    borderColor: colors.color_EEEEEE,
    backgroundColor: colors.color_fff,
  },
  roundTripinputLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  roundTripInputStyle: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),
    color: colors.color_000,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontWeight: '600',
  },
  dateLocationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  location: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors?.color_E8E8E8,
    backgroundColor: colors?.color_fff,
    // width: responsiveWidth(50),
    borderRadius: responsiveHeight(1),
    alignItems: 'center',
    padding: 8,
    minWidth: responsiveWidth(45),
  },
  locationlogo: {
    tintColor: colors?.color_0094E6,
    marginRight: 8,
    resizeMode: 'contain',
    height: responsiveHeight(2),
    width: responsiveWidth(5),
  },
  locationText: {
    fontSize: responsiveFontSize(1.5),
    color: colors.color_888888,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  buttonStyle: {
    width: responsiveWidth(20),
    alignSelf: 'flex-end',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(5),
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 16,
  },
  filterButton: {
    marginHorizontal: 10,
  },
  loaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
});
