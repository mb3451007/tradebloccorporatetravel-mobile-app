/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: colors.color_whiteTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatInfoContainerStyle: {
    // height: responsiveHeight(20),
    width: responsiveWidth(90),
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.color_fff,
    borderRadius: 13,
    elevation: 10,
  },
  seatContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagesContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(35),
    justifyContent: 'space-between',
  },
  seatTextContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(40),
    justifyContent: 'space-evenly',
  },
  seatStyles: {
    marginVertical: 20,
  },
  chaTextStyle: {
    color: colors.color_000,
    marginTop: 10,
  },
  chaSubTextStyle: {
    marginLeft: 10,
    color: colors.color_8B8B8B,
  },
  rowDetailsScrollViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectedSeatTextStyle: {
    color: colors.color_8B8B8B,
  },
  seatRowNumberStyle: {
    color: colors.color_000,
    fontSize: 18,
    fontWeight: '500',
  },
  modalButtonsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonStyle: {
    width: 144,
    height: 45,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    borderColor: colors.color_E9E9E9,
    marginHorizontal: 5,
  },
  buttonTextStyle: {
    fontSize: 15,
    color: colors.color_3D3D3D,
    fontWeight: '400',
  },
});
