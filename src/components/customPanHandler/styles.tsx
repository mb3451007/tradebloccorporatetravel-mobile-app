/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  containerStyle: {
    height: 100,
    justifyContent: 'center',
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
  },
  mainContainerStyle: {
    height: 3,
    backgroundColor: 'grey',
    width: 332,
    alignSelf: 'center',
  },
  handlerViewStyle: {
    height: 3.07,
    alignSelf: 'center',
  },
  knobContainerStyle: {
    position: 'absolute',
    left: 15,
    backgroundColor: 'white',
  },
  knobStyle: {
    height: 26,
    width: 26,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: colors.color_F8652F,
    backgroundColor: colors.color_fff,
  },
  sliderStyle: {
    width: 323,
    alignSelf: 'center',
    marginVertical: 10,
  },
  panHeaderTextStyle: {
    fontSize: 16,
    color: colors.color_000,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  customLeftMarkerStyle: {
    height: 26,
    width: 26,
    borderWidth: 1.5,
    borderRadius: 100,
    borderColor: colors.color_F8652F,
    backgroundColor: colors.color_fff,
  },
  selectedStyle: {
    backgroundColor: colors.color_51A0CC,
  },
  subTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 340,
  },
  subTextStyle: {
    marginTop: -8,
    color: colors.color_000,
  },
  markerContainer: {
    height: 50,
    justifyContent: 'center',
  },
  markerValues: {
    position: 'absolute',
    height: responsiveHeight(8),
    width: responsiveWidth(20),
    color: colors.color_000,
  },
});
