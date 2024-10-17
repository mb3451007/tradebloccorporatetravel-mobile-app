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
  customSignTextStyle: {
    marginTop: responsiveHeight(2),
  },
  loginOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(1.5),
  },
  continueAsGuest: {
    backgroundColor: colors.color_transpShadow,
    height: responsiveHeight(7),
    width: responsiveWidth(85),
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
  },
  continueAsGuestLabel: {
    color: colors.color_fff,
    fontFamily: Fonts.JAKARTA_REGULAR,
    fontSize: responsiveFontSize(2),
  },
  customTextInputStyle: {
    backgroundColor: colors.color_transpShadow,
    borderWidth: 0.5,
    borderColor: colors.color_fff,
    textTransform:'lowercase',
  },
  customTextInputIconStyle: {
    tintColor: colors.color_fff,
  },
  forgotPasswordLabelStyle: {
    color: colors.color_fff,
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(5),
    fontFamily: Fonts.JAKARTA_REGULAR,
    marginBottom: responsiveHeight(2),
    marginTop:responsiveHeight(-2),
  },
});
