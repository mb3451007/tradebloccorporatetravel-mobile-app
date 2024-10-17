/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import appConstants from '@src/constants/appConstants';

// Custom Header label..
const CustomHeaderLabel = () => {
  return (
    <View style={styles.headerLabelContainer}>
      <Text style={styles.smartWayTextStyle}>
        {appConstants.theSmartWayToTravel}
      </Text>
    </View>
  );
};

export default CustomHeaderLabel;
