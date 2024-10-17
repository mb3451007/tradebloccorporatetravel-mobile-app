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
  container: {
    marginVertical: 8,
    alignItems: 'center',
  },
  textInputContainerStyle: {
    width: responsiveWidth(85),
    overflow: 'hidden',
  },
  labelTextStyle: {
    marginLeft: responsiveWidth(2.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.color_fff,
    width: responsiveWidth(85),
    height: responsiveHeight(6.5),
    borderRadius: responsiveWidth(3),
    borderColor: 'black',
    borderWidth: 0.5,
  },
  iconStyle: {
    tintColor: colors.color_fff,
    marginLeft: responsiveWidth(2),
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    marginRight: responsiveWidth(1),
  },
  inputBox: {
    flex: 1,
    fontSize: responsiveFontSize(2),
    color: colors.color_fff,
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  hideIconStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    marginRight: responsiveWidth(2),
    tintColor: colors.color_fff,
  },
  errorTextStyle: {
    color: colors.color_red,
    width: responsiveWidth(80),
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  selectedCityContainer: {
    backgroundColor: colors.color_lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: responsiveHeight(4),
    borderRadius: responsiveWidth(4),
  },
  selectedCityText: {
    fontSize: responsiveFontSize(2),
    color: colors.color_000,
    marginHorizontal: responsiveWidth(2),
  },
  selectedCityLogo: {
    height: responsiveWidth(4.5),
    width: responsiveWidth(4.5),
    tintColor: colors.color_000,
    borderRadius: responsiveWidth(5),
    marginRight: responsiveWidth(1.5),
  },
  confrimIcon: {
    marginRight: responsiveWidth(2),
    // height: responsiveWidth(7),
    // width: responsiveWidth(7),
  },
});
