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
  countryPickerContainerStyle: {
    borderWidth: 0.7,
    width: responsiveWidth(85),
    alignSelf: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 13,
    borderColor: colors.color_8B8B8B,
    marginTop: responsiveHeight(-1.5),
  },
  contryNameTextStyle: {
    fontSize: responsiveFontSize(2),
    color: colors.color_000,
  },
  countryNameContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: responsiveHeight(0.5),
    borderBottomWidth: 0.5,
    fontFamily: Fonts.ROBOTO_REGULAR,
    borderColor: colors.color_8B8B8B,
  },
  countryNameViewStyle: {
    width: responsiveWidth(60),
  },
  flagImageStyle: {
    height: responsiveWidth(4),
    width: responsiveWidth(5),
    marginTop:5,
  },
  countryCodeTextStyle: {
    color: colors.color_000,
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '500',

  },
});
