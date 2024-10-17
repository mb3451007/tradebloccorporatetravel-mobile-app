/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  blogImageContainerStyle: {
    height: responsiveHeight(14),
    width: responsiveWidth(95),
    alignSelf: 'center',
    borderRadius: 13,
    marginVertical: 15,
  },
  imageContainerStyle: {},
  blogImageStyle: {
    height: responsiveHeight(14),
    width: responsiveWidth(95),
    borderRadius: 13,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  blogTextContainerStyle: {
    height: responsiveHeight(13),
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 14,
  },
  blogTextStyle: {
    color: colors.color_fff,
    padding: 0.5,
  },
  blogTitleStyle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
  },
  exploreImgStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: responsiveHeight(-0.5),
    width: responsiveWidth(20),
    height: responsiveHeight(3),
  },
  linearGradientStyle: {
    height: responsiveHeight(14),
    width: responsiveWidth(95),
    borderRadius: 15,
  },
});
