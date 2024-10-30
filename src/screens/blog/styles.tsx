/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {Platform, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  blogHeaderImageContainer: {
    height: responsiveHeight(25),
    width: responsiveWidth(99.9),
    alignSelf: 'center',
  },
  headerContainerCustomStyle: {
    marginTop: responsiveHeight(3),
  },
  headerLabelStyle: {
    color: colors.color_fff,
    fontWeight: '500',
  },
  leftIconStyle: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    tintColor: colors.color_000,
  },
  blogImageContainerStyle: {
    height: responsiveHeight(25),
    width: responsiveWidth(90),
    marginVertical: 10,
    alignSelf: 'center',
  },
  imageContainerStyle: {},
  blogImageStyle: {
    height: responsiveHeight(25),
    width: responsiveWidth(90),
    borderRadius: 15,
    opacity: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  blogDetailsContaionerStyle: {
    height: responsiveHeight(22),
    width: responsiveWidth(90),
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  blogTextStyle: {
    color: colors.color_fff,
    padding: 0.5,
  },
  blogTitleStyle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
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
  linearGradientStyle: {height: responsiveHeight(25), borderRadius: 15},
  travelClubImgStyle: {
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    height: responsiveHeight(10),
    width: responsiveWidth(45),
  },
  iosBlogHeaderStyle: {
    marginTop: responsiveHeight(-1),
  },
});
