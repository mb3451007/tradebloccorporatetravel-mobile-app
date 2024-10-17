/* eslint-disable prettier/prettier */
import {Fonts} from '@src/assets';
import colors from '@src/constants/colors';
import {Platform, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// bottom tab bar style..
export default StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
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
  tabBarFocusedStyle: {
    backgroundColor: colors.color_0094E6,
    height: responsiveWidth(14),
    width: responsiveWidth(14),
    borderRadius: responsiveWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    padding: 0,
  },
  tabBarIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  planeTabStyle: {
    backgroundColor: colors.color_0094E6,
    marginTop: Platform.OS === 'ios' ? 25 : 0,
    height: responsiveWidth(15),
    width: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(10),
  },
  tabBarBackground: {
    backgroundColor: 'green',
  },
  sideBarHeaderImageContainer: {
    height: responsiveHeight(15),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.color_0094E6,
  },
  wing_1Style: {
    width: responsiveWidth(50),
    height: responsiveHeight(12),
    opacity: 0.2,
  },
  sideBarHeaderImage: {
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? responsiveHeight(3) : responsiveHeight(10),
    width: Platform.OS === 'ios' ? responsiveWidth(47) : responsiveWidth(30),
    position: 'absolute',
    top: Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(5),
  },
  wing_2Style: {
    alignSelf: 'flex-end',
    height: responsiveHeight(3),
    opacity: 0.2,
  },
  sideDrawerCloseBtnStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 44,
    width: 44,
    backgroundColor: colors.color_fff,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: responsiveWidth(-5),
    top: responsiveHeight(5),
  },
  drawerIconStyle: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(48),
    alignSelf: 'center',
  },
  sideBarLabelStyle: {
    fontSize: 16,
    fontFamily: Fonts.ROBOTO_REGULAR,
    fontWeight: '500',
    letterSpacing: 0.255,
  },
  drawerBorderStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.color_9A9A9A,
  },
});
