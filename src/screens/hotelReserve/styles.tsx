/* eslint-disable prettier/prettier */
import {Platform, StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
import {Fonts} from '@src/assets';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
  detalsTxt: {
    color: colors.color_7B5039,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  secondView: {
    marginHorizontal: responsiveHeight(2),
    marginBottom: '30%',
  },
  informationTxt: {
    marginTop: responsiveHeight(4),
  },
  marginDetailTxt: {
    marginTop: 20,
  },
  hotelSummaryTxt: {
    marginTop: 10,
    alignSelf: 'center',
    color: colors.color_B2B2B2,
    fontWeight: '400',
    fontSize: 12,
    fontFamily: Fonts.ROBOTO_REGULAR,
    width: responsiveWidth(90),
  },
  hotelServicesIconMainView: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  serviceText: {
    // width:responsiveWidth(17),
    color: colors.color_0095c8,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  hotelServicesIcon: {
    borderWidth: 0.5,
    borderColor: colors?.color_b5eeff,
    padding: 5,
    borderRadius: responsiveHeight(0.5),
    marginHorizontal: 5,
    marginVertical: 5,
  },
  scrollViewContent: {
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    height: responsiveHeight(9),
    width: responsiveWidth(95),
    alignSelf: 'center',
    marginTop: 5,
    marginHorizontal: Platform.OS === 'android' ? 0 : 10,
    marginBottom: Platform.OS === 'android' ? responsiveHeight(0.5) : 20,
    borderRadius: 25,
    backgroundColor: colors.color_fff,
    shadowColor: colors.color_000,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  thankYouImageStyle: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  thankyouTextStyle: {
    fontWeight: '700',
    alignSelf: 'center',
    color: colors.color_000,
    letterSpacing: 0.48,
    fontSize: 24,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  detailsTextStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: colors.color_8E8E8E,
    maxWidth: 400,
    letterSpacing: 0.26,
    fontFamily: Fonts.JAKARTA_REGULAR,
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: colors.color_fff,
    padding: 20,
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: 60,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_transpShadow,
  },
  buttonStyle: {
    width: responsiveWidth(40),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(7),
  },
  labelStyle: {
    fontSize: 16,
  },
  buttonView: {
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
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
  Modalimage: {
    height: responsiveHeight(25),
    margin: 5,
  },
});
