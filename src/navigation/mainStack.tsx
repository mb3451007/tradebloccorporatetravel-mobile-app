/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './bottomTabNavigation';
import navigationConstants from '@src/constants/navigationConstants';
import CustomSideBar from './customDrawer';
import Profile from '@src/screens/profile/profile';

// Main stack..
const MainStack = () => {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator
      initialRouteName={navigationConstants.HOME}
      screenOptions={{headerShown: false}}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props: any) => <CustomSideBar {...props} />}>
      <drawer.Screen name={navigationConstants.HOME} component={TabNavigator} />
      <drawer.Screen
        name={navigationConstants.DRAWER_PROFILE}
        component={Profile}
      />
    </drawer.Navigator>
  );
};
export default MainStack;
