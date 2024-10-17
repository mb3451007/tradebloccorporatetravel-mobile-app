/* eslint-disable prettier/prettier */

import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  propertyInput: {
    flex: 1,
    width: responsiveWidth(95),
    borderWidth: 1.5,
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    borderColor: colors.color_EEEEEE,
    // marginBottom: responsiveHeight(1),
    // height: responsiveHeight(5),
    justifyContent: 'center',
  },
  imageStyle: {
    // marginTop: responsiveHeight(1),
  },
  closeButtonContainerStyle: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(0.5),
  },
});
