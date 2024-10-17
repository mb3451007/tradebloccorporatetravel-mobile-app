/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import styles from './styles';
import colors from '@src/constants/colors';

interface CustomLoaderProps {
  isLoading: boolean;
  customLoaderStyle?: object;
  loaderColor?: any;
}

// Custom Loader for the screen..
const CustomLoader = (props: CustomLoaderProps) => {
  const {isLoading, customLoaderStyle, loaderColor} = props;
  return (
    <View
      style={[
        styles.container,
        StyleSheet.absoluteFillObject,
        {...customLoaderStyle},
      ]}>
      <ActivityIndicator
        animating={isLoading}
        color={loaderColor ? loaderColor : colors.color_fff}
        size={50}
      />
    </View>
  );
};

export default CustomLoader;
