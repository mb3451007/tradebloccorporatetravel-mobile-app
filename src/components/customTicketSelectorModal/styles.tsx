/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  selectTicketModalContainerStyle: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,.9)',
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
  },
  flightInfoContainerStyle: {
    height: 440,
    backgroundColor: colors.color_fff,
    width: responsiveWidth(95),
    alignSelf: 'center',
    borderRadius: 26,
    marginTop: 15,
  },
  flightInfoBoxStyle: {
    height: 56,
    width: 170,
    borderWidth: 1,
    borderColor: colors.color_F6F6F6,
    borderRadius:9,
  },
});
