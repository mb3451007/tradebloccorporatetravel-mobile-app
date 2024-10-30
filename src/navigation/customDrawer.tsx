/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import {DrawerItem, useDrawerStatus} from '@react-navigation/drawer';
import commonStyles from '@src/utility/commonStyles';
import {Icons, Images} from '@src/assets';
import styles from '@navigation/styles';
import colors from '@src/constants/colors';
import navigationConstants from '@src/constants/navigationConstants';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {navigate} from './navigationMethods';
import {signOut} from 'aws-amplify/auth';
import {useDispatch} from 'react-redux';
import {awsResponse} from '@src/screens/login/slice/awsLoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// CUSTOM SIDE DRAWER..
const CustomSideBar = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const isOpen = useDrawerStatus() === 'open';
  const lables = (focused: any, label: any) => {
    return (
      <View style={styles.drawerLabelContainer}>
        <Text
          style={[
            styles.sideBarLabelStyle,
            {color: focused ? colors.color_fff : colors.color_1A1A1A},
          ]}>
          {label}
        </Text>
        <Image
          style={{tintColor: focused ? colors.color_fff : colors.color_9A9A9A}}
          source={Icons.SIDEDRAWER_RIGHTARROW}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.sideBarHeaderImageContainer}>
        <Image style={styles.wing_1Style} source={Icons.SIDEDRAWER_WING_1} />
        <Image style={styles.sideBarHeaderImage} source={Images.APP_LOGO} />
        <Image style={styles.wing_2Style} source={Icons.SIDEDRAWER_WING_2} />
        {isOpen && (
          <TouchableOpacity
            onPress={() => nav.dispatch(DrawerActions.closeDrawer())}
            style={styles.sideDrawerCloseBtnStyle}>
            <Image source={Icons.SIDEDRAWER_CLOSEBTN} />
          </TouchableOpacity>
        )}
      </View>
      {/* <DrawerContentScrollView> */}
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_PROFILEICON}
            />
          </View>
        )}
        //   label={navigationConstants.DRAWER_PROFILE}
        label={({focused}) =>
          lables(focused, navigationConstants.DRAWER_PROFILE)
        }
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {
          nav.dispatch(DrawerActions.closeDrawer());
          navigate(navigationConstants.SIGN_IN_UP);
          // navigate(navigationConstants.DRAWER_PROFILE);
          // Alert.alert('In Progress'); DRAWER_BLOG
        }}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_PROTECTIONICON}
            />
          </View>
        )}
        label={({focused}) =>
          lables(focused, navigationConstants.DRAWER_PROTECTION)
        }
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_PRIVACYPOLICYICON}
            />
          </View>
        )}
        label={({focused}) =>
          lables(focused, navigationConstants.DRAWER_PRIVACYPOLICY)
        }
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_TERMSCONDITIONICON}
            />
          </View>
        )}
        label={({focused}) =>
          lables(focused, navigationConstants.DRAWER_TERMSANDCONDITION)
        }
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_BLOGICON}
            />
          </View>
        )}
        label={({focused}) => lables(focused, navigationConstants.DRAWER_BLOG)}
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {
          nav.dispatch(DrawerActions.closeDrawer());
          navigate(navigationConstants.BLOG);
        }}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_ABOUTUSICON}
            />
          </View>
        )}
        label={({focused}) =>
          lables(focused, navigationConstants.DRAWER_ABOUTUS)
        }
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_CONTACTUSICON}
            />
          </View>
        )}
        label={({focused}) =>
          lables(focused, navigationConstants.DRAWER_CONTACTUS)
        }
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={() => {}}
      />
      <DrawerItem
        icon={({focused}) => (
          <View style={styles.drawerIconStyle}>
            <Image
              style={[
                {
                  tintColor: focused ? colors.color_fff : colors.color_9A9A9A,
                },
              ]}
              source={Icons.SIDEDRAWER_CONTACTUSICON}
            />
          </View>
        )}
        label={({focused}) => lables(focused, 'Sign Out')}
        activeBackgroundColor={colors.color_0094E6}
        style={styles.drawerBorderStyle}
        onPress={async () => {
          await signOut();
          dispatch(awsResponse(false));
          AsyncStorage.clear();
        }}
      />
      {/* </DrawerContentScrollView> */}
    </SafeAreaView>
  );
};

export default CustomSideBar;
