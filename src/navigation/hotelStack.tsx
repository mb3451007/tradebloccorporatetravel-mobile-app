/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationConstants from '@src/constants/navigationConstants';
import Hotel from '@src/screens/hotel/hotel';
import HotelList from '@src/screens/hotelList/hotelList';
import HotelRating from '@src/screens/hotelRating/HotelRating';
import HotelReserve from '@src/screens/hotelReserve/hotelReserve';
import HotelCheckOut from '@src/screens/hotelCheckout/HotelCheckOut';
import HotelPayment from '@src/screens/hotelPayment/HotelPayment';

// Flight Stack..
const HotelStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      initialRouteName={navigationConstants.HOTEL}
      screenOptions={{headerShown: false}}>
      <stack.Screen name={navigationConstants.HOTEL} component={Hotel} />
      <stack.Screen
        name={navigationConstants.HOTEL_LIST}
        component={HotelList}
      />
      <stack.Screen
        name={navigationConstants.HOTEL_RATING}
        component={HotelRating}
      />
        <stack.Screen
        name={navigationConstants.HOTEL_RESERVE}
        component={HotelReserve}
      />
        <stack.Screen
        name={navigationConstants.HOTEL_CHECKOUT}
        component={HotelCheckOut}

      />
        <stack.Screen
        name={navigationConstants.HOTEL_PAYMENT}
        component={HotelPayment}

      />
    </stack.Navigator>
  );
};
export default HotelStack;
