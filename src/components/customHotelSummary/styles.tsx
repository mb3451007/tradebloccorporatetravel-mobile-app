/* eslint-disable prettier/prettier */
import {Dimensions, Platform, StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
import {Fonts} from '@src/assets';
// import { Fonts } from '@src/assets';
import {
  responsiveWidth,
  responsiveHeight,
  //   responsiveFontSize,
} from 'react-native-responsive-dimensions';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: width / 20,
    flex: 1,
  },
  facilitiesTxt: {
    color: colors.color_7B5039,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  iconViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(65),
    marginTop: responsiveHeight(4),
  },
  hotelSummaryTxt: {
    marginTop: 10,
    color: colors.color_B2B2B2,
    fontWeight: '400',
    fontSize: 13,
    fontFamily: Fonts.ROBOTO_REGULAR,
    width: responsiveWidth(90),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  hotelServicesIconMainView: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  serviceText: {
    // width: responsiveWidth(17),
    color: colors.color_0095c8,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  hotelServicesIcon: {
    borderWidth: 0.5,
    borderColor: colors?.color_b5eeff,
    padding: 5,
    borderRadius: responsiveHeight(0.5),
    marginHorizontal: 5,
    marginVertical: 5,
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
