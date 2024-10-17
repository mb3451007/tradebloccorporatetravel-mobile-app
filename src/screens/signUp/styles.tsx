/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  textInputContainer: {
    marginTop: responsiveHeight(5),
  },

  customInputStyle: {
    backgroundColor: colors.color_transpShadow,
    borderWidth: 0.4,
    borderColor: colors.color_fff,
    textTransform: 'lowercase',
    marginBottom: 3,
  },
  customInputIconStyle: {
    tintColor: colors.color_fff,
  },
  accountTagCustomStyle: {
    marginTop: responsiveHeight(8),
  },
});
