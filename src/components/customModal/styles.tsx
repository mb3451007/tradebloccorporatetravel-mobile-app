/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_transpShadow,
  },
  errorContainerStyle: {
    backgroundColor: 'white',
    height: 230,
    width: responsiveWidth(70),
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  errorTextStyle: {
    fontSize: 18,
    color: colors.color_FE4555,
    fontWeight: '500',
  },

  detailedTextStyle: {
    color: colors.color_7B7B7B,
    fontWeight: '400',
    letterSpacing: 0.11,
    marginHorizontal:10,
  },
  tryAgainButtonStyle: {
    height: 40,
    backgroundColor: colors.color_FE4555,
    width: responsiveWidth(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },

  tryAgainTextStyle: {
    color: colors.color_fff,
    fontSize: 14,
    fontWeight: '400',
  },
});
