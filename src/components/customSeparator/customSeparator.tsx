/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import appConstants from '@src/constants/appConstants';
import styles from './styles';

// custom -(OR)- separator used in login screen..
const CustomSeparator = () => {
  return (
    <View style={styles.sepratorContainer}>
      <View style={styles.sepratorLineStyle} />
      <View style={styles.circleViewContainerStyle}>
        <Text style={styles.sepratorLabelStyle}>{appConstants.or}</Text>
      </View>
      <View style={styles.sepratorLineStyle} />
    </View>
  );
};

export default CustomSeparator;
