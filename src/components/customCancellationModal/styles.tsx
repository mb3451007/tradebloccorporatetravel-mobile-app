/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '@src/constants/colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Fonts} from '@src/assets';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.color_fff,
    padding: 20,
  },
  modalView: {
    backgroundColor: colors.color_F5F5F5,
    padding: 10,
  },
  accessibleTxt: {
    color: colors.color_000000,
    fontSize: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  feslitiesBtn: {
    fontFamily: Fonts.ROBOTO_REGULAR,
    backgroundColor: 'rgb(181,238,255)',
    borderWidth:0.5,
    borderColor:colors?.color_b5eeff,
    padding:5,
    borderRadius: responsiveHeight(0.5),
    marginHorizontal:5,
    marginVertical:5,
  },
  btnTxt: {
    color: '#0396c9',
    width:responsiveWidth(18),
  },
  line: {
    backgroundColor: colors.color_d4d4d4,
    height: 1,
    marginVertical: 10,
  },
  cancellationTxt: {
    color: colors.color_13b464,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  rateTxt: {
    marginTop: 10,
  },
  stayView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  greyTxt: {
    color: colors.color_adadad,
  },
  dateTxt: {
    color: colors.color_000000,
    fontSize: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  marginStart: {
    marginStart: 5,
  },
  labelStyle: {
    fontSize: 18,
  },
  buttonStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  gradientStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'flex-end',
  },

  backImageStyle: {
    tintColor: colors.color_000,
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    marginBottom: 10,
    marginLeft: 10,
  },
  priceView: {
    flexDirection: 'row',
  },
  iconsView: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap:'wrap',
    marginHorizontal:10,
  },
  priceTxt: {
    color: colors.color_410099,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  starBullet: {
    color: 'black',
    fontWeight: '600',
    marginStart:20,
  },
  cancellationTimeView: {
    height: 30,
    borderWidth: 1.5,
    borderColor: colors.color_EBEBEB,
    justifyContent: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    marginTop:5,
  },
  cancellationDateTxt: {
    color: colors.color_17C954,
    fontWeight: '500',
    fontSize: 11,
  },
});
