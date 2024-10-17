/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import colors from '@src/constants/colors';
import { Fonts } from '@src/assets';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default StyleSheet.create({
  iconsView: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  wifiIcon: {
    alignSelf: 'center',
  },
  cancellationDateTxt: {
    color: colors.color_17C954,
    fontWeight: '500',
    fontSize: 12,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  cancellationTxt: {
    fontWeight: '400',
    fontSize: 12,
    color: colors.color_000000,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  cancellationTimeView: {
    paddingHorizontal: 5,
    marginTop: 5,
  },
  detalsTxt: {
    color: colors.color_7B5039,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginHorizontal: responsiveHeight(2),
    marginVertical: responsiveHeight(2),
  },
  dropDownTxt: {
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontSize: 16,
    color: colors.color_000000,
    width: responsiveWidth(80),
  },
  iconViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(65),
    marginTop: responsiveHeight(2),
  },
  dotBulletView: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(85),
  },
  tintColorStyle: {
    tintColor: colors.color_7B5039,
  },
  iconStyle: {
    alignSelf: 'center',
    marginStart: 10,
  },
  pricetxt: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: Fonts.ROBOTO_REGULAR,
    color: colors.color_0094E6,
  },
  numTxt: {
    color: colors.color_B2B2B2,
    fontWeight: '700',
    fontSize: 12,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  refundableBtn: {
    justifyContent: 'center',
    height: responsiveHeight(2.5),
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: colors.color_FFD4D4,
  },
  refundableTxt: {
    color: colors.color_FF4D4D,
    fontSize: 13,
    fontWeight: '400',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  roomBookTxt: {
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '400',
    fontSize: 12,
    color: colors.color_F9F9F9,
  },
  firstView: {
    marginHorizontal: responsiveHeight(2),
    marginVertical: 10,
  },
  firstOpenView: {
    marginHorizontal: responsiveHeight(2),
    marginVertical: -10,
  },
  secondView: {
    marginHorizontal: responsiveHeight(2),
    marginBottom: '30%',
  },
  secoconView: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  refundableViewInfo: {
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
  },
  refundableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informationTxt: {
    marginTop: responsiveHeight(4),
  },
  marginDetailTxt: {
    marginTop: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  priceTxtSecond: {
    fontSize: 18,
    fontWeight: '800',
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
  specialTxt: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.ROBOTO_REGULAR,
    marginStart: 10,
    color: colors.color_000000,
  },
  starBullet: {
    color: 'black',
    fontWeight: '800',
  },
  hotelSummary2Txt: {
    marginTop: 10,
    color: colors.color_B2B2B2,
    fontWeight: '400',
    fontSize: 12,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  lineFull: {
    height: 0.5,
    backgroundColor: colors.color_707070,
    width: '100%',
    marginTop: 10,
  },
  secondViewDiff: {
    backgroundColor: colors.color_fff,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 1,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0.3,
      height: 0.3,
    },
    flex: 1,
  },
  rateSummary: {
    marginVertical: responsiveHeight(1),
  },
  hotelServicesIconMainView: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  serviceText: {
    width: responsiveWidth(17),
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
  textStyle: {
    color: colors.color_888888,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  textStyle1: {
    color: colors.color_888888,
    maxWidth: responsiveWidth(90),
    fontSize: responsiveFontSize(1.5),
    textAlign: 'left',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
});
