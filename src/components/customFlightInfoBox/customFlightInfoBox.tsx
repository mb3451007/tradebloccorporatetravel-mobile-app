/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';

interface CustomFlightInfoBoxProps {
  headerTitle?: any;
  customBoxStyle?: any;
  subTitle?: any;
}

const CustomFlightInfoBox = (props: CustomFlightInfoBoxProps) => {
  const {headerTitle, customBoxStyle, subTitle} = props;
  return (
    <View style={[styles.flightInfoBoxStyle, {...customBoxStyle}]}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.flightInfoHeaderTitleStyle}>{headerTitle}</Text>
        <Text style={styles.flightInfoSubTitleStyle}>{subTitle}</Text>
      </ScrollView>
    </View>
  );
};

export default CustomFlightInfoBox;
