/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  filterBarContainer: {
    height: responsiveHeight(5),
    alignSelf: 'center',
    width: responsiveWidth(75),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  filterBarItemsContainer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 11,
    flexDirection: 'row',
    borderColor: colors.color_D9D9D9,
    backgroundColor: colors.color_fff,
    height: responsiveWidth(10),
    padding: 4,
  },
  logoBackgroundStyle: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: colors.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.24,
    marginLeft: responsiveWidth(1),
  },
  logoStyle: {
    // height:16,
    // width:25
  },
});
