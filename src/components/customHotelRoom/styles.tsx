/* eslint-disable prettier/prettier */
import {Dimensions, Platform, StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
// import { Fonts } from '@src/assets';
import {
  responsiveWidth,
  responsiveHeight,
  //   responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { Fonts } from '@src/assets';

const {height} = Dimensions.get('window');
export default StyleSheet.create({
  borderCardView: {
    borderColor: colors.color_hotelBC,
    // backgroundColor:'red',

    borderWidth: 5,
    // height: height / 3,
    marginHorizontal: 20,
    borderRadius: 37,
    opacity: 3,
    marginTop: responsiveHeight(7),
    marginBottom: responsiveHeight(2),
    paddingBottom: 5,
  },
  imageBorder: {
    borderWidth: 8,
    borderColor: colors.color_fff,
    height: responsiveHeight(20),
    width: responsiveWidth(81),
    borderRadius: 25,
    marginTop: height / -16,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  imageRactangle: {
    height: responsiveHeight(21),
    width: responsiveWidth(81),
    // alignSelf: 'center',
    borderRadius: 25,
    borderWidth: 8,
    borderColor: colors.color_fff,
    // marginTop: responsiveHeight(50),
    // borderWidth: 8,
    // position:'absolute',
  },
  iconsView: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  wifiIcon: {
    alignSelf: 'center',
  },
  parkingTxt: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.color_000,
    // alignSelf: 'center',
    marginTop: 10,
    // width:responsiveWidth(84),
    paddingHorizontal: 20,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  cancellationDateTxt: {
    color: colors.color_17C954,
    fontWeight: '500',
    fontSize: 11,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  pricesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  priceTxt: {
    color: colors.color_2D180D,
    fontWeight: '700',
    fontSize: 26,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  cancellationTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.color_000000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    // textDecorationLine:'underline',
  },
  line: {
    height: 1.5,
    backgroundColor: colors.color_9e9e9e,
    width: '92%',
  },
  buttonStyle: {
    width: responsiveWidth(30),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(6),
  },
  labelStyle: {
    fontSize: 16,
  },
  wifiIconView: {
    height: 25,
    width: 25,
    borderWidth: 1.5,
    borderColor: colors.color_EBEBEB,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  cancellationTimeView: {
    height: 30,
    borderWidth: 1.5,
    borderColor: colors.color_EBEBEB,
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    marginTop: 5,
  },
  txtView: {
    marginTop: responsiveHeight(13),
  },
  ractangleCrouselView: {
    position: 'absolute',
    marginTop: responsiveHeight(-8),
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: colors.color_fff,
  },
  paginationStyle: {
    marginTop: responsiveHeight(-8),
    marginRight: responsiveHeight(14),
  },
  serviceText: {
    // width: responsiveWidth(17),
    color: colors.color_0095c8,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  hotelServicesIcon: {
    // height:responsiveHeight(3),
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
