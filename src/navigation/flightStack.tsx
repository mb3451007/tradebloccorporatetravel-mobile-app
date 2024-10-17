/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationConstants from '@src/constants/navigationConstants';
import Flight from '@screens/flight/flight';
import FlightSearch from '@src/screens/flightSearch/flightSearch';
import CheckOut from '@src/screens/checkOut/checkout';
import Payment from '@src/screens/payment/payment';
import Blog from '@src/screens/blog/blog';

// Flight Stack..
const FlightStack = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      initialRouteName={navigationConstants.FLIGHT}
      screenOptions={{headerShown: false}}>
      <stack.Screen name={navigationConstants.FLIGHT} component={Flight} />
      <stack.Screen
        name={navigationConstants.FLIGHT_SEARCH}
        component={FlightSearch}
      />
      <stack.Screen name={navigationConstants.CHECKOUT} component={CheckOut} />
      <stack.Screen name={navigationConstants.PAYMENT} component={Payment} />
      <stack.Screen name={navigationConstants.BLOG} component={Blog} />
    </stack.Navigator>
  );
};
export default FlightStack;
