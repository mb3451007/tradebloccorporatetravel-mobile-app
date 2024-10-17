/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  sepratorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(1.5),
    marginTop: 15,
  },
  sepratorLineStyle: {
    width: responsiveWidth(15),
    borderBottomWidth: responsiveWidth(0.2),
    borderColor: colors.color_fff,
  },
  circleViewContainerStyle: {
    height: 30,
    width: 30,
    borderWidth: 0.5,
    borderColor: colors.color_fff,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_transpShadow,
  },
  sepratorLabelStyle: {
    fontSize: responsiveFontSize(2),
    color: colors.color_fff,
    textAlign: 'center',
  },
});
