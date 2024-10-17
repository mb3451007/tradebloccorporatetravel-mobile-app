/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '@src/constants/colors';
import styles from '@src/navigation/styles';
import navigationConstants, {
  TabBarConstants,
} from '@src/constants/navigationConstants';
import FlightStack from './flightStack';
import HotelStack from './hotelStack';
import CarStack from './carStack';
import {useDispatch} from 'react-redux';
import {currentTabSelected} from '@src/redux/appSlice/appSlice';
import {Icons} from '@src/assets';
import {clearHotel} from '@src/screens/hotel/slice/hotelSlice';
import {clearhotelPayment} from '@src/screens/hotelPayment/slice/hotelPaymentSlice';
import {navigate} from './navigationMethods';

// bottom tab navigator..
const TabNavigator = () => {
  const dispatch = useDispatch();

  const tabNavigator = createBottomTabNavigator();
  return (
    <tabNavigator.Navigator
      backBehavior={'none'}
      initialRouteName={navigationConstants.FLIGHT_TAB}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <tabNavigator.Screen
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.planeTabStyle,
                  {
                    backgroundColor: focused
                      ? colors.color_0094E6
                      : colors.color_fff,
                  },
                ]}>
                <Image
                  style={{
                    tintColor: focused ? colors.color_fff : colors.color_grey,
                  }}
                  source={Icons.HOTELTAB_LOGO}
                />
                <Text
                  style={{
                    color: focused ? colors.color_fff : colors.color_grey,
                  }}>
                  {TabBarConstants.HOTELS}
                </Text>
              </View>
            );
          },
        }}
        name={navigationConstants.HOTEL_TAB}
        component={HotelStack}
        listeners={() => ({
          tabPress: () => {
            dispatch(currentTabSelected(2));
            dispatch(clearHotel());
            dispatch(clearhotelPayment());
            navigate(navigationConstants.HOTEL);
          },
        })}
      />
      <tabNavigator.Screen
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.planeTabStyle,
                  {
                    backgroundColor: focused
                      ? colors.color_0094E6
                      : colors.color_fff,
                  },
                ]}>
                <Image
                  style={{
                    tintColor: focused ? colors.color_fff : colors.color_grey,
                  }}
                  source={Icons.PLANETAB_LOGO}
                />
                <Text
                  style={{
                    color: focused ? colors.color_fff : colors.color_grey,
                  }}>
                  {navigationConstants.FLIGHT}
                </Text>
              </View>
            );
          },
        }}
        name={navigationConstants.FLIGHT_TAB}
        component={FlightStack}
        listeners={() => ({
          tabPress: () => {
            dispatch(currentTabSelected(1));
            navigate(navigationConstants.FLIGHT);
          },
        })}
      />
      <tabNavigator.Screen
        options={{
          tabBarIcon: ({focused}: any) => {
            return (
              <View
                style={[
                  styles.planeTabStyle,
                  {
                    backgroundColor: focused
                      ? colors.color_0094E6
                      : colors.color_fff,
                  },
                ]}>
                <Image
                  style={{
                    tintColor: focused ? colors.color_fff : colors.color_grey,
                  }}
                  source={Icons.CARTAB_LOGO}
                />
              </View>
            );
          },
        }}
        name={navigationConstants.CAR_TAB}
        component={CarStack}
        listeners={() => ({
          tabPress: () => {
            dispatch(currentTabSelected(3));
          },
        })}
      />
    </tabNavigator.Navigator>
  );
};

export default TabNavigator;
