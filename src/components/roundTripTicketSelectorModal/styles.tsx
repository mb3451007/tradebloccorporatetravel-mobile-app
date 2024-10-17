/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {Platform, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  ticketFlightNamesContainer: {
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
  roundTripTodestination: {
    marginTop: responsiveHeight(3),
  },
  roundTripLineContainer: {
    position: 'absolute',
    marginLeft: responsiveWidth(25),
    top: responsiveHeight(40),
  },
  selectTicketModalContainerStyle: {
    // flex: 1,
    backgroundColor: 'rgba(50,50,50,.9)',
    marginTop:
      Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(-1),
  },
  viewColor: {
    backgroundColor: 'rgba(50,50,50,.9)',
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  barButtonTextStyle: {
    color: colors.color_000,
    fontSize: 15,
    lineHeight: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
    textTransform: 'capitalize',
  },
  bottomBarButtonStyle: {
    padding: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.color_EBEBEB,
    maxWidth: responsiveWidth(25),
    maxHeight: 50,
    minHeight: 50,
    margin: 10,
  },
  unSelectedCircleView: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: responsiveWidth(4),
    borderColor: colors.color_EBEBEB,
  },
  fareInfoMainContainerStyle: {
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    width: responsiveWidth(95),
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: colors.color_fff,
    alignItems: 'center',
  },
  fareInfoContainerStyle: {
    flexDirection: 'row',
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
    alignSelf: 'flex-end',
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
  lineStyle: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  customLoaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
});
