/* eslint-disable prettier/prettier */
import { Fonts } from '@src/assets';
import {StyleSheet} from 'react-native';
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
  roundTripTodestination: {
    marginTop: responsiveHeight(3),
  },
  roundTripLineContainer: {
    position: 'absolute',
    marginLeft: responsiveWidth(25),
    top: responsiveHeight(40),
  },
  ticketDetailedLineStyle: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(3),
  },
  ticketAirwaysLogo: {
    height: 35,
    width: 75,
  },
  noDataFoundStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  noDataTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.JAKARTA_BOLD,
  },
});
