/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  ticketContainer: {
    height: responsiveHeight(1),
    backgroundColor: colors.color_fff,
  },
  ticketContainer_2: {
    backgroundColor: colors.color_fff,
    height: responsiveHeight(10),
    borderRadius: 30,
  },

  timeLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(1.5),
  },
  ticketTimePlaneStyle: {
    position: 'absolute',
  },
  airwaysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(1),
  },
  ticketAirwaysLogo: {
    height: 29,
    width: 40,
  },
  ticketDetailedLineStyle: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(3),
  },
  ticketAirlinesContainer: {
    flexDirection: 'row',
    width: responsiveWidth(60),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
