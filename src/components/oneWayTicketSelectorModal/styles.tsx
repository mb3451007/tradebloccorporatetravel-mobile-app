/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {Platform, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  selectTicketModalContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,.9)',
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(-1),
  },
  ticketAirlinesContainer: {
    flexDirection: 'row',
    width: responsiveWidth(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketDetailedLineStyle: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(3),
  },
  selectedLeftRoundView: {
    backgroundColor: colors.color_rgba50_50_50_09,
    left: -5,
  },
  selectedRightRoundViewStyle: {
    backgroundColor: colors.color_rgba50_50_50_09,
    right: -5,
  },
  selectedBottomBar: {
    height: 86,
    backgroundColor: colors.color_fff,
    width: responsiveWidth(95),
    alignSelf: 'center',
    borderRadius: 21,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flightInfoMainContainerStyle: {
    backgroundColor: colors.color_fff,
    width: responsiveWidth(95),
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 26,
    padding: 5,
  },
  flightInfoContainerStyle: {
    flexDirection: 'row',
  },
  flightInfoContainerScrollStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  boxSubContainerStyle: {
    margin: 5,
    paddingVertical: responsiveHeight(1.5),
  },
  customBoxStyle: {
    marginVertical: responsiveHeight(1),
  },
  modalButtonsStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
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
  baggageBoxStyle: {
    height: 56,
    width: 170,
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baggageBoxTextStyle: {
    fontSize: 16,
    color: colors.color_3D3D3D,
  },
  baggageFindedTextStyle: {
    color: colors.color_000,
    fontSize: 15,
    margin: 5,
  },
  bottomBarButtonOneStyle: {
    padding: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.color_EBEBEB,
    maxWidth: responsiveWidth(25),
    maxHeight: 50,
    minHeight: 50,
  },
  unSelectedCircleView: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: responsiveWidth(4),
    borderColor: colors.color_EBEBEB,
    marginLeft: 10,
  },
  bottomButtonTextStyle: {
    color: colors.color_000,
    fontSize: 15,
    lineHeight: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
    textTransform: 'capitalize',
  },
  customLoaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
  lineStyle: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
});
