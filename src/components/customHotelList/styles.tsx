import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainView: {
    padding: 15,
    backgroundColor: colors.color_fff,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  hotelTitle: {
    fontSize: 15,
    color: colors?.color_581F00,
    fontWeight: '700',
    width: responsiveWidth(55),
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  serviceText: {
    width: responsiveWidth(15),
    color: colors.color_888888,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  noOfServices: {
    fontWeight: '700',
    color: colors.color_888888,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  hotelListFirstView: {
    flexDirection: 'row',
  },
  hotelImage: {
    height: responsiveHeight(14),
    width: responsiveWidth(30),
    borderRadius: 20,
  },
  locationlogo: {
    tintColor: colors?.color_F9935C,
  },
  hotelLocationText: {
    color: colors.color_B4B4B4,
    fontSize: 12,
    marginVertical: 2,
    marginHorizontal: 2,
    width: responsiveWidth(45),
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  locationView: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  ratingMainView: {
    flexDirection: 'row',
  },
  hotelServicesIconMainView: {
    flexDirection: 'row',
    marginVertical: 10,
    // justifyContent:'space-between',
  },
  ratingImage: {
    height: responsiveHeight(2),
    marginHorizontal: 3,
  },
  hotelDescription: {
    marginHorizontal: 10,
  },
  hotelServicesIcon: {
    // height:responsiveHeight(3),
    borderWidth: 0.5,
    borderColor: colors?.color_B2B2B2,
    padding: 5,
    borderRadius: responsiveHeight(0.5),
    marginHorizontal: 5,
  },
  hotelListSecondView: {
    overflow: 'hidden',
  },

  hotelListSecondinnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  dottedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'grey',
    margin: -2,
    marginTop: 10,
  },
  buttonStyle: {
    width: responsiveWidth(30),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(5.5),
  },
  labelStyle: {
    fontSize: 16,
  },
  totalRooms: {
    color: colors.color_605D5D,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  roomPrice: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 2,
    color: colors?.color_000,
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  contentContainerStyle: {paddingBottom: 300},
  priceView: {overflow: 'hidden'},
});
