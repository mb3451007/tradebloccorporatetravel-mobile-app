/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationConstants from '@constants/navigationConstants';
import Login from '@screens/login/login';
import SignUp from '@src/screens/signUp/signUp';
import OTP from '@src/screens/otp/otp';
import ForgotPassword from '@src/screens/forgotPassword/forgotPassword';
import ResetPassword from '@src/screens/resetPassword/resetPassword';

// Auth Stack
const AuthNavigator = () => {
  const stackNavigator = createNativeStackNavigator();

  return (
    <stackNavigator.Navigator
      initialRouteName={navigationConstants.LOGIN}
      screenOptions={{headerShown: false}}>
      <stackNavigator.Screen
        name={navigationConstants.LOGIN}
        component={Login}
      />
      <stackNavigator.Screen
        name={navigationConstants.SIGNUP}
        component={SignUp}
      />
      <stackNavigator.Screen name={navigationConstants.OTP} component={OTP} />
      <stackNavigator.Screen
        name={navigationConstants.RESET_PASSWORD}
        component={ResetPassword}
      />
      <stackNavigator.Screen
        name={navigationConstants.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
    </stackNavigator.Navigator>
  );
};

export default AuthNavigator;
