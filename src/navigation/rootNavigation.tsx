/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import navigationRef from '@navigation/navigationMethods';
import AuthNavigator from './authNavigation';
import MainStack from './mainStack';
import FlashMessage from 'react-native-flash-message';
import {createStackNavigator} from '@react-navigation/stack';
import navigationConstants from '@src/constants/navigationConstants';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';

// Root Navigator
const RootNavigation = () => {
  const awsState = useSelector(
    (state: RootState) => state.awsLogin.awsResponse,
  );
  const stack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <stack.Navigator
        initialRouteName={navigationConstants.MainStack}
        screenOptions={{headerShown: false}}>
        {/* {awsState === true ? ( */}
          <stack.Screen
            name={navigationConstants.MainStack}
            component={MainStack}
          />
        {/* ) : ( */}
          <stack.Screen
            name={navigationConstants.SIGN_IN_UP}
            component={AuthNavigator}
          />
        {/* )} */}
      </stack.Navigator>
      <FlashMessage position="top" duration={1200} />
    </NavigationContainer>
  );
};

export default RootNavigation;
