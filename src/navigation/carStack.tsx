/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import navigationConstants from '@src/constants/navigationConstants';
import Car from '@src/screens/car/car';


// Car Stack..
const CarStack = () => {
    const stack = createStackNavigator();
    return (
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name={navigationConstants.CAR} component={Car} />
      </stack.Navigator>
    );
  };
export default CarStack;
