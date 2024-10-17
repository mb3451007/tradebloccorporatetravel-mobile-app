/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flightInfoBoxStyle: {
    width: 170,
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  scrollViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightInfoHeaderTitleStyle: {
    fontSize: 16,
    color: colors.color_3D3D3D,
  },
  flightInfoSubTitleStyle: {
    color: colors.color_000,
    fontSize: 15,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
