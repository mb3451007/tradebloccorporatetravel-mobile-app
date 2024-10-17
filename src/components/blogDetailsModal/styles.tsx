/* eslint-disable prettier/prettier */
import colors from '@src/constants/colors';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
  coverImgStyle: {
    height: responsiveHeight(25),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  leftIconStyle: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
  },
  blogTextStyle: {
    color: colors.color_fff,
    padding: 0.5,
    alignSelf: 'center',
  },
  blogTitleStyle: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500',
  },
  headerLabelStyle: {
    color: colors.color_fff,
    fontWeight: '500',
  },
  blogDateTextContainerStyle: {
    marginTop: responsiveHeight(3.5),
  },

  contentFlatListStyle: {
    marginVertical: 20,
  },
  contentValueTextStyle: {
    color: colors.color_000,
    lineHeight: responsiveHeight(2.5),
    marginLeft: responsiveWidth(6),
    width: responsiveWidth(93),
  },
  contentImgStyle: {
    resizeMode: 'cover',
    height: responsiveHeight(20),
    width: responsiveWidth(90),
    borderRadius: 15,
    elevation: 10,
    alignSelf: 'center',
  },
  textViewContainer: {
    flexDirection: 'row',
    maxWidth: responsiveWidth(100),
  },
  boldTextStyle: {
    color: colors.color_000,
    fontWeight: '600',
    fontSize: responsiveFontSize(2),
    alignSelf: 'flex-start',
    marginLeft: responsiveWidth(2),
  },
  listViewStyle: {
    height: responsiveWidth(2),
    width: responsiveWidth(2),
    backgroundColor: colors.color_000,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  unOrderedListStyle: {
    color: colors.color_000,
    marginLeft: responsiveWidth(2),
  },
  noBlogContainerStyle: {
    height: responsiveHeight(60),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBlogImgStyle: {
    opacity: 0.8,
  },
  headerContainerStyle: {
    marginTop: responsiveHeight(3),
  },
  iosBlogHeaderStyle: {
    marginTop: responsiveHeight(-1),
  },
  iosViewStyle: {
    backgroundColor: colors.color_000,
    height: 10,
    width: 10,
    borderRadius: 10,
  },
});
