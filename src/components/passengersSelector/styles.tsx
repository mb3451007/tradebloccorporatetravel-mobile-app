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
  passengersSelector: {
    alignSelf: 'center',
    borderWidth: responsiveWidth(0.5),
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    borderColor: colors.color_EEEEEE,
    marginBottom: responsiveHeight(2),
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: colors.color_whiteTransparent,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.color_fff,
    marginRight: responsiveWidth(5),
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  modalContentContainer: {
    borderWidth: 1,
    width: responsiveWidth(90),
    height: responsiveHeight(45),
    borderRadius: responsiveWidth(2),
    backgroundColor: colors.color_fff,
    borderColor: colors.color_fff,
    elevation: 15,
  },
  cabinTextStyle: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(2),
    color: colors.color_000,
  },
  cabinSelectorBar: {
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    borderWidth: responsiveWidth(0.2),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: responsiveWidth(2),
    borderColor: colors.color_000,
    marginLeft: 10,
  },
  barTextStyle: {
    fontSize: responsiveFontSize(2),
    color: colors.color_000,
    marginHorizontal: responsiveWidth(2),
    fontFamily: Fonts.JAKARTA_REGULAR,
  },
  itemsMainContainer: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginVertical: responsiveHeight(11),
    zIndex: 1,
    borderColor: colors.color_EEEEEE,
    borderWidth: 1,
    height: responsiveHeight(33),
    backgroundColor: colors.color_fff,
    marginLeft: 10,
    borderRadius: 8,
  },
  classItemsContainer: {
    backgroundColor: colors.color_fff,
    alignSelf: 'center',
    width: responsiveWidth(80),
  },
  itemsTextContainer: {
    margin: responsiveHeight(1),
  },
  itemTextStyle: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.JAKARTA_REGULAR,
    color: colors.color_000,
  },
  passengerTextStyle: {
    fontSize: responsiveFontSize(2),
    color: colors.color_000,
    marginHorizontal: responsiveWidth(2.5),
    marginVertical: responsiveHeight(1),
  },
  passengerContainer: {
    flexDirection: 'row',
    width: responsiveWidth(60),
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  passengerText: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    color: colors.color_000,
    fontWeight: '500',
  },
  customStyle: {
    width: responsiveWidth(24),
    fontFamily: Fonts.JAKARTA_REGULAR,
    color: colors.color_000,
  },
  applyButtonStyle: {
    width: responsiveWidth(40),
    height: responsiveHeight(6),
  },
  buttonStyle: {
    marginTop: responsiveHeight(4),
  },
});
