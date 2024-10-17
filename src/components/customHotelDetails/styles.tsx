/* eslint-disable prettier/prettier */
import {Dimensions, Platform, StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
import {Fonts} from '@src/assets';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: width / 20,
  },
  firstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationTxt: {
    color: colors.color_7B5039,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  marginView: {
    marginTop: 25,
  },
  voiceTxt: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.color_2D2D2D,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  ratingImage: {
    height: responsiveHeight(1.8),
    marginHorizontal: 3,
  },
  ratingMainView: {
    flexDirection: 'row',
  },
  address: {
    width: responsiveHeight(23),
    marginTop: 10,
    color: colors.color_282829,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  addressTxt: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 14,
    color: colors.color_2D2D2D,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  numTxt: {
    color: colors.color_B2B2B2,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  cardTxt: {
    color: colors.color_B2B2B2,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  // ratingImage: {
  //   height: responsiveHeight(1.8),
  //   marginHorizontal: 3,
  //   alignSelf: 'center',
  // },
  marginTop: {
    marginTop: responsiveHeight(3),
  },
  checkInOutView: {
    marginTop: 10,
  },
  timeView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkInOutTxt: {
    color: colors.color_282829,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginTop: 10,
  },
  darkTxt: {
    color: colors.color_282829,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  starBullet: {
    color: 'black',
    fontWeight: '600',
  },
  bulletView: {
    flexDirection: 'row',
  },
  checkInInstructions: {
    marginTop: 10,
  },
  dotBulletView: {
    // marginTop: responsiveHeight(3),
    // marginStart: responsiveWidth(4),
  },
  guaranteeTxt: {
    marginTop: 10,
    color: colors.color_282829,
  },
  safetyDiscription: {
    marginTop: 10,
  },
  CardStyles: {
    flexDirection: 'row',
  },
  tabBarStyle: {
    height: responsiveHeight(9),
    width: responsiveWidth(95),
    alignSelf: 'center',
    marginTop: 5,
    marginHorizontal: Platform.OS === 'android' ? 0 : 10,
    marginBottom: Platform.OS === 'android' ? responsiveHeight(0.5) : 20,
    borderRadius: 25,
    backgroundColor: colors.color_fff,
    shadowColor: colors.color_000,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
