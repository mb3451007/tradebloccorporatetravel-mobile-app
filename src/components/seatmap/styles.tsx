/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: colors.color_E8E8E8,
    flexGrow: 1,
  },
  seatmapBackGroundImageStyle: {
    height: responsiveHeight(27),
    width: responsiveWidth(100),
    alignSelf: 'center',
    borderBottomLeftRadius: responsiveWidth(4),
    borderBottomRightRadius: responsiveWidth(4),
  },
  iosPlatformFlightBackground: {
    height: responsiveHeight(31),
  },
  seatmapHeaderContainerStyle: {
    position: 'absolute',
    width: responsiveWidth(100),
    alignItems: 'center',
  },
  headerLeftIconStyle: {
    height: 35,
    width: 35,
  },
  headerLabelStyle: {
    color: colors.color_fff,
    fontWeight: '500',
    fontSize: 16,
    flexShrink: 0,
  },
  seatmapMainContainer: {
    backgroundColor: colors.color_fff,
    // height: responsiveHeight(80),
    width: responsiveWidth(81),
    alignSelf: 'center',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    marginRight: 2.5,
  },
  seatImageStyle: {
    height: 25,
    width: 25,
  },
  planeHeadImageStyle: {
    width: responsiveWidth(175),
    height: responsiveHeight(35),
    marginTop: 2,
    borderRadius: 15,
  },
  seatInfoDotsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 20,
  },
  dotContainerStyle: {
    alignItems: 'center',
    height: 60,
    justifyContent: 'flex-start',
  },
  dotText: {
    marginTop: 5,
    color: colors.color_000,
    fontWeight: '500',
    fontFamily: Fonts.ROBOTO_REGULAR,
  },
  cabinRowStyles: {
    height: 25,
    width: responsiveWidth(80),
    alignItems: 'center',
    borderEndWidth: 1,
    justifyContent: 'space-around',
    marginBottom: 0,
    // backgroundColor:'grey'
  },
  rowStyles: {
    alignItems: 'center',
  },
  seatsStyle: {
    width: responsiveWidth(80),
    justifyContent: 'space-around',
  },
  seatRowContainerStyle: {
    flexDirection: 'row',
    // backgroundColor:'red',
  },
  seatNumberStyle: {
    alignSelf: 'center',
    position: 'absolute',
    // flexDirection:'row',
    left: 45,
  },
  seatInfoContainerStyle: {
    height: responsiveHeight(20),
    width: responsiveWidth(100),
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  seatContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imagesContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(35),
    justifyContent: 'space-between',
  },
  seatTextContainerStyle: {
    flexDirection: 'row',
    width: responsiveWidth(40),
    justifyContent: 'space-evenly',
  },
  seatStyles: {
    marginVertical: 20,
    zIndex: -1,
  },
  chaTextStyle: {
    color: colors.color_000,
    marginTop: 10,
  },
  chaSubTextStyle: {
    marginLeft: 10,
    color: colors.color_8B8B8B,
  },
  rowDetailsScrollViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selectedSeatTextStyle: {
    color: colors.color_8B8B8B,
  },
  seatRowNumberStyle: {
    color: colors.color_000,
    fontSize: 18,
    fontWeight: '500',
  },
  seatmapNumberContainer: {
    flexDirection: 'row',
    // width: responsiveWidth(80),
    justifyContent: 'space-evenly',
  },
  seatColumnTextStyle: {
    fontSize: 16,
    color: colors.color_000,
    fontWeight: '500',
    marginLeft: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: '98%',
    alignSelf: 'center',
    marginTop: 5,
    borderColor: colors.color_E8E8E8,
  },
  flightCodesStyle: {
    fontWeight: '500',
  },
  seatLoaderStyle: {
    backgroundColor: colors.color_whiteTransparent,
  },
  wingOneStyle: {
    backgroundColor: 'grey',
    position: 'absolute',
    width: 15,
    left: -10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  wingTwoStyle: {
    backgroundColor: 'grey',
    position: 'absolute',
    width: 15,
    right: -10,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  exitViewOne: {
    backgroundColor: 'red',
    width: 10,
    height: 20,
    position: 'absolute',
    left: 5,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  exitViewTwo: {
    backgroundColor: 'red',
    width: 10,
    height: 20,
    position: 'absolute',
    right: 5,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  errorContainerStyle: {
    backgroundColor: 'white',
    height: 230,
    width: responsiveWidth(81),
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    marginRight: 2,
  },
  errorTextStyle: {
    fontSize: 18,
    color: colors.color_FE4555,
    fontWeight: '500',
  },

  detailedTextStyle: {
    color: colors.color_7B7B7B,
    fontWeight: '400',
    letterSpacing: 0.11,
    marginHorizontal: 10,
  },
  okButtonStyle: {
    height: 40,
    backgroundColor: colors.color_FE4555,
    width: responsiveWidth(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },

  tryAgainTextStyle: {
    color: colors.color_fff,
    fontSize: 14,
    fontWeight: '400',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: responsiveWidth(60),
  },
  seatmapButtonStyle: {
    marginHorizontal: 12,
  },
  seatRowNumberTextStyle: {
    color: colors.color_000,
  },
});
